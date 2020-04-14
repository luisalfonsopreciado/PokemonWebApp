const { ObjectId, MongoClient} = require("mongodb")

const connectionURL = "mongodb://127.0.0.1:27017"
const databaseName = "poke-api"

MongoClient.connect(
    connectionURL,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (error, client) => {
        if(error){
           return console.log("Unable to connect to MongoDB")
        }
      const db = client.db(databaseName)
        

    }
)
