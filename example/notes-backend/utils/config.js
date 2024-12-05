const path = require("path");
require("@dotenvx/dotenvx").config({
  path: path.resolve(__dirname, "../.env"),
});

const PORT = process.env.PORT;
const MONGODB_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_MONGODB_ATLAS_URL
    : process.env.MONGODB_URIprocess.env.MONGODB_ATLAS_URL;

module.exports = {
  MONGODB_URI,
  PORT,
};
