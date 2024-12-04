const Blog = require("../models/blog");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce(
    (sum, cur) => sum + cur.likes,
    0
  )
}

module.exports = {
  dummy,
  totalLikes,
};
