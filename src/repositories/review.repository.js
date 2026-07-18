const { AppDataSource } = require('../config/database');

class ReviewRepository {
  constructor() {
    this.repository = AppDataSource.getRepository('Review');
  }

  async create(data) {
    const review = this.repository.create(data);
    return await this.repository.save(review);
  }

  async findByUserId(userId) {
    return await this.repository.find({
      where: { reviewed_user_id: userId },
      relations: ['reviewer'],
      order: { created_at: 'DESC' },
    });
  }

  async findById(id) {
    return await this.repository.findOne({
      where: { id },
      relations: ['reviewer', 'reviewedUser'],
    });
  }

  async update(id, data) {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id) {
    const review = await this.findById(id);
    if (review) {
      await this.repository.remove(review);
    }
    return review;
  }

  async getAverageRating(userId) {
    const result = await this.repository
      .createQueryBuilder()
      .select('COALESCE(AVG(review.rating), 0)', 'avg_rating')
      .from('Review', 'review')
      .where('review.reviewed_user_id = :userId', { userId })
      .getRawOne();

    return parseFloat(result.avg_rating);
  }
}

module.exports = new ReviewRepository();