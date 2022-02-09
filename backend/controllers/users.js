const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const NotCorrectError = require('../errors/not-correct-error');
const NotFoundError = require('../errors/not-found-error');
const ExistEmailError = require('../errors/exist-email-error');
const NoAuthError = require('../errors/no-auth-error');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, process.env.NODE_ENV === 'production' ? process.env.JWT_SECRET : 'dev-secret', { expiresIn: '7d' });

      res.send({ token });
    })
    .catch((error) => {
      if (error.name === 'Неправильные почта или пароль') { next(new NoAuthError('Неправильные почта или пароль')); } else {
        next(error);
      }
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(new Error('Not Found'))
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'CastError') { next(new NotCorrectError('Некорректный id')); } else if (error.message === 'Not Found') { next(new NotFoundError('Запрашиваемый пользователь не найден')); } else {
        next(error);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email,
  } = req.body;

  bcrypt.hash(req.body.password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
      data: {
        name: user.name, about: user.about, avatar: user.avatar, email: user.email,
      },
    }))
    .catch((error) => {
      if (error.name === 'ValidationError') { next(new NotCorrectError('Некорректные данные')); } else if (error.name === 'MongoServerError' && error.code === 11000) { next(new ExistEmailError('Пользователь с таким email уже существует')); } else {
        next(error);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new Error('Not Found'))
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') { next(new NotCorrectError('Некорректные данные')); } else if (error.message === 'Not Found') { next(new NotFoundError('Запрашиваемый пользователь не найден')); } else {
        next(error);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true })
    .orFail(new Error('Not Found'))
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.name === 'ValidationError') { next(new NotCorrectError('Некорректные данные')); } else if (error.message === 'Not Found') { next(new NotFoundError('Запрашиваемый пользователь не найден')); } else {
        next(error);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(new Error('Not Found'))
    .then((user) => res.send({ data: user }))
    .catch((error) => {
      if (error.message === 'Not Found') { next(new NotFoundError('Запрашиваемый пользователь не найден')); } else {
        next(error);
      }
    });
};
