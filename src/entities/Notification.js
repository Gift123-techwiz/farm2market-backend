const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Notification",
    tableName: "notifications",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        title: {
            type: "varchar",
        },

        message: {
            type: "text",
        },

        type: {
            type: "varchar",
        },

        is_read: {
            type: "boolean",
            default: false,
        },

        created_at: {
            type: "timestamp",
            createDate: true,
        },
    },

    relations: {
        user: {
            target: "User",
            type: "many-to-one",
            joinColumn: true,
        },
    },
});