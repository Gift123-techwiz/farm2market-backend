const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "BuyerProfile",
    tableName: "buyer_profiles",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        delivery_address: {
            type: "text",
        },

        preferred_payment: {
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

        saved_listings: {
            target: "SavedListing",
            type: "one-to-many",
            inverseSide: "buyer",
        },

        orders: {
            target: "Order",
            type: "one-to-many",
            inverseSide: "buyer",
        },
    },
});