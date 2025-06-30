const clickhouse = require ('../config/clickhouse');

exports.getAllUsers = async() => {
    const result = await clickhouse.query({
        query: 'SELECT * FROM users ORDER BY id',
        format: 'JSON',
    });
    const {data} = await result.json();
    return data;
};

exports.insertUser = async (user) => {
    return clickhouse.insert({
        table:'users',
        values: [user],
        format: 'JSONEachRow',
    });
};