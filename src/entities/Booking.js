const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Booking',
  tableName: 'bookings',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    farmer_id: {
      type: 'int',
      nullable: false,
    },
    cold_room_id: {
      type: 'int',
      nullable: false,
    },
    quantity: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    },
    start_date: {
      type: 'date',
      nullable: false,
    },
    end_date: {
      type: 'date',
      nullable: false,
    },
    status: {
      type: 'enum',
      enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
    updated_at: {
      type: 'timestamp',
      updateDate: true,
    },
  },
  relations: {
    farmer: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'farmer_id', referencedColumnName: 'id' },
      onDelete: 'CASCADE',
    },
    coldRoom: {
      target: 'ColdRoom',
      type: 'many-to-one',
      joinColumn: { name: 'cold_room_id', referencedColumnName: 'id' },
      onDelete: 'CASCADE',
    },
    history: {
      target: 'BookingHistory',
      type: 'one-to-many',
      inverseSide: 'booking',
    },
  },
});