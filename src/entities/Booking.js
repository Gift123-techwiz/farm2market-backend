const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "Booking",
    tableName: "bookings",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        produce_type: {
            type: "varchar",
        },

        quantity: {
            type: "int",
        },

        start_date: {
            type: "date",
        },

        end_date: {
            type: "date",
        },

        total_cost: {
            type: "decimal",
            precision: 12,
            scale: 2,
        },

        status: {
            type: "enum",
            enum: [
                "pending",
                "confirmed",
                "active",
                "completed",
                "cancelled"
            ],
            default: "pending",
        },

        created_at: {
            type: "timestamp",
            createDate: true,
        },
    },

    relations: {
        farmer: {
            target: "FarmerProfile",
            type: "many-to-one",
            joinColumn: true,
        },

        coldroom: {
            target: "ColdRoomProfile",
            type: "many-to-one",
            joinColumn: true,
        },

        history: {
            target: "BookingHistory",
            type: "one-to-many",
            inverseSide: "booking",
        },

        logistics_request: {
            target: "LogisticsRequest",
            type: "one-to-one",
            inverseSide: "booking",
        },
    },
});