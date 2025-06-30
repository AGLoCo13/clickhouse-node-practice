const clickhouse = require('../config/clickhouse');

(async() => {
    const result = await clickhouse.query({
        query:`
        SELECT
            title,
            score,
            url
        FROM hackernews
        ORDER BY score DESC
        LIMIT 10`,
        format: 'JSON'
    })

    const rows = await result.json();
    console.log('Top Hacker News Stories:' , rows)
}) ();