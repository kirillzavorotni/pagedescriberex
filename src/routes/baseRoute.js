const { Router } = require('express');

const router = Router();
const { pageSummaryValidator } = require('../middlewares/validations/pageSummaryValidator');
const { validate } = require('../middlewares/validations/validator');
const { baseController } = require('../controllers/baseController');

router.post('/', pageSummaryValidator(), validate, baseController);

module.exports = router;
