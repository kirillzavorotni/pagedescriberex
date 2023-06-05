class BaseError extends Error {
    constructor(message, cause) {
        super(message);
        Error.captureStackTrace(this, this.constructor);

        this.name = this.constructor.name;
        this.message = message;
        this.cause = cause;
    }

    createErrorLogMessage() {
        this.errorLogMessage = `${this.name
            ? `${this.name} ` : ''}${this.status
            ? `${this.status} ` : ''}${this.message ? `${this.message} ` : ''}\n${this.stack}`;
        if (this.cause) {
            this.errorLogMessage += `\nInternal ${this.cause.stack}`;
        }
    }
}

module.exports = BaseError;
