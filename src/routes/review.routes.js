const express = require('express');
const router = express.Router();
// const { protect } = require('../middleware/auth');
const {
  createReview,
  getReviewsByUser,
  updateReview,
  deleteReview,
} = require('../controllers/review.controller');

router.post('/',  createReview);
router.get('/:userId', getReviewsByUser);
router.patch('/:id',  updateReview);
router.delete('/:id', deleteReview);

module.exports = router;