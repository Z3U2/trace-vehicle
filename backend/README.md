# Backend of the vehicle tracing project :

## Two main roles : 

### 1. listens to POST request on localhost:3000 and updates the firebase real time db

POST request data format for vehicles :  
```
{
    entry : {  
        vehicleId : <id>,
        lat : <latitude>,
        lng : <longitude>,
        fuel: <fuel %>,
        time: <time in ms>,
        velocity: <velocity km/h>,
        load: <load %>
    }
}
```

POST request data format for immovables :  
```
{
    entry : {  
        immovableId : <id>,
        time: <time in ms>,
        charge: <load %>
    }
}
```

### 2. Acts as a REST API for the Mongo Database 

models available in the models/ folder




## Set up : 

You need to set up a firebase database from the google cloud, get a private key, copy its content to a file named serviceAccountKey.json (create this file in the /backend/ folder) and add the database URL to the `env.json` file
("RTDatabaseURL": \<FirebaseURL>)

You also need to install MongoDB, or just add a database if you already have Mongo deployed. Add the database's URL to the `env.json` file ("MongoDatabaseURL": \<MongoURL>)

Only after that can start using this app by running the following commands in this folder :

```
npm install
npm start
```

## Test :

To test the app, I set up a test script (`sim.js`) that you can run using :
```
node index.js
```
And in another terminal in the same directory
```
node sim.js
```