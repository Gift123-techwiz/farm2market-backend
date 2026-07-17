const AppDataSource = require("../config/data-source");

class SavedListingRepository {
  constructor() {
    this.repository = AppDataSource.getRepository("SavedListing");
  }

  async create(data) {
    const saved = this.repository.create(data);
    return await this.repository.save(saved);
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

  async findOne(buyerId, listingId) {
    return await this.repository.findOne({
      where: {
        buyer: {
          id: buyerId,
        },
        listing: {
          id: listingId,
        },
      },
    });
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}

module.exports = new SavedListingRepository();
