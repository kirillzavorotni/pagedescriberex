const BaseError = require('./BaseError');

class NotFoundError extends BaseError {
    constructor(message, cause) {
        super(message, cause);
        if (!message) this.message = 'Not found';
        this.status = 404;

        this.createErrorLogMessage();
    }
}

module.exports = NotFoundError;
