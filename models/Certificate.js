const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  courseTitle: String,
  certificateURL: String,
});

module.exports = mongoose.model("Certificate", certificateSchema);
