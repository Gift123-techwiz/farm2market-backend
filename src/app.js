const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const walletRoutes = require("./routes/wallet.routes");
const paymentRoutes = require("./routes/payment.routes");
const adminRoutes = require("./routes/admin.routes");

const logisticsRoutes = require("./routes/logistics.routes");
const logisticsRequestRoutes = require("./routes/logisticsRequest.routes");
const notificationRoutes = require("./routes/notification.routes");

// Marketplace
const marketplaceRoutes = require("./routes/marketplace.routes");
const orderRoutes = require("./routes/order.routes");
const listingImageRoutes = require("./routes/listing-image.routes");
const savedListingRoutes = require("./routes/saved-listing.routes");

// Cold Room
const coldRoomRoutes = require("./routes/coldRoom.Routes");
const bookingRoutes = require("./routes/booking.routes");
const reviewRoutes = require("./routes/review.routes");