const express = require('express');
const router = express.Router();
const controller = require('../controllers/analyticsController');


router.get('/crypto/btc', controller.getBTCPrices);
router.get('/users/top', controller.getTopUsers);
router.get('/sales/year', controller.getUKPricesByYear);
router.get('/crypto/btc',            controller.btcPrices);
router.get('/crypto/btc/top-max',    controller.btcTopHighs);
router.get('/crypto/btc/histogram',  controller.btcHistogram);

module.exports = router;
