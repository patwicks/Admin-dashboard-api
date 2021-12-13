const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    gender: {
      type: String,
    },
    profile: {
      type: String,
    },
 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", AdminSchema);
