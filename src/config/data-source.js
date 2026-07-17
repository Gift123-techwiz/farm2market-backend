require("reflect-metadata");
require("dotenv").config();

const { DataSource } = require("typeorm");
const User = require("../entities/User");
const FarmerProfile = require("../entities/FarmerProfile");
const BuyerProfile = require("../entities/BuyerProfile");
const ProduceListing = require("../entities/ProduceListing");
const ListingImage = require("../entities/ListingImage");
const SavedListing = require("../entities/SavedListing");
const Order = require("../entities/Order");

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,

  synchronize: true,
  logging: false,

  entities: [
    User,
    FarmerProfile,
    BuyerProfile,
    ProduceListing,
    ListingImage,
    SavedListing,
    Order,
  ],

  migrations: ["src/migrations/*.js"],
});

module.exports = AppDataSource;
