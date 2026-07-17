const AppDataSource = require("./data-source");

const connectDatabase = async () => {
  try {
    await AppDataSource.initialize();
    console.log(" PostgreSQL connected successfully.");
  } catch (error) {
    console.error(" Database connection failed.");
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
