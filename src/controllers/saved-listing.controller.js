const SavedListingService = require("../services/saved-listing.service");

exports.saveListing = async (req, res) => {
  try {
    const saved = await SavedListingService.saveListing(
      req.params.buyerId,
      req.params.listingId,
    );

    res.status(201).json({
      success: true,
      message: "Listing saved successfully.",
      data: saved,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getSavedListings = async (req, res) => {
  try {
    const listings = await SavedListingService.getSavedListings(
      req.params.buyerId,
    );

    res.json({
      success: true,
      data: listings,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.removeSavedListing = async (req, res) => {
  try {
    await SavedListingService.removeSavedListing(
      req.params.buyerId,
      req.params.listingId,
    );

    res.json({
      success: true,
      message: "Saved listing removed successfully.",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
