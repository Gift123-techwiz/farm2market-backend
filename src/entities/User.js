const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "User",
    tableName: "users",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        full_name: {
            type: "varchar",
            length: 100,
        },

        email: {
            type: "varchar",
            unique: true,
        },

        phone: {
            type: "varchar",
            unique: true,
        },

        password: {
            type: "varchar",
        },

        role: {
            type: "enum",
            enum: ["farmer", "buyer", "coldroom", "logistics", "admin"],
            default: "buyer",
        },

        is_verified: {
            type: "boolean",
            default: false,
        },

        verified_badge: {
            type: "boolean",
            default: false,
        },

        is_active: {
            type: "boolean",
            default: true,
        },

        verification_token: {
            type: "varchar",
            nullable: true,
        },

        verification_token_expires: {
            type: "timestamp",
            nullable: true,
        },

        reset_password_token: {
            type: "varchar",
            nullable: true,
        },

        reset_password_token_expires: {
            type: "timestamp",
            nullable: true,
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
        wallet: {
            target: "Wallet",
            type: "one-to-one",
            inverseSide: "user",
        },

        wallet_transactions: {
            target: "WalletTransaction",
            type: "one-to-many",
            inverseSide: "user",
        },

        notification_preference: {
            target: "NotificationPreference",
            type: "one-to-one",
            inverseSide: "user",
        },

        notifications: {
            target: "Notification",
            type: "one-to-many",
            inverseSide: "user",
        },

        farmer_profile: {
            target: "FarmerProfile",
            type: "one-to-one",
            inverseSide: "user",
        },

        buyer_profile: {
            target: "BuyerProfile",
            type: "one-to-one",
            inverseSide: "user",
        },

        coldroom_profile: {
            target: "ColdRoomProfile",
            type: "one-to-one",
            inverseSide: "user",
        },

        logistics_profile: {
            target: "LogisticsProfile",
            type: "one-to-one",
            inverseSide: "user",
        },

        reviews_written: {
            target: "Review",
            type: "one-to-many",
            inverseSide: "reviewer",
        },

        reviews_received: {
            target: "Review",
            type: "one-to-many",
            inverseSide: "reviewed_user",
        },

        refunds_requested: {
            target: "Refund",
            type: "one-to-many",
            inverseSide: "requested_by",
        },

        refunds_approved: {
            target: "Refund",
            type: "one-to-many",
            inverseSide: "approved_by",
        },
    },
});