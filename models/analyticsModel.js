const clickhouse = require('../config/clickhouse');

exports.getBTCPriceByDay = async () => {
  const result = await clickhouse.query({
    query: `
      SELECT toDate(trade_date) AS date, AVG(price) AS avg_price
      FROM crypto_prices
      WHERE crypto_name = 'Bitcoin'
      GROUP BY date
      ORDER BY date
      LIMIT 50
    `,
    format: 'JSON',
  });
  const { data } = await result.json();
  return data;
};

exports.getTopUsers = async () => {
  const result = await clickhouse.query({
    query: `
      SELECT id, name, email
      FROM users
      ORDER BY email ASC
      LIMIT 10
    `,
    format: 'JSON',
  });
  const { data } = await result.json();
  return data;
};

exports.getUKPricesByYear = async () => {
  const result = await clickhouse.query({
    query: `
      SELECT toYear(date) AS year, AVG(price) AS avg_price, COUNT() AS total_sales
      FROM uk_price_paid
      GROUP BY year
      ORDER BY year
    `,
    format: 'JSON',
  });
  const { data } = await result.json();
  return data;
};
