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
            joinColumn: {
                name: "buyer_id",
            },
            nullable: false,
            onDelete: "CASCADE",
        },

        listing: {
            target: "ProduceListing",
            type: "many-to-one",
            joinColumn: {
                name: "listing_id",
            },
            nullable: false,
            onDelete: "CASCADE",
        },
    },
});