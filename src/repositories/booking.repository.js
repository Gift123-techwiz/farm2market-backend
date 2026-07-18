const { AppDataSource } = require('../config/database');

class BookingRepository {
  constructor() {
    this.repository = AppDataSource.getRepository('Booking');
  }

  async create(data) {
    const booking = this.repository.create(data);
    return await this.repository.save(booking);
  }

  async findAll(filters = {}) {
    const query = this.repository.createQueryBuilder('booking')
      .leftJoinAndSelect('booking.coldRoom', 'coldRoom');

    if (filters.farmer_id) {
      query.andWhere('booking.farmer_id = :farmer_id', { farmer_id: filters.farmer_id });
    }
    if (filters.cold_room_id) {
      query.andWhere('booking.cold_room_id = :cold_room_id', { cold_room_id: filters.cold_room_id });
    }
    if (filters.status) {
      query.andWhere('booking.status = :status', { status: filters.status });
    }

    return await query.orderBy('booking.created_at', 'DESC').getMany();
  }

  async findById(id) {
    return await this.repository.findOne({
      where: { id },
      relations: ['coldRoom', 'farmer', 'history'],
    });
  }

  async update(id, data) {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id) {
    const booking = await this.findById(id);
    if (booking) {
      await this.repository.remove(booking);
    }
    return booking;
  }
}

module.exports = new BookingRepository();