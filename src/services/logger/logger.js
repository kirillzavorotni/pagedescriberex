const { configure, getLogger } = require('log4js');

const layout = {
    type: 'pattern',
    pattern: '[%x{env}] [%d] [%p] %m',
    tokens: {
        env: () => process.env.NODE_ENV || 'N/A',
    },
};

configure(
    {
        appenders: {
            info: {
                type: 'dateFile',
                filename: 'log/pageDescribereX.log',
                flags: 'a',
                pattern: 'dd-MM-yyyy',
                alwaysIncludePattern: true,
                keepFileExt: true,
                numBackups: 60,
                layout,
            },
        },
        categories: {
            default: {
                appenders: ['info'],
                level: 'info',
            },
        },
    },
);

const logRequestNextFunction = (req, res, next) => {
    global.log().info(`${req.method} ${decodeURI(req.originalUrl)}`);
    return next();
};

const logResponse = (req, res) => {
    global.log().info(`${req.method} ${decodeURI(req.originalUrl)} - ${res.statusCode}`);
};

module.exports = {
    getLogger,
    logResponse,
    logRequestNextFunction,
};
