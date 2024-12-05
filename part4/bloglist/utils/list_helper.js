const _ = require("lodash");

/*
const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});
*/

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

const mostBlogs = (blogs) => {
  return _.head(_(blogs)
    .countBy("author")
    .entries()
    .maxBy(_.last));
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
