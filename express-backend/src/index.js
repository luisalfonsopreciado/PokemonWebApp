const express = require('express')
require('./db/mongoose')
const app = express()
const userRouter = require('./routes/user.js')
const pokemonRouter = require('./routes/pokemon.js')
const port = process.env.PORT;
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "*");
    next();
  });
app.use(express.json())
app.use(userRouter)
app.use(pokemonRouter)



app.listen(port, () => {
    console.log("Server listening on port: " + port)
})