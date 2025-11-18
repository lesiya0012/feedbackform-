const express = require('express');
const Feedback = require('../models/feedbackmodel');
const router = express.Router();

// GET all feedback
router.get('/',(req, res) => {

  res.send("Feedback route working");
});

module.exports = router;