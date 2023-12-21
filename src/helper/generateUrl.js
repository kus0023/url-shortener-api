const uniqueId = require("./uniqueId");

/**
 *
 * @returns Returns unique complte URL and Unique Id which is in param.
 */
exports.generateUrl = () => {
  const appHost = process.env.APP_HOST_URL;
  const url = appHost + "/v/" + uniqueId;

  return { url, uniqueId };
};
