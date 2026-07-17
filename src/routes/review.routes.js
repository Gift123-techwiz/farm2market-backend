const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createReview,
  getReviewsByUser,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController');

router.post('/', protect, createReview);
router.get('/:userId', getReviewsByUser);
router.patch('/:id', protect, updateReview);
router.delete('/:id', protect, deleteReview);

module.exports = router;