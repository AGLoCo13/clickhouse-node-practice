const clickhouse = require('../db');

(async () => {
    const result = await clickhouse.query({
        query:'SHOW TABLES',
        format: 'JSON',
    });
    const raw = await result.json();
    const tables = raw.data;
    console.log('Tables:');
    tables.forEach((t,i) => {
        console.log(`${i+1}. ${t.name}`);
});
}) ();