const webUrlService = require("../service/WebUrlService");

exports.getAllUrls = async (req, res) => {
  const userId = req.user.id;
  console.log(userId);
  const list = await webUrlService.getAllUrlsByUserId(userId);

  return res.json({
    message: "success",
    urls: list,
  });
};

exports.shorten = async (req, res) => {
  const userId = req.user.id;
  const { originalURL } = req.body;

  try {
    new URL(originalURL);
  } catch (err) {
    return res.json({
      message: "Please provide Full endpoint. example: https://abc.com",
    });
  }

  // First check for the url for the given user
  // If original url is already present then no need of creation.
  // return the already exisiting shortURL
  const present = await webUrlService.checkOriginalUrl(originalURL, userId);

  if (present) {
    return res.json({
      message: "Already present.",
      url: present,
    });
  }

  // If original url is not present then create a new one.
  const result = await webUrlService.createShortUrl(originalURL, userId);

  return res.status(201).json({
    message: "success",
    url: result,
  });
};
