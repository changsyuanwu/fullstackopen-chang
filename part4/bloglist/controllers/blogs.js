const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);

  // Get the user who sent the request
  const decodedToken = jwt.verify(request.token, config.JWT_SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  blog.user = user.id;
  const newBlog = await blog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  response.status(201).json(newBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;

  const blog = await Blog.findById(id);

  // Get user who sent the request
  const decodedToken = jwt.verify(request.token, config.JWT_SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  if (blog.user.toString() === user.id) {
    const deletionResult = await Blog.findByIdAndDelete(id);
    if (deletionResult) response.status(200).json(deletionResult);
    else response.status(204).end();
  }
  else {
    response.status(401).json({ error: "token invalid" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const id = request.params.id;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(
    id,
    blog,
    {
      new: true,
      runValidators: true,
      context: "query",
    }
  );

  response.json(updatedBlog);
});

module.exports = blogsRouter;