const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

// GET all feedback
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET single feedback
router.get('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new feedback
router.post('/', async (req, res) => {
  const feedback = new Feedback({
    studentName: req.body.studentName,
    studentId: req.body.studentId,
    course: req.body.course,
    instructor: req.body.instructor,
    rating: req.body.rating,
    feedback: req.body.feedback
  });

  try {
    const newFeedback = await feedback.save();
    res.status(201).json(newFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT update feedback
router.put('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    Object.assign(feedback, req.body);
    const updatedFeedback = await feedback.save();
    res.json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE feedback
router.delete('/:id', async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
