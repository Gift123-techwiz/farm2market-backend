const savedListingRepository = require("../repositories/saved-listing.repository");
const AppDataSource = require("../config/data-source");

class SavedListingService {
  async saveListing(buyerId, listingId) {
    const buyerRepository = AppDataSource.getRepository("BuyerProfile");
    const listingRepository = AppDataSource.getRepository("ProduceListing");

    const buyer = await buyerRepository.findOne({
      where: { id: buyerId },
    });

    if (!buyer) {
      throw new Error("Buyer not found.");
    }

    const listing = await listingRepository.findOne({
      where: { id: listingId },
    });

    if (!listing) {
      throw new Error("Produce listing not found.");
    }

    const existing = await savedListingRepository.findOne(buyerId, listingId);

    if (existing) {
      throw new Error("Listing already saved.");
    }

    return await savedListingRepository.create({
      buyer,
      listing,
    });
  }

  async getSavedListings(buyerId) {
    return await savedListingRepository.findByBuyer(buyerId);
  }

  async removeSavedListing(buyerId, listingId) {
    const saved = await savedListingRepository.findOne(buyerId, listingId);

    if (!saved) {
      throw new Error("Saved listing not found.");
    }

    await savedListingRepository.delete(saved.id);

    return true;
  }
}

module.exports = new SavedListingService();
