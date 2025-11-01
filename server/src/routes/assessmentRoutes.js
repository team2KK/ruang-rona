const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getQuestions, submitAssessment, getAssessmentResult, getAssessmentHistory } = require('../controllers/assessmentController');

router.get('/questions', auth, getQuestions);
router.post('/', auth, submitAssessment);
router.get('/history', auth, getAssessmentHistory);
router.get('/:sessionId', auth, getAssessmentResult);

module.exports = router;