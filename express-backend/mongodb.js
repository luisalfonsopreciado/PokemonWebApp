const { ObjectId, MongoClient} = require("mongodb")

const connectionURL = process.env.CONNECTION_URL
const databaseName = process.env.DB_URL

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
