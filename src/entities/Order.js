const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Order",
    tableName: "orders",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
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
            enum: [
                "pending",
                "confirmed",
                "processing",
                "completed",
                "cancelled",
            ],
            default: "pending",
        },

        created_at: {
            type: "timestamp",
            createDate: true,
        },

        updated_at: {
            type: "timestamp",
            updateDate: true,
        },
    },

    relations: {
        buyer: {
            target: "BuyerProfile",
            type: "many-to-one",
            joinColumn: {
                name: "buyer_id",
            },
            inverseSide: "orders",
            nullable: false,
            onDelete: "CASCADE",
        },

        listing: {
            target: "ProduceListing",
            type: "many-to-one",
            joinColumn: {
                name: "listing_id",
            },
            inverseSide: "orders",
            nullable: false,
            onDelete: "CASCADE",
        },

        payment: {
            target: "Payment",
            type: "one-to-one",
            inverseSide: "order",
        },
    },
});