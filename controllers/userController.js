const User = require('../models/userModel');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createUser = async (req, res) => {
  const { id, name, email } = req.body;
  if (!id || !name || !email) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    await User.insertUser({ id, name, email });
    res.status(201).json({ message: 'User created.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
