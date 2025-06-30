const express = require('express');
const router = express.Router();
const ctrl = require('../controllers/authController');
const verifyToken = require('../middleware/verifyToken');

//POST /api/auth/login
router.post('/login' , ctrl.login);

//POST /api/auth/logout
router.post('/logout' , ctrl.logout);

//GET /api/auth/me --> Returns user if logged in
router.get('/me',verifyToken,ctrl.me);

module.exports =router;