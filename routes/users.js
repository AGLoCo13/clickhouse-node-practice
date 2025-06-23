const express = require('express');
const router = express.Router();
const clickhouse = require('../db');

// Ensure table exists on first run
clickhouse.command({
  query: `
    CREATE TABLE IF NOT EXISTS users (
      id UInt32,
      name String,
      email String
    ) ENGINE = MergeTree() ORDER BY id
  `
}).then(() => console.log('✅ Table "users" is ready.'))
  .catch(err => console.error('❌ Table init error:', err.message));

// GET /users
router.get('/', async (req, res) => {
  try {
    const result = await clickhouse.query({
      query: 'SELECT * FROM users ORDER BY id',
      format: 'JSON',
    });
    const users = await result.json();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /users
router.post('/', async (req, res) => {
  const { id, name, email } = req.body;
  if (!id || !name || !email) {
    return res.status(400).json({ error: 'Missing id, name, or email' });
  }

  try {
    await clickhouse.insert({
      table: 'users',
      values: [{ id, name, email }],
      format: 'JSONEachRow',
    });
    res.status(201).json({ message: 'User inserted.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /users/:id
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await clickhouse.query({
      query: `SELECT * FROM users WHERE id = ${id}`,
      format: 'JSON',
    });
    const data = await result.json();
    if (data.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /users/:id
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await clickhouse.query({
      query: `ALTER TABLE users DELETE WHERE id = ${id}`,
    });
    res.json({ message: `User with id ${id} deleted (pending merge)` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
