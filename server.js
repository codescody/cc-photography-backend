// get .env vars
require("dotenv").config();

// Dependencies
const express = require("express")
const { default: mongoose } = require("mongoose")
const cors = require("cors")
const methodOverride = require("method-override")
const morgan = require("morgan")
const { PORT, DATABASE_URL } = process.env

// App Object
const app = express()

// Database Connection
mongoose.connect(DATABASE_URL)

// Connection Events
mongoose.connection
  .on("open", () => {
    console.log("You are connected to mongodb");
  })
  .on("close", () => {
    console.log("You are disconnected");
  })
  .on("error", (error) => {
    console.log(error);
  });

// Model
const PrintSchema = new mongoose.Schema({
    name: String,
    image: String,
    info: String,
    price: Number,
})

const Print = mongoose.model("Print", PrintSchema)

// Middleware
app.use(cors()); // prevents cross origin resource sharing errors, allows access to server from all origins i.e. react frontend
app.use(morgan("dev")); // logs details of all server hits to terminal
app.use(express.json()); // parse json bodies from request
app.use(express.urlencoded({ extended: false })); // to use URL encoded

app.get("/", (req, res) => {
    res.send("hello world")
})

// Create
app.post("/print", async (req, res) => {
    try {
      res.status(200).json(await Print.create(req.body));
    } catch (error) {
      res.status(400).json(error);
    }
  });

// Server listener
app.listen(PORT, () => console.log(`Listening on ${PORT} `));