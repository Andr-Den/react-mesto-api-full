const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return /^((https|http):\/\/)(www\.)?([A-Za-z0-9]{1}[A-Za-z0-9-]*\.?)*\.{1}[A-Za-z0-9-]{2,}(\/([\w#!:.?+=&%@!\-/])*)?/.test(v);
      },
      message: (props) => `${props.value} is not a valid link!`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
