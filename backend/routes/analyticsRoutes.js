const express = require('express');
const router = express.Router();
const controller = require('../controllers/analyticsController');


router.get('/crypto/btc', controller.getBTCPrices);
router.get('/users/top', controller.getTopUsers);
router.get('/sales/year', controller.getUKPricesByYear);

module.exports = router;
