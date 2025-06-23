const clickhouse = require('../db');

(async () => {
  const result = await clickhouse.query({
    query: `
      SELECT
        crypto_name,
        toDate(trade_date) AS date,
        avg(price) AS avg_price
      FROM crypto_prices
      WHERE crypto_name = 'Bitcoin'
      GROUP BY crypto_name, date
      ORDER BY date ASC
      LIMIT 50
    `,
    format: 'JSON',
  });

  const rows = await result.json();
  console.log('📈 BTC daily average price:', rows);
})();
