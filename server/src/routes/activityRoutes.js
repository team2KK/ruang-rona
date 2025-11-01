const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getLastActivities } = require('../controllers/activityController');

router.get('/recent', auth, getLastActivities);

module.exports = router;