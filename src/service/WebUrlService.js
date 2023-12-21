const { default: mongoose } = require("mongoose");
const { generateUrl } = require("../helper/generateUrl");
const WebUrl = require("../models/WebUrl");

class WebUrlService {
  constructor() {}

  async getAllUrlsByUserId(userId) {
    const urls = await WebUrl.find(
      { createdBy: mongoose.SchemaTypes.ObjectId.set(userId) },
      { _id: 0, __v: 0, uniqueUrlParam: 0 }
    );

    return urls;
  }

  async checkOriginalUrl(originalURL, userId) {
    const doc = await WebUrl.findOne(
      {
        originalURL: originalURL,
        createdBy: mongoose.SchemaTypes.ObjectId.set(userId),
      },
      { shortURL: 1 }
    );
    return doc;
  }

  async createShortUrl(originalUrl, userId) {
    const urlUniqueData = generateUrl();

    const data = await WebUrl.create({
      originalURL: originalUrl,
      createdBy: mongoose.SchemaTypes.ObjectId.set(userId),
      shortURL: urlUniqueData.url,

      // This unique param will be used to find the short url whenever any user visits the short URL.
      uniqueUrlParam: urlUniqueData.uniqueId,
    });

    const result = {};

    result.originalURL = data.originalURL;
    result.shortURL = data.shortURL;
    result.hits = data.hits;

    return result;
  }

  async getOriginalURLByShortId(shortId) {
    const doc = await WebUrl.findOne(
      {
        uniqueUrlParam: shortId,
      },
      { originalURL: 1, _id: 0 }
    );

    if (doc) {
      return doc.originalURL;
    } else {
      return null;
    }
  }

  async increaseHit(shortId) {
    const doc = await WebUrl.findOne(
      {
        uniqueUrlParam: shortId,
      },
      { hits: 1 }
    );

    await WebUrl.findByIdAndUpdate(doc.id, { hits: doc.hits + 1 });
  }
}

const webUrlService = new WebUrlService();

module.exports = webUrlService;
