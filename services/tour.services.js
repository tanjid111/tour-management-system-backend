const Tour = require('../models/Tour')

exports.getTourService = async (filters, queries) => {
    const tours = await Tour
        .find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    const total = await Tour.countDocuments(filters);
    const page = Math.ceil(total / queries.limit);
    return { total, page, tours };
}

exports.getATourService = async (id) => {
    const tour = await Tour.findById(id);
    return tour;
}

exports.getCheapestTours = async () => {
    const tours = await Tour.find({}).sort({ price: 1 }).limit(3);
    return tours;
}

exports.createTourService = async (data) => {
    const tour = await Tour.create(data);
    return tour;
}

exports.updateTourService = async (tourId, data) => {
    const result = await Tour.updateOne({ _id: tourId }, { $set: data }, { runValidators: true });
    return result;
}

exports.updateViewCount = async (tourId, data) => {
    const result = await Tour.updateOne({ _id: tourId }, { $inc: { viewCount: 1 } }, { runValidators: true });
    return result;
}