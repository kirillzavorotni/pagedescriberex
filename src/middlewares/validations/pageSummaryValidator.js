const { check } = require('express-validator');

const pageSummaryValidator = () => [
    check('url', 'Please enter a correct url').isString().notEmpty(),
];

module.exports = {
    pageSummaryValidator,
};
