const { Router } = require('express');

const router = Router();

const baseRoute = require('./baseRoute');

router.use('/baseRoute', baseRoute);

module.exports = router;
