const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('config');
const { mongoUserSchema } = require('./schema/userSchema');

const userSchema = new mongoose.Schema(mongoUserSchema);

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, biz: this.biz }, config.get('jwtKey'));
  return token;
}

const User = mongoose.model('User', userSchema);

function validateUser(user) {

  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(6).max(1024).required(),
  });

  return schema.validate(user);
}

function validateTodos(data) {

  const schema = Joi.object({
    todos : Joi.array().min(1).required()
  });

  return schema.validate(data);
}

exports.User = User;
exports.validate = validateUser;
exports.validateTodos = validateTodos;