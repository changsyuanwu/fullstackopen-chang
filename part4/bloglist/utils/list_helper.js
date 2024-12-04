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

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (fav, cur) => (cur.likes >= fav.likes ? cur : fav)
  );
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
