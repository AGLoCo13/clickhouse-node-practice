const clickhouse = require('../db');

(async() => {
    const result = await clickhouse.query({
        query: `
        SELECT
            toYear(date) as year,
            avg(price) as avg_price,
            count() as num_sales
        FROM uk_price_paid
        GROUP BY year
        ORDER BY year ASC`,
            format: 'JSON'
    })

    const rows = await result.json();
    console.log("UK property price by year:", rows);
}) ();