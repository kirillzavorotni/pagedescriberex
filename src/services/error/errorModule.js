const BaseError = require('./BaseError');
const ValidationError = require('./ValidationError');
const SystemError = require('./SystemError');
const NotFoundError = require('./NotFoundError');

// eslint-disable-next-line no-unused-vars
const errorLoggerNextFunction = (err, req, res, next) => {
    let errMessage = '';

    if (err instanceof BaseError) {
        errMessage = err.errorLogMessage;
    } else {
        errMessage = err.stack;
    }

    global.log().error(errMessage);
    res.status(err.status || 500).json({ error: err.message });
};

module.exports = {
    BaseError,
    ValidationError,
    SystemError,
    NotFoundError,
    errorLoggerNextFunction,
};
