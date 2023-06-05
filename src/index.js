/* eslint-disable no-console */
const express = require('express');
const dotenv = require('dotenv');

dotenv.config();
const { getLogger, logRequestNextFunction } = require('./services/logger/logger');
const { errorLoggerNextFunction } = require('./services/error/errorModule');

const app = express();
app.use(express.json());

const port = process.env.API_PORT || 3000;
global.log = getLogger;

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || req.headers.host);
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

app.use(logRequestNextFunction);

app.use('/api/', require('./routes'));

app.all('*', (req, res) => {
    res.status(404).send({ error: 'Unknown url requested' });
});

app.use(errorLoggerNextFunction);

app.listen(port, () => {
    console.log(`Server started at ${port} port`);
});

async function init() {
    try {
        global.log().info(`Server started at ${port} port`);
    } catch (err) {
        global.log().error(err);
        console.log('Server stopped');
        process.exit();
    }
}

init();
