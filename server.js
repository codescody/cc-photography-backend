// get .env vars
require("dotenv").config();

// Dependencies
const express = require("express")
const { PORT, DATABASE_URL } = process.env

// App Object
const app = express()

app.get("/", (req, res) => {
    res.send("hello world")
})

// Server listener
app.listen(PORT, () => console.log(`Listening on ${PORT} `));