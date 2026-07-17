const { EntitySchema } = require('typeorm');

module.exports = new EntitySchema({
  name: 'Review',
  tableName: 'reviews',
  columns: {
    id: {
      primary: true,
      type: 'int',
      generated: true,
    },
    reviewer_id: {
      type: 'int',
      nullable: false,
    },
    reviewed_user_id: {
      type: 'int',
      nullable: false,
    },
    rating: {
      type: 'int',
      nullable: false,
    },
    comment: {
      type: 'text',
      nullable: true,
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
    reviewer: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'reviewer_id', referencedColumnName: 'id' },
      onDelete: 'CASCADE',
    },
    reviewedUser: {
      target: 'User',
      type: 'many-to-one',
      joinColumn: { name: 'reviewed_user_id', referencedColumnName: 'id' },
      onDelete: 'CASCADE',
    },
  },
});