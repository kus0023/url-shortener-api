const ShortUniqueId = require("short-unique-id");
const uid = new ShortUniqueId({ length: 15 });

module.exports = uid.rnd();
