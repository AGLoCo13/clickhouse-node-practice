const Analytics = require('../models/analyticsModel');

exports.getBTCPrices = async (req, res) => {
  //modified for thje frontend to get dates 
  const {from , to } = req.query;
  try {
    const data = await Analytics.getBTCPriceByDay(from , to);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTopUsers = async (req, res) => {
  try {
    const data = await Analytics.getTopUsers();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUKPricesByYear = async (req, res) => {
  try {
    const data = await Analytics.getUKPricesByYear();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/* 1) Line-chart data: daily average price */
exports.btcPrices = async (req, res) => {
  const { from, to } = req.query;
  try {
    const data = await Analytics.getBTCPriceByDay(from, to);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/* 2) Donut data: Top-N daily highs   */
exports.btcTopHighs = async (req, res) => {
  // ?limit=10  (defaults to 10)
  const limit = Number(req.query.limit) || 10;
  try {
    const data = await Analytics.getTopTenBtc(limit);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
/* 3) Histogram data: bucketed averages */
exports.btcHistogram = async (req, res) => {
  const { from, to, bucket = 'month' } = req.query;   // bucket = month | week | year
  try {
    const data = await Analytics.getBTCHistogram({ from, to, bucket });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
