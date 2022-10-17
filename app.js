const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const tourRoute = require('./routes/tour.route')


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Route is working! YaY!");
});

app.use('/api/v1/tours', tourRoute)

module.exports = app;