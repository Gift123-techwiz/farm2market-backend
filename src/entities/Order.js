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
            type: "int",
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
                "cancelled"
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
            joinColumn: true,
            inverseSide: "orders",
            nullable: false,
        },

        listing: {
            target: "ProduceListing",
            type: "many-to-one",
            joinColumn: true,
            inverseSide: "orders",
            nullable: false,
        },

        payment: {
            target: "Payment",
            type: "one-to-one",
            inverseSide: "order",
        },
    },
});