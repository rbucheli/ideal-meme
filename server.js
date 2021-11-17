/// DEPENDENCIES ///

// get .env variables
require("dotenv").config();
// pull PORT from .env, give default value of 4000
// pull MONGODB_URL from .env
const { PORT = 4000, MONGODB_URL } = process.env;

// import express
const express = require("express");

// create application object
const app = express();

// import mongoose
const mongoose = require("mongoose");

// import middleware
const cors = require("cors");
const morgan = require("morgan");

/// DATABASE CONNECTION ///

// Establish Connection
mongoose.connect(MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
});

// Connection Events
mongoose.connection
    .on("open", () => console.log("You are connected to mongoose"))
    .on("close", () => console.log("You are disconnected from mongoose"))
  .on("error", (error) => console.log(error));

/// MODELS ///
const productSchema = new mongoose.Schema({
  title: String,
  image: String,
  genre: String,
  description: String,
  tag: String,
  price: String,
  quantity: Number
});

const Product = mongoose.model("Product", productSchema);
// Does product need to be read?

// MIIDDLEWARE //
app.use(cors()); // to prevent cors errors, open access to all origins
app.use(morgan("dev")); // logging
app.use(express.json()); // parse json bodies

// ROUTES //
app.get("/games", async (req, res) => {
  try {
      // displays all products
      res.json(await Product.find({}));
  } catch (error) {
      //send error
      res.status(400).json(error);
  }
});

// LISTENER //
app.listen(PORT, () => console.log(`listening on PORT ${PORT}`));