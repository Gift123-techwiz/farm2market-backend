const { DataSource } = require("typeorm");

const User = require("../entities/User");
const Wallet = require("../entities/Wallet");
const WalletTransaction = require("../entities/WalletTransaction");
const Order = require("../entities/Order");
const Payment = require("../entities/Payment");
const Refund = require("../entities/Refund");
const Booking = require("../entities/Booking");
const BookingHistory = require("../entities/BookingHistory");
const BuyerProfile = require("../entities/BuyerProfile");
const ColdRoomProfile = require("../entities/ColdRoomProfile");
const FarmerProfile = require("../entities/FarmerProfile");
const ListingImage = require("../entities/ListingImage");
const LogisticsProfile = require("../entities/LogisticsProfile");
const LogisticsRequest = require("../entities/LogisticsRequest");
const Notification = require("../entities/Notification");
const NotificationPreference = require("../entities/NotificationPreference");
const ProduceListing = require("../entities/ProduceListing");
const Review = require("../entities/Review");
const SavedListing = require("../entities/SavedListing");

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,

    synchronize: true,
    logging: false,

    entities: [
        User,
        Wallet,
        WalletTransaction,
        FarmerProfile,
        BuyerProfile,
        ColdRoomProfile,
        LogisticsProfile,
        ProduceListing,
        ListingImage,
        SavedListing,
        Order,
        Payment,
        Refund,
        Booking,
        BookingHistory,
        LogisticsRequest,
        Notification,
        NotificationPreference,
        Review,
    ],

    migrations: [],
    subscribers: [],
});

module.exports = AppDataSource;