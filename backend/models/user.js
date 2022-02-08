const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const validator = require('validator');

const NoAuthError = require('../errors/no-auth-error');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 30,
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    required: false,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return /^((https|http):\/\/)(www\.)?([A-Za-z0-9]{1}[A-Za-z0-9-]*\.?)*\.{1}[A-Za-z0-9-]{2,}(\/([\w#!:.?+=&%@!\-/])*)?/.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Некорректные данные');
        }
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function Credentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new NoAuthError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new NoAuthError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
