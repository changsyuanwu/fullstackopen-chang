const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  response.json(blogs);
});

blogsRouter.post("/", async (request, response) => {
  const blog = new Blog(request.body);
  const user = request.user;

  blog.user = user.id;
  const newBlog = await blog.save();
  user.blogs = user.blogs.concat(newBlog._id);
  await user.save();

  newBlog.user = {
    username: user.username,
    name: user.name,
  };

  response.status(201).json(newBlog);
});

blogsRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const blog = await Blog.findById(id);
  const user = request.user;

  if (blog.user.toString() === user.id) {
    const deletionResult = await Blog.findByIdAndDelete(id);
    if (deletionResult) response.status(200).json(deletionResult);
    else response.status(204).end();
  }
  else {
    response.status(401).json({ error: "logged in user is not creator of blog" });
  }
});

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;
  const id = request.params.id;
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: body.user,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(updatedBlog);
});

module.exports = blogsRouter;