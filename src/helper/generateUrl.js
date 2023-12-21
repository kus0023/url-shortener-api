/**
 *
 * @returns Returns unique complte URL and Unique Id which is in param.
 */
exports.generateUrl = () => {
  const ShortUniqueId = require("short-unique-id");
  const uid = new ShortUniqueId();

  const uniqueId = uid.rnd(15);

  const appHost = process.env.APP_HOST_URL;
  const url = appHost + "/" + uniqueId;

  return { url, uniqueId };
};
