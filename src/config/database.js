const { DataSource } = require('typeorm');
const entities = require('../entities');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'farm2market_db',
  synchronize: true,        // Auto-creates tables (dev only)
  logging: false,
  entities: [
    entities.ColdRoomProfile,
    entities.Booking,
    entities.BookingHistory,
    entities.Review,
  ],
});

module.exports = { AppDataSource };