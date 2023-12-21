const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const webUrlSchema = new Schema(
  {
    shortURL: String,
    originalURL: String,
    createdBy: { type: Schema.Types.ObjectId, ref: "users" },
    hits: { type: Number, default: 0 },

    // This unique param will be used to find the short url whenever any user visits the short URL.
    uniqueUrlParam: String,
  },
  { timestamps: true }
);

const WebUrl = mongoose.model("weburls", webUrlSchema);

module.exports = WebUrl;
