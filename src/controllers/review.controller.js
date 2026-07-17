const reviewService = require('../services/reviewService');

exports.createReview = async (req, res) => {
  try {
    const reviewerId = req.user.id;
    const { reviewed_user_id, rating, comment } = req.body;

    const review = await reviewService.createReview({
      reviewer_id: reviewerId,
      reviewed_user_id,
      rating,
      comment,
    });

    res.status(201).json({ success: true, data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getReviewsByUser = async (req, res) => {
  try {
    const result = await reviewService.getReviewsByUser(req.params.userId);
    res.status(200).json({
      success: true,
      count: result.reviews.length,
      averageRating: result.averageRating,
      data: result.reviews,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const updated = await reviewService.updateReview(req.params.id, req.body, req.user.id);
    res.status(200).json({ success: true, data: updated });
  } catch (error) {
    const status = error.message === 'Review not found' ? 404 : error.message === 'Not authorized' ? 403 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const result = await reviewService.deleteReview(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: result.message });
  } catch (error) {
    const status = error.message === 'Review not found' ? 404 : error.message === 'Not authorized' ? 403 : 500;
    res.status(status).json({ success: false, message: error.message });
  }
};