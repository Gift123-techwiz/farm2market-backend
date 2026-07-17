const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "ColdRoomProfile",
    tableName: "coldroom_profiles",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        facility_name: {
            type: "varchar",
        },

        state: {
            type: "varchar",
        },

        lga: {
            type: "varchar",
        },

        capacity: {
            type: "int",
        },

        available_capacity: {
            type: "int",
        },

        price_per_tonne: {
            type: "decimal",
            precision: 12,
            scale: 2,
        },

        power_source: {
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

        bookings: {
            target: "Booking",
            type: "one-to-many",
            inverseSide: "coldroom",
        },
    },
});