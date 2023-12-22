const webUrlService = require("../service/WebUrlService");

exports.visit = async (req, res, next) => {
  try {
    const { uniqueUrlParam } = req.params;

    let originalURL = await webUrlService.getOriginalURLByShortId(
      uniqueUrlParam
    );

    if (originalURL) {
      // Update the hits
      await webUrlService.increaseHit(uniqueUrlParam);
      // permanent redirect.
      return res.redirect(301, new URL(originalURL));
    } else {
      return res.status(404).json({
        message: "Not Found.",
      });
    }
  } catch (error) {
    next(error);
  }
};
