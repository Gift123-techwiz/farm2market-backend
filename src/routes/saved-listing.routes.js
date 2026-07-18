const express = require("express");
const router = express.Router();

const SavedListingController = require("../controllers/saved-listing.controller");

router.post(
  "/saved-listings/:buyerId/:listingId",
  SavedListingController.saveListing,
);

router.get("/saved-listings/:buyerId", SavedListingController.getSavedListings);

router.delete(
  "/saved-listings/:buyerId/:listingId",
  SavedListingController.removeSavedListing,
);

module.exports = router;
