# csv-upload-api
Nodejs API server with express that handle csv file uploading

## Specification
Create a API that receives potentially large files in CSV format, process them and import their data into a database.

## Assumptions
The column layout is assumed as one, which requires that all providers honor at least the column name. 

Note: If a model needs to be adopted by each provider, a solution would be through a factory pattern.

## Tech approach
The development was done with the express framework and typescript.

The code structure was made with the principles of "clean architecture", separating the business logic ("core"), the application (server) and the data access layer (repository). To do this, I created entities, use cases and defined interfaces to decouple the core business logic.

The server is in charge of injecting the "core" specific services, which are easily interchangeable without breaking with the logic of the "core". In the "data-source" folder are the specific classes that implement a repository: in memory (mock) and another that saves the data in a system file (blob). You can easily expand other repositories like a MongoDb database, SQL, etc.

The central idea is to facilitate the development, unit test and extension of the application, since its parts are replaceable: for example, the rest server can be changed to be a CLI by changing only a part of the code.

## Build and running solution (prod)
Run ->
```
npm run-script build
node build/src/main.js
```

## Running with tsnode and nodemon (dev)
Run ->
```
npm start
```


