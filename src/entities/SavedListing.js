const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "SavedListing",
    tableName: "saved_listings",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        created_at: {
            type: "timestamp",
            createDate: true,
        },
    },

    relations: {
        buyer: {
            target: "BuyerProfile",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },

        listing: {
            target: "ProduceListing",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },
    },
});