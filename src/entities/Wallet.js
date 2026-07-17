const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Wallet",
    tableName: "wallets",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        balance: {
            type: "decimal",
            precision: 12,
            scale: 2,
            default: 0,
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
        user: {
            target: "User",
            type: "one-to-one",
            joinColumn: true,
            inverseSide: "wallet",
            nullable: false,
        },

        transactions: {
            target: "WalletTransaction",
            type: "one-to-many",
            inverseSide: "wallet",
        },
    },
});