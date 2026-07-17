const express = require("express");

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");

const marketplaceRoutes = require("./marketplace.routes");
const listingImageRoutes = require("./listing-image.routes");
const savedListingRoutes = require("./saved-listing.routes");
const orderRoutes = require("./order.routes");

// Other team modules
// const bookingRoutes = require("./booking.routes");
// const coldroomRoutes = require("./coldroom.routes");
// const logisticsRoutes = require("./logistics.routes");
// const notificationRoutes = require("./notification.routes");
// const paymentRoutes = require("./payment.routes");
// const reviewRoutes = require("./review.routes");
// const walletRoutes = require("./wallet.routes");

// Uncomment when Orders module is implemented
// const orderRoutes = require("./order.routes");

const router = express.Router();

// Authentication & Users
// router.use(authRoutes);
// router.use(userRoutes);

// Marketplace
router.use(marketplaceRoutes);
router.use(listingImageRoutes);
router.use(savedListingRoutes);
router.use(orderRoutes);
// Other modules
// router.use(bookingRoutes);
// router.use(coldroomRoutes);
// router.use(logisticsRoutes);
// router.use(notificationRoutes);
// router.use(paymentRoutes);
// router.use(reviewRoutes);
// router.use(walletRoutes);

module.exports = router;
