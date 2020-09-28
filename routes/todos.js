const express = require("express");
const _ = require("lodash");
const { Todo, validateTodo } = require("../models/todo");
const auth = require("../middleware/auth");
const router = express.Router();

/* WHAT ID CRUD ;D */

/* C for Create  */
router.post("/", auth, async (req, res) => {
  const { error } = validateTodo(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let todo = new Todo({
    todoTitle :  req.body.todoTitle,
    user_id: req.user._id
  });

  post = await todo.save();
  res.send(post);
});

/* R for Retrieve */
router.get("/", auth, async (req, res) => {
  if (!req.user._id) return res.status(401).send("Access denied.");
  const todos = await Todo.find({ user_id: req.user._id });
  res.send(todos);
});

/* U for Update */
router.put("/:id", auth, async (req, res) => {
  
 // (node:14676) DeprecationWarning: Mongoose: `findOneAndUpdate()` 
 // and `findOneAndDelete()` without the `useFindAndModify` 
 // option set to false are deprecated. See: https://mongoosejs.com/docs/deprecations.html#-findandmodify-

  const filter = { _id: req.params.id };
  let myupdate = {}
  req.body.isdone !== 'undefined' ? myupdate.isdone=req.body.isdone : myupdate=myupdate;
  myupdate.lastUpdate = new Date(Date.now());
  req.body.todoTitle !== 'undefined' ? myupdate.todoTitle=req.body.todoTitle : myupdate=myupdate;

  let todo = await Todo.findOneAndUpdate(
    filter,
    myupdate,
    {
      new: true
    }
  );
  if (!todo)
    return res.status(404).send("The todo with the given ID was not found.");

  todo = await Todo.findOne({ _id: req.params.id, user_id: req.user._id });
  res.send(todo);
});

/* D for Delete */
router.delete("/:id", auth, async (req, res) => {
  const todo = await Todo.findOneAndRemove({
    _id: req.params.id,
    user_id: req.user._id
  });
  if (!todo)
    return res.status(404).send("The Todo with the given ID was not found.");
  res.send(todo);
});

module.exports = router;
