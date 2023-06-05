const BaseError = require('./BaseError');

class ValidationError extends BaseError {
    constructor(message, cause) {
        super(message, cause);
        if (!message) this.message = 'Invalid data';
        this.status = 400;

        this.createErrorLogMessage();
    }
}

module.exports = ValidationError;
