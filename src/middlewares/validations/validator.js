const { validationResult } = require('express-validator');
const { ValidationError } = require('../../services/error/errorModule');

const validate = (req, res, next) => {
    const errorFormatter = ({ msg }) => msg;

    const errors = validationResult(req).formatWith(errorFormatter);
    if (!errors.isEmpty()) {
        next(new ValidationError(errors.array(), errors.array()));
    }
    return next();
};

module.exports = { validate };
