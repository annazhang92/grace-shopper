const Sequelize = require('sequelize');
const conn = require('./conn');

const User = conn.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter your first name.'
      }
    }
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter your last name.'
      }
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: {
        args: true,
        msg: 'Please enter your e-mail address.'
      },
      isEmail: {
        args: true,
        msg: 'Please enter a valid e-mail address.'
      }
    }
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  //Instead of deleting users, update the status to I = Inactive
  status: {
    type: Sequelize.CHAR(1),
    defaultValue: 'A'
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
    getterMethods: {
      fullName(value) {
        return `${this.firstName} ${this.lastName}`
      }
    }
});

  // password: {
  //   type: Sequelize.VIRTUAL,
  //   set: function (val) { // eslint-disable-line object-shorthand, func-names
  //     // Remember to set the data value, otherwise it won't be validated
  //     this.setDataValue('password', val);
  //     this.setDataValue('password_hash', this.salt + val);
  //   },
  //   validate: {
  //     isLongEnough: function (val) { // eslint-disable-line object-shorthand, func-names
  //       if (val.length < 8) {
  //         throw new Error('Password must be at least 8 characters')
  //       }
  //     },
  //     is: {
  //       // Reference: http://stackoverflow.com/a/1559788
  //       args: ['(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+'],
  //       msg: 'Password must contain one at least one uppercase, lowercase, number & special character'
  //     }
  //   }
  // }

module.exports = User;
