import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      const id = action.payload.id;
      const updatedBlog = action.payload;
      return state.map((blog) => (blog.id !== id ? blog : updatedBlog));
    },
  },
});

export const { setBlogs, appendBlog, updateBlog } = blogSlice.actions;
export default blogSlice.reducer;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blogObject);
      dispatch(appendBlog(newBlog));
    } catch (exception) {
      console.log(exception);
    }
  };
};

export const likeBlog = (blogObject) => {
  return async (dispatch) => {
    try {
      const updatedBlog = await blogService.update(blogObject.id, {
        ...blogObject,
        likes: blogObject.likes + 1,
        user: blogObject.user.id,
      });
      dispatch(updateBlog(updatedBlog));
    } catch (exception) {
      console.log(exception);
    }
  };
};

export const deleteBlog = (id) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const blogs = state.blogs;
      await blogService.deleteBlog(id);
      dispatch(setBlogs(blogs.filter((b) => b.id !== id)));
    } catch (exception) {
      console.log(exception);
    }
  };
};

export const addCommentOnBlog = (id, comment) => {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const blog = state.blogs.find((b) => b.id === id);
      const blogObject = {
        ...blog,
        comments: blog.comments.concat(comment),
      };
      const updatedBlog = await blogService.update(id, blogObject);
      dispatch(updateBlog(updatedBlog));
    } catch (exception) {
      console.log(exception);
    }
  };
};