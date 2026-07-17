const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
    name: "BookingHistory",
    tableName: "booking_history",

    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true,
        },

        action: {
            type: "enum",
            enum: [
                "created",
                "modified",
                "cancelled",
                "completed"
            ],
        },

        created_at: {
            type: "timestamp",
            createDate: true,
        },
    },

    relations: {
        booking: {
            target: "Booking",
            type: "many-to-one",
            joinColumn: true,
        },
    },
});