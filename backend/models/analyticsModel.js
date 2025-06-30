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
// Top 10 highest single day prices (donut)
exports.getTopTenBtc = async (limit =10) => {
  const result = await clickhouse.query({
    query:
    `
      SELECT
        toString(trade_date)             AS date,
        max(price)                       AS price
      FROM crypto_prices
      WHERE crypto_name = 'Bitcoin'
      GROUP BY date
      ORDER BY price DESC
      LIMIT ${limit}
    `,
    format: 'JSON'
  });
  return (await result.json()).data;
}

//Histogram buckets (month , week , year)
exports.getBTCHistogram = async ({ from, to, bucket = 'month' }) => {
  const fmt = bucket === 'year'
    ? '%Y'
    : bucket === 'week'
      ? '%Y-W%V'             // ISO-week
      : '%Y-%m';             // default: month

  let where = `crypto_name = 'Bitcoin'`;
  if (from) where += ` AND trade_date >= toDate('${from}')`;
  if (to)   where += ` AND trade_date <= toDate('${to}')`;

  const result = await clickhouse.query({
    query: `
      SELECT
        formatDateTime(trade_date, '${fmt}') AS bucket,
        round(avg(price), 2)                 AS avg_price
      FROM crypto_prices
      WHERE ${where}
      GROUP BY bucket
      ORDER BY bucket
    `,
    format: 'JSON'
  });
  return (await result.json()).data;
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
