const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Order",
  tableName: "orders",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid",
    },

    quantity: {
      type: "decimal",
      precision: 10,
      scale: 2,
    },

    total_price: {
      type: "decimal",
      precision: 12,
      scale: 2,
    },

    status: {
      type: "enum",
      enum: ["pending", "paid", "processing", "completed", "cancelled"],
      default: "pending",
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
