const { getTourService, createTourService, getATourService, updateTourService, getCheapestTours, getTrendingTours } = require("../services/tour.services")

exports.getTours = async (req, res, next) => {
    try {
        let filters = { ...req.query };

        const excludeFields = ['sort', 'page', 'limit'];
        excludeFields.forEach(field => delete filters[field]);

        let filtersString = JSON.stringify(filters);
        filtersString = filtersString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)
        filters = JSON.parse(filtersString);

        const queries = {};
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(',').join(' ');
            queries.fields = fields;
        }

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            const skip = (page - 1) * parseInt(limit);
            queries.skip = skip;
            queries.limit = parseInt(limit);
        }

        const tours = await getTourService(filters, queries)
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
}

exports.getTour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const tour = await getATourService(id);
        res.status(200).json({
            status: 'success',
            data: tour
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Cannot get the data',
            error: error.message
        })
    }
}

exports.cheapestTours = async (req, res, next) => {
    try {
        const tours = await getCheapestTours()
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
}

exports.trendingTours = async (req, res, next) => {
    try {
        const tours = await getTrendingTours()
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
}

exports.createTour = async (req, res, next) => {
    try {
        const result = await createTourService(req.body);
        res.status(200).json({
            status: 'success',
            message: 'Data inserted successfully',
            data: result
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Data is not inserted',
            error: error.message
        })
    }
}

exports.updateTour = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await updateTourService(id, req.body);
        res.status(200).json({
            status: 'success',
            message: 'Successfully updated tour data'
        })
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            message: 'Cannot update the data',
            error: error.message
        })
    }
}