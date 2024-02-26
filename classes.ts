//Jenna Mathison

export class User {
    screen_name: string
    description: string
    location: string
    followers_count: number
    friends_count: number

    constructor(screen_name: string, description: string, location: string, followers_count: number, friends_count: number) {
        this.screen_name = screen_name
        this.description = description
        this.location = location
        this.followers_count = followers_count
        this.friends_count = friends_count
    }
}

export class Tweet {
    id: number
    created_at: string
    text: string
    user: User

    constructor(id: number, created_at: string, text: string, user: any) {
        this.id = id
        this.created_at = created_at
        this.text = text
        this.user = new User(user.screen_name, user.description, user.location, user.followers_count, user.friends_count)
    };

    getTweetLinks(): string[] {
        //regex obtained from the internet, reference: https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url 
        const regex = /https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,}/
        const regexUrls = this.text.match(regex)
        if(regexUrls) return regexUrls.map((val) => val)
        else return []
    };
}