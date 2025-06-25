const clickhouse = require('../config/clickhouse');

exports.getBTCPriceByDay = async (from , to ) => {
  //Modified for the frontend 
  let whereClause = `crypto_name = 'Bitcoin'`;
  if (from) whereClause += ` AND trade_date >= toDate('${from}')`;
  if (to) whereClause += ` AND trade_date <= toDate('${to}')`;

  const result = await clickhouse.query({
    query: `
      SELECT toDate(trade_date) AS date, AVG(price) AS avg_price
      FROM crypto_prices
      WHERE ${whereClause}
      GROUP BY date
      ORDER BY date 
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
      ORDER BY year DESC
    `,
    format: 'JSON',
  });
  const { data } = await result.json();
  return data;
};
