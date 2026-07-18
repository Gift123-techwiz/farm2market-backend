const express = require("express");
const marketplaceController = require("../controllers/marketplace.controller");

const router = express.Router();

// Produce Listings
router.post("/listings", marketplaceController.createListing);

router.get("/listings", marketplaceController.getAllListings);

router.get("/listings/:id", marketplaceController.getListingById);

router.patch("/listings/:id", marketplaceController.updateListing);

router.delete("/listings/:id", marketplaceController.deleteListing);

module.exports = router;
