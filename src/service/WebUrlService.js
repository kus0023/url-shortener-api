const { generateUrl } = require("../helper/generateUrl");
const WebUrl = require("../models/WebUrl");

class WebUrlService {
  constructor() {}

  async getAllUrlsByUserId(userId) {
    const urls = await WebUrl.find(
      { createdBy: userId },
      { shortURL: 1, originalURL: 1, hits: 1 }
    );

    return urls;
  }

  async checkUrl(originalURL, userId) {
    const doc = await WebUrl.findOne(
      {
        originalURL: originalURL,
        createdBy: userId,
      },
      { shortURL: 1, originalURL: 1, hits: 1 }
    );

    return doc;
  }

  async createShortUrl(originalUrl, userId) {
    const urlUniqueData = generateUrl();

    const data = await WebUrl.create({
      originalURL: originalUrl,
      createdBy: userId,
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
}

const webUrlService = new WebUrlService();

module.exports = webUrlService;
