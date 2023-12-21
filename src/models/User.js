const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const validateEmail = function (email) {
  var matcher = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return matcher.test(email);
};

// create User Schema
const userSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      maxLength: 30,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email is Required"],
      validate: [validateEmail, "Email is not valid."],
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    password: { type: String, required: [true, "Password is required"] },
  },
  {
    timestamps: true,
    methods: {
      validPassword: function (password) {
        return bcrypt.compareSync(password, this.password);
      },
    },
  }
);

userSchema.statics.generateHash = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

const User = mongoose.model("users", userSchema);

module.exports = User;
