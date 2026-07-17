const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Payment",
    tableName: "payments",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        amount: {
            type: "decimal",
            precision: 12,
            scale: 2,
        },

        payment_method: {
            type: "varchar",
        },

        reference: {
            type: "varchar",
            unique: true,
        },

        status: {
            type: "enum",
            enum: [
                "pending",
                "successful",
                "failed",
                "refunded"
            ],
            default: "pending",
        },

        paid_at: {
            type: "timestamp",
            nullable: true,
        },
    },

    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            nullable: true,
        },

        order: {
            target: "Order",
            type: "one-to-one",
            joinColumn: true,
            inverseSide: "payment",
            nullable: true,
        },

        refunds: {
            target: "Refund",
            type: "one-to-many",
            inverseSide: "payment",
        },
    },
});