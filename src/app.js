const express = require("express");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const walletRoutes = require("./routes/wallet.routes");
const paymentRoutes = require("./routes/payment.routes");
const adminRoutes = require("./routes/admin.routes");
const logisticsRoutes = require("./routes/logistics.routes");
const logisticsRequestRoutes = require("./routes/logisticsRequest.routes");
const notificationRoutes = require("./routes/notification.routes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Farm2Market Backend Running",
    });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/wallet", walletRoutes);
app.use("/api/v1/payments", paymentRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/logistics", logisticsRoutes);
app.use("/api/v1/logistics-requests", logisticsRequestRoutes);
app.use("/api/v1/notifications", notificationRoutes);


module.exports = app;