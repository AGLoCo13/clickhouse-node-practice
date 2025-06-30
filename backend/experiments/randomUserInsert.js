const clickhouse = require('../config/clickhouse');

(async ()=>{
    const user = {
        id:Math.floor(Math.random() * 1000),
        name: 'testUser',
        email: `test${Math.floor(Math.random() * 1000)}@example.com`
    };

await clickhouse.insert({
    table: 'users',
    values: [user],
    format: 'JSONEachRow',
});

console.log('Inserted test user:',user);
})();