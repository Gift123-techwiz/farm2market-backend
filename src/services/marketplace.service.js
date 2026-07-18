const listingRepository = require("../repositories/listing.repository");

class MarketplaceService {
  async createListing(listingData) {
    return await listingRepository.create(listingData);
  }

  async getAllListings(filters = {}) {
    if (Object.keys(filters).length > 0) {
      return await listingRepository.search(filters);
    }

    return await listingRepository.findAll();
  }

  async getListingById(id) {
    const listing = await listingRepository.findById(id);

    if (!listing) {
      throw new Error("Produce listing not found.");
    }

    return listing;
  }

  async updateListing(id, updateData) {
    const listing = await listingRepository.findById(id);

    if (!listing) {
      throw new Error("Produce listing not found.");
    }

    return await listingRepository.update(id, updateData);
  }

  async deleteListing(id) {
    const listing = await listingRepository.findById(id);

    if (!listing) {
      throw new Error("Produce listing not found.");
    }

    await listingRepository.delete(id);

    return {
      success: true,
      message: "Produce listing deleted successfully.",
    };
  }

  async getFarmerListings(farmerId) {
    return await listingRepository.findByFarmer(farmerId);
  }
}

module.exports = new MarketplaceService();
