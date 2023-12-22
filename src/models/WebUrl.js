const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const webUrlSchema = new Schema(
  {
    shortURL: { type: String, unique: true },
    originalURL: { type: String, unique: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    hits: { type: Number, default: 0 },

    // This unique param will be used to find the short url whenever any user visits the short URL.
    uniqueUrlParam: { type: String, unique: true },
  },
  { timestamps: true }
);

const WebUrl = mongoose.model("weburls", webUrlSchema);

module.exports = WebUrl;
