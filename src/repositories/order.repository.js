const AppDataSource = require("../config/data-source");

class OrderRepository {
  constructor() {
    this.repository = AppDataSource.getRepository("Order");
  }

  async create(orderData) {
    const order = this.repository.create(orderData);
    return await this.repository.save(order);
  }

  async findAll() {
    return await this.repository.find({
      relations: {
        buyer: true,
        listing: {
          farmer: true,
          images: true,
        },
      },
      order: {
        created_at: "DESC",
      },
    });
  }

  async findById(id) {
    return await this.repository.findOne({
      where: { id },
      relations: {
        buyer: true,
        listing: {
          farmer: true,
          images: true,
        },
      },
    });
  }

  async findByBuyer(buyerId) {
    return await this.repository.find({
      where: {
        buyer: {
          id: buyerId,
        },
      },
      relations: {
        listing: {
          farmer: true,
          images: true,
        },
      },
      order: {
        created_at: "DESC",
      },
    });
  }

  async findByFarmer(farmerId) {
    return await this.repository.find({
      where: {
        listing: {
          farmer: {
            id: farmerId,
          },
        },
      },
      relations: {
        buyer: true,
        listing: {
          images: true,
        },
      },
      order: {
        created_at: "DESC",
      },
    });
  }

  async update(id, updateData) {
    await this.repository.update({ id }, updateData);
    return await this.findById(id);
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}

module.exports = new OrderRepository();
