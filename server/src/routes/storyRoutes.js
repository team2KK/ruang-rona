const express = require('express');
const router = express.Router();
const storyController = require('../controllers/storyController');
const authMiddleware = require('../middleware/auth');

// Public routes
router.get('/', storyController.getAllStories);
router.get('/:id', storyController.getStory);

// Protected routes - require authentication
router.post('/', authMiddleware, storyController.createStory);
router.post('/:id/support', authMiddleware, storyController.toggleSupport);
router.get('/my/stories', authMiddleware, storyController.getMyStories);
router.delete('/:id', authMiddleware, storyController.deleteStory);

module.exports = router;