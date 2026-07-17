const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'ColdRoom',
  tableName: 'cold_rooms',
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
    facility_name: {
      type: 'varchar',
      length: 255,
      nullable: false,
    },
    state: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    lga: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    capacity: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    },
    available_capacity: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    },
    price_per_tonne: {
      type: 'decimal',
      precision: 10,
      scale: 2,
      nullable: false,
    },
    power_source: {
      type: 'varchar',
      length: 100,
      nullable: false,
    },
    rating: {
      type: 'decimal',
      precision: 2,
      scale: 1,
      default: 0,
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
    bookings: {
      target: 'Booking',
      type: 'one-to-many',
      inverseSide: 'coldRoom',
    },
  },
});