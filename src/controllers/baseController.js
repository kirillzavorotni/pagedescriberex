const { getUrlSummary } = require('../services/baseService');
const { logResponse } = require('../services/logger/logger');

exports.baseController = async (req, res, next) => {
    try {
        logResponse(req, res);
        res.status(200).json(await getUrlSummary(req.body.url));
    } catch (err) {
        next(err);
    }
};
