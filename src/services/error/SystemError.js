const BaseError = require('./BaseError');

class SystemError extends BaseError {
    constructor(message, cause) {
        super(message, cause);
        if (!message) this.message = 'Server error';
        this.status = 500;

        this.createErrorLogMessage();
    }
}

module.exports = SystemError;
