const AppDataSource = require("../config/data-source");

class ListingImageRepository {
  constructor() {
    this.repository = AppDataSource.getRepository("ListingImage");
  }

  async create(imageData) {
    const image = this.repository.create(imageData);
    return await this.repository.save(image);
  }

  async findById(id) {
    return await this.repository.findOne({
      where: { id },
      relations: {
        listing: true,
      },
    });
  }

  async delete(id) {
    return await this.repository.delete(id);
  }
}

module.exports = new ListingImageRepository();
