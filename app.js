const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const cors = require('cors');


const app = express();
app.use(cors());
app.use(bodyParser.json());


app.get('/health', (req, res) => res.json({ status: 'ok' }));
app.use('/users', userRoutes);
app.use('/analytics',analyticsRoutes);
module.exports = app;
