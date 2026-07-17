const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "FarmerProfile",
    tableName: "farmer_profiles",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        farm_name: {
            type: "varchar",
        },

        crop_types: {
            type: "text",
        },

        state: {
            type: "varchar",
        },

        lga: {
            type: "varchar",
        },

        bank_name: {
            type: "varchar",
        },

        account_name: {
            type: "varchar",
        },

        account_number: {
            type: "varchar",
        },
    },

    relations: {
        user: {
            target: "User",
            type: "one-to-one",
            joinColumn: true,
            nullable: false,
        },

        listings: {
            target: "ProduceListing",
            type: "one-to-many",
            inverseSide: "farmer",
        },

        bookings: {
            target: "Booking",
            type: "one-to-many",
            inverseSide: "farmer",
        },
    },
});