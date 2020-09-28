const userSchema = {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 255
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 255,
      unique: true
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024
    },
    createdAt: { type: Date, default: Date.now },
    lastUpdate: { type: Date, default: Date.now },
  };

  module.exports = {
      mongoUserSchema: userSchema
  }