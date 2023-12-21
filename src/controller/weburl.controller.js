const webUrlService = require("../service/WebUrlService");

exports.getAllUrls = async (req, res) => {
  const userId = req.user.id;
  const list = await webUrlService.getAllUrlsByUserId(userId);

  return res.json({
    message: "success",
    urls: list,
  });
};

exports.shorten = (req, res) => {};
