// src/routes/exerciseRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getOverallProgress } = require('../controllers/exerciseController');

router.get('/progress/overall', auth, getOverallProgress);

module.exports = router;
