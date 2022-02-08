const NotCorrectError = require('../errors/not-correct-error');
const NotFoundError = require('../errors/not-found-error');
const NoRightsError = require('../errors/no-rights-error');

const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((error) => {
      if (error.name === 'ValidationError') { next(new NotCorrectError('Некорректные данные')); } else {
        next(error);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Card.findById(req.params.cardId)
    .orFail(new Error('Not Found'))
    .then((card) => {
      if (card.owner.toString() !== req.user._id.toString()) {
        throw new Error('No rights');
      }

      return card.remove();
    })
    .then(() => res.send({ message: 'Карточка успешно удалена' }))
    .catch((error) => {
      if (error.name === 'CastError') { next(new NotCorrectError('Некорректный id')); } else if (error.message === 'Not Found') { next(new NotFoundError('Запрашиваемая карточка не найдена')); } else if (error.message === 'No rights') { next(new NoRightsError('Нет прав на удаление карточки')); } else {
        next(error);
      }
    });
};

module.exports.likeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $addToSet: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('Not Found'))
  .then((card) => res.send({ data: card }))
  .catch((error) => {
    if (error.name === 'CastError') { next(new NotCorrectError('Некорректный id')); } else if (error.message === 'Not Found') { next(new NotFoundError('Запрашиваемая карточка не найдена')); } else {
      next(error);
    }
  });

module.exports.dislikeCard = (req, res, next) => Card.findByIdAndUpdate(
  req.params.cardId,
  { $pull: { likes: req.user._id } },
  { new: true },
)
  .orFail(new Error('Not Found'))
  .then((card) => res.send({ data: card }))
  .catch((error) => {
    if (error.name === 'CastError') { next(new NotCorrectError('Некорректный id')); } else if (error.message === 'Not Found') { next(new NotFoundError('Запрашиваемая карточка не найдена')); } else {
      next(error);
    }
  });
