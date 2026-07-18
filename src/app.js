const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const walletRoutes = require("./routes/wallet.routes");
const paymentRoutes = require("./routes/payment.routes");
const adminRoutes = require("./routes/admin.routes");

// Marketplace
const marketplaceRoutes = require("./routes/marketplace.routes");
const orderRoutes = require("./routes/order.routes");
const listingImageRoutes = require("./routes/listing-image.routes");
const savedListingRoutes = require("./routes/saved-listing.routes");

// Cold Room & Booking
const coldRoomRoutes = require("./routes/coldRoom.Routes");
const bookingRoutes = require("./routes/booking.routes");
const reviewRoutes = require("./routes/review.routes");

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Farm2Market Backend API is running",
    });
});

// Auth
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);

// Marketplace
app.use("/api/v1/listings", marketplaceRoutes);
app.use("/api/v1/orders", orderRoutes);
app.use("/api/v1/listing-images", listingImageRoutes);
app.use("/api/v1/saved-listings", savedListingRoutes);

// Cold Room
app.use("/api/v1/coldrooms", coldRoomRoutes);
app.use("/api/v1/bookings", bookingRoutes);
app.use("/api/v1/reviews", reviewRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Something went wrong",
    });
});

module.exports = app;