const mongoose = require('mongoose');
const todoSchema = {  
   todoTitle: {
     type: String,
     required: true,
     minlength: 2,
     maxlength: 1024
   },   
   createdAt: { type: Date, default: Date.now },
   lastUpdate: { type: Date, default: Date.now },  
   isdone: { type: Boolean, default: false },  
   user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  
};

module.exports = {mongoTodoSchema : todoSchema};
