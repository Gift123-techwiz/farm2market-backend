const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "WalletTransaction",
    tableName: "wallet_transactions",

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

        transaction_type: {
            type: "enum",
            enum: [
                "credit",
                "debit",
                "refund",
                "withdrawal",
                "payment"
            ],
        },

        reference: {
            type: "varchar",
            unique: true,
        },

        description: {
            type: "text",
            nullable: true,
        },

        created_at: {
            type: "timestamp",
            createDate: true,
        },
    },

    relations: {
        wallet: {
            target: "Wallet",
            type: "many-to-one",
            joinColumn: true,
            inverseSide: "transactions",
            nullable: false,
        },
    },
});