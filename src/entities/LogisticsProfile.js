const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "LogisticsProfile",
    tableName: "logistics_profiles",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        vehicle_type: {
            type: "varchar",
        },

        load_capacity: {
            type: "int",
        },

        service_region: {
            type: "varchar",
        },

        rating: {
            type: "decimal",
            precision: 2,
            scale: 1,
            default: 0,
        },
    },

    relations: {
        user: {
            target: "User",
            type: "one-to-one",
            joinColumn: true,
            nullable: false,
        },

        logistics_requests: {
            target: "LogisticsRequest",
            type: "one-to-many",
            inverseSide: "logistics_partner",
        },
    },
});