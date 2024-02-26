import express, { Express, Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import favs from "./favs.json"
import { Tweet, User } from './classes';

//Initialize Tweet Objects
const Tweets: Tweet[] = []

//Creat new Tweet object for each tweet in favs.json and add it to the Tweets array -- Tweet classes are viewable in classes.ts file
favs.forEach((tweet_object: any) => {
    const tweet = new Tweet(tweet_object.id, tweet_object.created_at, tweet_object.text, tweet_object.user)
    Tweets.push(tweet)
})


//REST API Setup
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

//GET all Tweets
app.get("/tweets", (req: Request, res: Response) => {
    type tweetRes = {id: number, created_at: string, text: string}
    const resObjects: tweetRes[] = [] //Tweet return format {id, created_at, text}

    Tweets.forEach((tweet) => {
        resObjects.push({id: tweet.id, created_at: tweet.created_at, text: tweet.text})
    })

    res.json(resObjects)
});


//GET all links in all Tweets
app.get("/links", (req: Request, res: Response) => {
    const links: string[] = []

    //call tweetLinks function on each tweet to regex for links in the tweet text -- regex function viewable in classes.ts file
    Tweets.forEach((tweet) => {
        const tweetLinks = tweet.getTweetLinks().values()
        for(let link of tweetLinks) {links.push(link)}
    })

    res.json(links);
});


//GET Tweet Details based on Tweet ID
app.get("/tweets/:id", (req: Request, res: Response) => {
    const id = parseInt(req.params.id)

    //Send status 400(Bad Request) if id is not a number
    if(isNaN(id)) {
        res.status(400).send("ERROR, id must be a valid integer")
        return
    }

    const tweet = Tweets.find((tweet) => tweet.id == id ? true : false)

    //Send status 404(Not Found) if tweet with id is not found
    if(!tweet) {
        res.status(404).send("ERROR, tweet with id not found")
        return
    }

    //Return tweet in format {created_at, text, screen_name}
    type tweetRes = {created_at: string, text: string, screen_name: string}
    const tweet_object: tweetRes = {created_at: tweet.created_at, text: tweet.text, screen_name: tweet.user.screen_name}
    res.json(tweet_object)
});


//GET Tweet User based on Tweet ID
app.get("/users/:screen_name", (req: Request, res: Response) => {
    const screen_name = req.params.screen_name

    const tweet = Tweets.find((tweet) => tweet.user.screen_name == screen_name ? true : false)

    //Send status 404(Not Found) if tweet by user with screen_name is not found
    if(!tweet) {
        res.status(404).send("ERROR, user with screen_name not found in any available tweets")
        return
    }

    //Return user in default format of the user class
    res.json(tweet.user)
});

//Start Server at address http://localhost:3000 | default port is 3000 but can be changed in .env file
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});