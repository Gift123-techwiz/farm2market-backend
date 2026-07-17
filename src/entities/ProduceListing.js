const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "ProduceListing",
  tableName: "produce_listings",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    produce_name: {
      type: "varchar",
      length: 100,
    },

    quantity: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    price_per_kg: {
      type: "decimal",
      precision: 12,
      scale: 2,
    },

    harvest_date: {
      type: "date",
    },

    quality_grade: {
      type: "varchar",
      length: 20,
    },

    description: {
      type: "text",
      nullable: true,
    },

    status: {
      type: "enum",
      enum: ["available", "sold_out", "inactive"],
      default: "available",
    },

    created_at: {
      type: "timestamp",
      createDate: true,
    },
  },

  relations: {
    farmer: {
      target: "FarmerProfile",
      type: "many-to-one",
      joinColumn: {
        name: "farmer_id",
      },
      nullable: false,
      onDelete: "CASCADE",
    },

    images: {
      target: "ListingImage",
      type: "one-to-many",
      inverseSide: "listing",
      cascade: true,
    },

    savedListings: {
      target: "SavedListing",
      type: "one-to-many",
      inverseSide: "listing",
    },

    orders: {
      target: "Order",
      type: "one-to-many",
      inverseSide: "listing",
    },
  },
});
