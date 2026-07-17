const reviewRepository = require('../repositories/reviewRepository');
const coldRoomRepository = require('../repositories/coldRoomRepository');

class ReviewService {
  async createReview(data) {
    const review = await reviewRepository.create(data);

    const coldRoom = await coldRoomRepository.findById(data.reviewed_user_id);
    if (coldRoom) {
      await coldRoomRepository.updateRating(data.reviewed_user_id);
    }

    return review;
  }

  async getReviewsByUser(userId) {
    const reviews = await reviewRepository.findByUserId(userId);
    const avgRating = await reviewRepository.getAverageRating(userId);
    return { reviews, averageRating: avgRating };
  }

  async updateReview(id, data, reviewerId) {
    const review = await reviewRepository.findById(id);
    if (!review) {
      throw new Error('Review not found');
    }
    if (review.reviewer_id !== reviewerId) {
      throw new Error('Not authorized');
    }

    const updated = await reviewRepository.update(id, data);

    const coldRoom = await coldRoomRepository.findById(review.reviewed_user_id);
    if (coldRoom) {
      await coldRoomRepository.updateRating(review.reviewed_user_id);
    }

    return updated;
  }

  async deleteReview(id, reviewerId) {
    const review = await reviewRepository.findById(id);
    if (!review) {
      throw new Error('Review not found');
    }
    if (review.reviewer_id !== reviewerId) {
      throw new Error('Not authorized');
    }

    await reviewRepository.delete(id);

    const coldRoom = await coldRoomRepository.findById(review.reviewed_user_id);
    if (coldRoom) {
      await coldRoomRepository.updateRating(review.reviewed_user_id);
    }

    return { message: 'Review deleted' };
  }
}

module.exports = new ReviewService();