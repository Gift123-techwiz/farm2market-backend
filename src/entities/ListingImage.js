const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "ListingImage",
    tableName: "listing_images",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        image_url: {
            type: "text",
        },

        created_at: {
            type: "timestamp",
            createDate: true,
        },
    },

    relations: {
        listing: {
            target: "ProduceListing",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },
    },
});