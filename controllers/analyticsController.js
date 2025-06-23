const Analytics = require('../models/analyticsModel');

exports.getBTCPrices = async (req, res) => {
  try {
    const data = await Analytics.getBTCPriceByDay();
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
