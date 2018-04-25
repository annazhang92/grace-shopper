const Sequelize = require('sequelize');
const conn = require('./conn');

const CreditCard = conn.define('creditCard', {
  creditCardNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isNumeric: true,
      len: {
        args: [15, 16],
        msg: 'Credit card must be 15 or 16 digits'
      }
    }
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter a valid name.'
      }
    }
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
      isNumeric: true,
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
      isNumeric: true,
      len: {
        args: [10],
        msg: 'Please enter a 10-digit phone number'
      }
    }
  }
});


module.exports = CreditCard;
