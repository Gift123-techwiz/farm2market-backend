const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "LogisticsRequest",
    tableName: "logistics_requests",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        pickup_address: {
            type: "text",
        },

        delivery_address: {
            type: "text",
        },

        estimated_cost: {
            type: "decimal",
            precision: 12,
            scale: 2,
        },

        pickup_date: {
            type: "date",
        },

        delivery_date: {
            type: "date",
            nullable: true,
        },

        current_latitude: {
            type: "decimal",
            precision: 10,
            scale: 7,
            nullable: true,
        },

        current_longitude: {
            type: "decimal",
            precision: 10,
            scale: 7,
            nullable: true,
        },

        last_location_update: {
            type: "timestamp",
            nullable: true,
        },

        status: {
            type: "enum",
            enum: [
                "pending",
                "accepted",
                "picked_up",
                "in_transit",
                "delivered",
                "cancelled"
            ],
            default: "pending",
        },
    },

    relations: {
        booking: {
            target: "Booking",
            type: "many-to-one",
            joinColumn: true,
        },

        logistics_partner: {
            target: "LogisticsProfile",
            type: "many-to-one",
            joinColumn: true,
        },
    },
});