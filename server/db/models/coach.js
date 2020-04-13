const Sequelize = require('sequelize');
const db = require('../db');

const Coach = db.define('coach', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  bio: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
  type: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
    },
    defaultValue: 0,
  },
});

module.exports = Coach;

/* The `type` field is to account for "assistant", "in-training", etc,
 * with the idea that labels for these might change.
 * We can add/change labels and have these correspond to numbers,
 * hopefully easily from a client perspective, 
 * without having to do a migration.
 */
