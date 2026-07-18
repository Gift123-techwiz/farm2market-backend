const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Review",
    tableName: "reviews",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        rating: {
            type: "int",
        },

        comment: {
            type: "text",
            nullable: true,
        },

        status: {
            type: "enum",
            enum: [
                "pending",
                "approved",
                "rejected",
            ],
            default: "pending",
        },

        moderated_at: {
            type: "timestamp",
            nullable: true,
        },

        rejection_reason: {
            type: "text",
            nullable: true,
        },

        created_at: {
            type: "timestamp",
            createDate: true,
        },
    },

    relations: {

        reviewer: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },

        reviewed_user: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            nullable: false,
        },

        order: {
            target: "Order",
            type: "many-to-one",
            joinColumn: true,
            nullable: true,
        },

        booking: {
            target: "Booking",
            type: "many-to-one",
            joinColumn: true,
            nullable: true,
        },

        logistics_request: {
            target: "LogisticsRequest",
            type: "many-to-one",
            joinColumn: true,
            nullable: true,
        },

        moderated_by: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
            nullable: true,
        },

    },
});