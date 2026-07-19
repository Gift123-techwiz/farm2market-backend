const AppDataSource = require("../config/data-source");

class ListingRepository {
  constructor() {
    this.repository = AppDataSource.getRepository("ProduceListing");
  }

  async create(listingData) {
    const listing = this.repository.create(listingData);
    return await this.repository.save(listing);
  }

  async findAll() {
    return await this.repository.find({
      relations: {
        farmer: {
            user: true,
        },
        images: true,
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
        farmer: {
            user: true,
        },
        images: true,
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

  async findByFarmer(farmerId) {
    return await this.repository.find({
      where: {
        farmer: {
          id: farmerId,
        },
      },
      relations: {
        farmer: {
            user: true,
        },
        images: true,
      },
      order: {
        created_at: "DESC",
      },
    });
  }

  async search(filters) {
    const queryBuilder = this.repository.createQueryBuilder("listing");

    queryBuilder.leftJoinAndSelect("listing.farmer", "farmer");
    queryBuilder.leftJoinAndSelect("listing.images", "images");

    if (filters.produce_name) {
      queryBuilder.andWhere(
        "LOWER(listing.produce_name) LIKE LOWER(:produce_name)",
        {
          produce_name: `%${filters.produce_name}%`,
        },
      );
    }

    if (filters.status) {
      queryBuilder.andWhere("listing.status = :status", {
        status: filters.status,
      });
    }

    if (filters.minPrice) {
      queryBuilder.andWhere("listing.price_per_kg >= :minPrice", {
        minPrice: Number(filters.minPrice),
      });
    }

    if (filters.maxPrice) {
      queryBuilder.andWhere("listing.price_per_kg <= :maxPrice", {
        maxPrice: Number(filters.maxPrice),
      });
    }

    return await queryBuilder.getMany();
  }
}

module.exports = new ListingRepository();
