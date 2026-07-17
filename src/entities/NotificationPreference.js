const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "NotificationPreference",
    tableName: "notification_preferences",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        sms_enabled: {
            type: "boolean",
            default: true,
        },

        email_enabled: {
            type: "boolean",
            default: true,
        },

        push_enabled: {
            type: "boolean",
            default: true,
        },

        order_updates: {
            type: "boolean",
            default: true,
        },

        booking_updates: {
            type: "boolean",
            default: true,
        },

        payment_updates: {
            type: "boolean",
            default: true,
        },

        marketing_updates: {
            type: "boolean",
            default: false,
        },
    },

    relations: {
        user: {
            target: "User",
            type: "one-to-one",
            joinColumn: true,
            nullable: false,
        },
    },
});