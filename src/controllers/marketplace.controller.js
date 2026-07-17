const marketplaceService = require("../services/marketplace.service");

class MarketplaceController {
  async createListing(req, res) {
    try {
      const listing = await marketplaceService.createListing(req.body);

      return res.status(201).json({
        success: true,
        message: "Produce listing created successfully.",
        data: listing,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAllListings(req, res) {
    try {
      const listings = await marketplaceService.getAllListings(req.query);

      return res.json({
        success: true,
        data: listings,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getListingById(req, res) {
    try {
      const listing = await marketplaceService.getListingById(req.params.id);

      return res.json({
        success: true,
        data: listing,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateListing(req, res) {
    try {
      const listing = await marketplaceService.updateListing(
        req.params.id,
        req.body,
      );

      return res.json({
        success: true,
        message: "Listing updated successfully.",
        data: listing,
      });
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteListing(req, res) {
    try {
      const result = await marketplaceService.deleteListing(req.params.id);

      return res.json(result);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new MarketplaceController();
