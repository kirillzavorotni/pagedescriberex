const { getUrlSummary } = require('../services/baseService');

exports.baseController = async (req, res, next) => {
    try {
        res.status(200).json(await getUrlSummary());
    } catch (err) {
        next(err);
    }
};
