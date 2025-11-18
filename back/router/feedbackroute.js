const express = require('express');
const Feedback = require('../models/feedbackmodel');
const router = express.Router();

// POST feedback
router.post('/', async (req, res) => {
  try {
    const feedback = new Feedback(req.body);
    await feedback.save();
    res.status(201).json({ message: 'Feedback saved', feedback });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET all feedback
router.get('/', async (req, res) => {
  const feedbacks = await Feedback.find();
  //res.json(feedbacks);
  res.send("Feedback route working");
});

module.exports = router;