# inversify-graphql-example
Node js sample app with `inversify` and `graphql(using apollo server)`.
It includes `winston` for logging and `stoppable` for graceful shutdowns.

Can be used with or without docker. Instructions are written below.

## How to use
* Clone the repo and `cd` into it.
### Using without docker
* Run `npm i`
* create `.env` file to the root of this folder and copy contents from `example.env` into it.
* Run `npm run dev` to run server with nodemon.

> To run compiled code, run `npm run build` and then `npm start`

### Using with docker
a. For building dev stage
* create `.env` file to the root of this folder and copy contents from `example.env` into it.
* Run `docker-compose build`
* Run `docker-compose up`

b. For building prod stage
* For environment variables, create `.env` file to the root of this folder and copy contents from `example.env` into it. OR use some other way of providing environment variables to the compose file.
> Note: the above method is only used for this example.
> More secure way must be used for passing environment variables to the docker container.
> See the comment in `dockerfile` in `prod` stage section
* Run `docker-compose -f docker-compose.yml build` 
* Run `docker-compose -f docker-compose.yml up` 


`You are ready to build exciting things upon this sample app.`
