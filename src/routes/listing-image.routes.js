const express = require("express");
const router = express.Router();

const upload = require("../middlewares/upload.middleware");
const ListingImageController = require("../controllers/listing-image.controller");

router.post(
  "/listings/:id/images",
  upload.single("image"),
  ListingImageController.uploadImage,
);

router.delete("/listings/images/:imageId", ListingImageController.deleteImage);

module.exports = router;
