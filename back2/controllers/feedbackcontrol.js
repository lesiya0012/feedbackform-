// controllers/feedbackController.js
const Feedback = require('../models/feedbackmodel');

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const { name, email, category, rating, message, consent } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const feedback = new Feedback({ name, email, category, rating, message, consent });
    await feedback.save();

    res.status(201).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get all feedback
exports.getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: feedbacks });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(200).json({ success: true, data: feedback });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }
    res.status(200).json({ success: true, message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};