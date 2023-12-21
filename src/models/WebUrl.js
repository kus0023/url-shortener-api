const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const uniqueId = require("../helper/uniqueId");

const webUrlSchema = new Schema(
  {
    shortURL: { type: String, default: uniqueId },
    originalURL: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    hits: Number,
  },
  { timestamps: true }
);

const WebUrl = mongoose.model("weburls", webUrlSchema);

module.exports = WebUrl;
