const { AppDataSource } = require('../config/database');

class ColdRoomRepository {
  constructor() {
    this.repository = AppDataSource.getRepository('ColdRoom');
  }

  async create(data) {
    const coldRoom = this.repository.create(data);
    return await this.repository.save(coldRoom);
  }

  async findAll(filters = {}) {
    const query = this.repository.createQueryBuilder('coldRoom');

    if (filters.state) {
      query.andWhere('coldRoom.state = :state', { state: filters.state });
    }
    if (filters.lga) {
      query.andWhere('coldRoom.lga = :lga', { lga: filters.lga });
    }
    if (filters.min_capacity) {
      query.andWhere('coldRoom.available_capacity >= :min_capacity', { min_capacity: filters.min_capacity });
    }

    return await query.orderBy('coldRoom.created_at', 'DESC').getMany();
  }

  async findById(id) {
    return await this.repository.findOne({
      where: { id },
      relations: ['farmer', 'bookings'],
    });
  }

  async update(id, data) {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async updateRating(userId) {
    const result = await this.repository
      .createQueryBuilder()
      .select('COALESCE(AVG(review.rating), 0)', 'avg_rating')
      .from('reviews', 'review')
      .where('review.reviewed_user_id = :userId', { userId })
      .getRawOne();

    await this.repository.update(
      { farmer_id: userId },
      { rating: parseFloat(result.avg_rating) }
    );
  }
}

module.exports = new ColdRoomRepository();