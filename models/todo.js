const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
const _ = require('lodash');
const {mongoTodoSchema} = require ('./schema/todoSchema');

const todoSchema = new mongoose.Schema(mongoTodoSchema);

const Todo = mongoose.model('Todo', todoSchema);

function validateTodo(todo) {

  const schema = Joi.object({
    todoTitle: Joi.string().min(2).max(1024).required(),
  });

  return schema.validate(todo);
}

async function generateTodoNumber(Todo) {
  while (true) {
    let randomNumber = _.random(1000, 999999);
    let todo = await Todo.findOne({ todoNumber: randomNumber });
    if (!todo) return String(randomNumber);
  }

}

exports.Todo = Todo;
exports.validateTodo= validateTodo;
exports.generateTodoNumber = generateTodoNumber;