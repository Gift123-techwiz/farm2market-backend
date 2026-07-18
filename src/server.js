require("reflect-metadata");
require("dotenv").config();

const app = require("./app");
const AppDataSource = require("./config/database");

const PORT = process.env.PORT || 5000;

AppDataSource.initialize()
    .then(() => {

        console.log("Database Connected");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    })
    .catch((error) => {
        console.log(error);
    });