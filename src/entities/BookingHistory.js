const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'BookingHistory',
  tableName: 'booking_history',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    booking_id: {
      type: 'int',
      nullable: false,
    },
    action: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    performed_by: {
      type: 'int',
      nullable: true,
    },
    notes: {
      type: 'text',
      nullable: true,
    },
    created_at: {
      type: 'timestamp',
      createDate: true,
    },
  },
  relations: {
    booking: {
      target: 'Booking',
      type: 'many-to-one',
      joinColumn: { name: 'booking_id', referencedColumnName: 'id' },
      onDelete: 'CASCADE',
    },
    performer: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'performed_by', referencedColumnName: 'id' },
      onDelete: 'SET NULL',
    },
  },
});