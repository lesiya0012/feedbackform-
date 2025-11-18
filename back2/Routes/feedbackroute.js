// routes/feedbackRoutes.js
const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackcontrol');

router.post('/', feedbackController.createFeedback);
router.get('/', feedbackController.getFeedbacks);
router.get('/:id', feedbackController.getFeedbackById);
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;