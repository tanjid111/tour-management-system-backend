const express = require('express');
const router = express.Router();
const tourController = require('../controllers/tour.controller');
const viewCount = require('../middleware/viewCount');

router.route('/')
    .get(tourController.getTours)
    .post(tourController.createTour)

router.route('/cheapest')
    .get(tourController.cheapestTours)

router.route('/trending')
    .get(tourController.trendingTours)

router.route('/:id')
    .patch(tourController.updateTour)
    .get(viewCount, tourController.getTour)

module.exports = router;