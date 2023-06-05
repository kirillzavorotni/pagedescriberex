const { Router } = require('express');

const router = Router();

const { baseController } = require('../controllers/baseController');

router.post('/', baseController);

module.exports = router;
