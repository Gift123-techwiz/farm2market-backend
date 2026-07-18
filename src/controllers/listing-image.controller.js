const ListingImageService = require("../services/listing-image.service");

exports.uploadImage = async (req, res) => {
  try {
    const image = await ListingImageService.uploadImage(
      req.params.id,
      req.file,
    );

    res.status(201).json({
      success: true,
      message: "Image uploaded successfully.",
      data: image,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.deleteImage = async (req, res) => {
  try {
    await ListingImageService.deleteImage(req.params.imageId);

    res.json({
      success: true,
      message: "Image deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    res.status(400).json({
      success: false,
      message: error.message,
      stack: error.stack,
    });
  }
};
