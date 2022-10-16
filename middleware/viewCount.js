const { updateViewCount } = require("../services/tour.services");

const viewCount = async (req, res, next) => {
    const { id } = req.params;
    const tours = await updateViewCount(id);
    next()
}
module.exports = viewCount;