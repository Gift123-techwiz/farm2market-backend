const cloudinary = require("../config/cloudinary");
const ListingImageRepository = require("../repositories/listing-image.repository");
const AppDataSource = require("../config/data-source");

class ListingImageService {
  async uploadImage(listingId, file) {
    if (!file) {
      throw new Error("Please upload an image.");
    }

    const listingRepository = AppDataSource.getRepository("ProduceListing");

    const listing = await listingRepository.findOne({
      where: { id: listingId },
    });

    if (!listing) {
      throw new Error("Produce listing not found.");
    }

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "farm2market/listings",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          },
        )
        .end(file.buffer);
    });

    return await ListingImageRepository.create({
      image_url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      listing,
    });
  }

  async deleteImage(imageId) {
    const image = await ListingImageRepository.findById(imageId);

    if (!image) {
      throw new Error("Image not found.");
    }

    if (image.public_id) {
      await cloudinary.uploader.destroy(image.public_id);
    }

    await ListingImageRepository.delete(imageId);

    return true;
  }
}

module.exports = new ListingImageService();
