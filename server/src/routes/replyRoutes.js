const express = require('express');
const router = express.Router();
const replyController = require('../controllers/replyController');
const authMiddleware = require('../middleware/auth');

// Get replies for a story
router.get('/story/:storyId', replyController.getReplies);

// Protected routes
router.post('/story/:storyId', authMiddleware, replyController.createReply);
router.post('/:replyId/vote', authMiddleware, replyController.toggleVote);
router.delete('/:replyId', authMiddleware, replyController.deleteReply);

module.exports = router;
