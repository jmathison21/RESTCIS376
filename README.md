# REST - Assignment 2 for CIS 376

REST API Created with Express and Typescript   

## Run Instructions

Clone Repository RESTCIS376 using Preffered Method    
Run Commands:    
    cd RESTCIS376   
    npm i   
    npm run dev  

Server is by default hosted on http://localhost:3000/    
API Routes are viewable by navigating to them directly or by testing through postman    

## API Route Instructions

GET /tweets - Returns a list of all tweets   
GET /links - Returns a list of all links in all tweets   
GET /tweets/:id - Returns a tweet with the given id if it exists, otherwise returns not found   
GEt /users/:screen_name - Returns the user with the given screen_name if it exists, otherwise returns not found   

Sample ids for testing:   
311468922962587651, 311828115477372928, 311964132205268992, 311975360667459585, 311432631726264320    

Sample screen_names for testing:    
timoreilly, MarkUry, zephoria, SarahPrevette, johnmaeda  