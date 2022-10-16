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

//post data
app.use('/api/v1/tour', tourRoute)

//get trending data
app.get('/api/v1/tour/trending', async (req, res, next) => {
    try {
        const tours = await Tour.find({}).sort({ viewCount: -1 }).limit(3);
        res.status(200).json({
            status: 'success',
            data: tours
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Cannot get the data',
            error: error.message
        })
    }
})


module.exports = app;