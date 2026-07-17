const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "ListingImage",
  tableName: "listing_images",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    image_url: {
      type: "text",
    },

    public_id: {
      type: "varchar",
      nullable: false,
    },
  },

  relations: {
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
