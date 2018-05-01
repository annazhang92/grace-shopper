const Sequelize = require('sequelize');
const conn = require('./conn');

const Address = conn.define('address', {
  /*fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a valid name.'
      }
    }
  },*/
  isPrimary: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  address1: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address2: {
    type: Sequelize.STRING,
    allowNull: true
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  zipCode: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [5],
        msg: 'Please enter a 5-digit zip code'
      }
    }
  },
  phoneNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: {
        args: [10],
        msg: 'Please enter a 10-digit phone number'
      }
    }
  }
}, {
  timestamps: false
});

module.exports = Address;
