const {
  test,
  describe,
  beforeEach,
  after
} = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const helper = require("./blog_test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map(b => new Blog(b));
  const promiseAry = blogObjects.map(b => b.save());
  await Promise.all(promiseAry);
});

describe("when there are some initial blogs", () => {
  test("blogs are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all inserted blogs are returned", async () => {
    const response = await api
      .get("/api/blogs");

    assert.strictEqual(response.body.length, helper.initialBlogs.length);
  });

  test("blog posts have an unique id property", async () => {
    const blogs = await helper.blogsInDb();
    Object.hasOwnProperty();
    assert(Object.prototype.hasOwnProperty.call(blogs[0], "id"));
    assert(!Object.prototype.hasOwnProperty.call(blogs[0], "_id"));
  });

  describe("addition of blogs", () => {

    test("new blogs are created successfully", async () => {
      const newBlog = {
        title: "Travel Guide to Japan",
        author: "Fujitama Matsuda",
        url: "https://google.ca",
        likes: 66,
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAfterPost = await helper.blogsInDb();
      assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1);

      const titles = blogsAfterPost.map((b) => b.title);
      assert(titles.includes("Travel Guide to Japan"));
    });

    test("new blogs default to 0 likes if not specified", async () => {
      const newBlog = {
        title: "Unpopular Blog",
        author: "Sad Author",
        url: "https://sadanduseless.com",
      };

      await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const blogsAfterPost = await helper.blogsInDb();
      assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1);

      const savedBlog = blogsAfterPost.find(
        (b) =>
          b.title === newBlog.title &&
          b.author === newBlog.author &&
          b.url === newBlog.url
      );
      assert.strictEqual(savedBlog.likes, 0);
    });

    test("notes without a title or url are not added", async () => {
      const blogWithNoTitle = {
        author: "Sad Author",
        url: "https://sadanduseless.com",
        likes: 1,
      };

      const blogWithNoUrl = {
        title: "no url",
        author: "not me",
      };

      await api.post("/api/blogs").send(blogWithNoUrl).expect(400);

      await api.post("/api/blogs").send(blogWithNoTitle).expect(400);

      const blogsAfterPost = await helper.blogsInDb();
      assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length);
    });
  });

  describe("deletion of blogs", () => {
    test("deletion with valid id should succeed", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      const response = await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      assert.deepStrictEqual(blogToDelete, response.body);

      const blogsAtEnd = await helper.blogsInDb();

      const titlesAndUrls = blogsAtEnd.map(b => `${b.title} at ${b.url}`);
      assert(!titlesAndUrls.includes(`${blogToDelete.title} at ${blogToDelete.url}`));

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);
    });

    test("fails with 400 when id is invalid", async () => {
      const invalidId = "581a82a3445";

      await api.delete(`/api/blogs/${invalidId}`).expect(400);
    });

  });

  describe("updating blogs", () => {
    test("with valid id should succeed", async () => {
      const startingBlogs = await helper.blogsInDb();
      const blogToUpdate = startingBlogs[0];

      blogToUpdate.likes = 8888;

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)
        .expect(200)
        .expect("Content-Type", /application\/json/);
      const updatedBlog = response.body;
      assert.deepStrictEqual(blogToUpdate, updatedBlog);

      const blogsAfterUpdate = await helper.blogsInDb();
      assert.deepStrictEqual(blogToUpdate, blogsAfterUpdate.find(b => b.id === blogToUpdate.id));
    });
  });
});

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  const emptyList = [];
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
      likes: 5,
      __v: 0,
    },
  ];
  const bigListOfBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("of empty list is zero", () => {
    assert.strictEqual(listHelper.totalLikes(emptyList), 0);
  });

  test("when list has only one blog, equals the likes of that", () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), 5);
  });

  test("of a bigger list is calculated correctly", () => {
    assert.strictEqual(listHelper.totalLikes(bigListOfBlogs), 36);
  });
});

describe("favourite blog", () => {
  const oneBlog = [
    {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      likes: 12,
    }
  ];
  const bigListOfBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("out of one blog is just that blog", () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(oneBlog), oneBlog[0]);
  });

  test("out of many blogs is the one with most likes", () => {
    const expectedFavBlog = {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    };

    assert.deepStrictEqual(listHelper.favoriteBlog(bigListOfBlogs), expectedFavBlog);
  });
});

describe("most blogs", () => {
  const oneBlog = [
    {
      title: "Travel Guide to Japan",
      author: "Fujitama Matsuda",
      likes: 66,
    },
  ];
  const bigListOfBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("should work on big list of blogs", () => {
    assert.strictEqual(listHelper.mostBlogs(bigListOfBlogs), "Robert C. Martin");
  });

  test("with one blog is just the author of that blog", () => {
    assert.strictEqual(listHelper.mostBlogs(oneBlog), "Fujitama Matsuda");
  });
});

describe("most liked", () => {
  const oneBlog = [
    {
      title: "Travel Guide to Japan",
      author: "Fujitama Matsuda",
      likes: 66,
    },
  ];
  const bigListOfBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0,
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0,
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0,
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0,
    },
  ];

  test("should work with one blog", () => {
    const expectedResult = {
      author: "Fujitama Matsuda",
      likes: 66,
    };
    assert.deepStrictEqual(
      listHelper.mostLiked(oneBlog),
      expectedResult
    );
  });

  test("should work with big list of blogs", () => {
    const expectedResult = {
      author: "Edsger W. Dijkstra",
      likes: 17
    };
    assert.deepStrictEqual(listHelper.mostLiked(bigListOfBlogs), expectedResult);
  });
});

after(async () => {
  await mongoose.connection.close();
});