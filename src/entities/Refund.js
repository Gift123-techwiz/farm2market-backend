const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Refund",
    tableName: "refunds",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        reason: {
            type: "text",
        },

        refund_method: {
            type: "enum",
            enum: [
                "wallet",
                "bank"
            ],
            default: "wallet",
        },

        status: {
            type: "enum",
            enum: [
                "pending",
                "approved",
                "rejected"
            ],
            default: "pending",
        },

        created_at: {
            type: "timestamp",
            createDate: true,
        },
    },

    relations: {
        payment: {
            target: "Payment",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },

        requested_by: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },

        approved_by: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            nullable: true,
        },
    },
});