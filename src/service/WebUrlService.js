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

  async createShortUrl(originalUrl, userId) {
    const data = await WebUrl.create({
      originalURL: originalUrl,
      createdBy: userId,
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
