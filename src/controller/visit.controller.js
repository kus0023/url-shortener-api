const webUrlService = require("../service/WebUrlService");

exports.visit = async (req, res) => {
  const { uniqueUrlParam } = req.params;

  let originalURL = await webUrlService.getOriginalURLByShortId(uniqueUrlParam);

  if (originalURL) {
    // permanent redirect.
    return res.redirect(301, new URL(originalURL));
  } else {
    return res.status(404).json({
      message: "Not Found.",
    });
  }
};
