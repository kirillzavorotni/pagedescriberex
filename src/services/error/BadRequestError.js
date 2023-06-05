const BaseError = require('./BaseError');

class BadRequestError extends BaseError {
    constructor(message, cause) {
        super(message, cause);
        if (!message) this.message = 'Bad Request';
        this.status = 400;
        this.createErrorLogMessage();
    }
}

module.exports = BadRequestError;
