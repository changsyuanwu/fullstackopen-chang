const { test, describe, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const mongoose = require("mongoose");
const helper = require("./user_test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

const api = supertest(app);

describe("when there are some initial users", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const userObjects = helper.initialUsers.map((u) => new User(u));
    const promiseAry = userObjects.map((u) => u.save());
    await Promise.all(promiseAry);
  });

  describe("user creation", () => {
    test("valid users are created successfully", async () => {
      const newUser = {
        username: "test2",
        name: "test2",
        password: "test2",
      };

      await api
        .post("/api/users")
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const usersAfterPost = await helper.usersInDb();
      assert.strictEqual(usersAfterPost.length, helper.initialUsers.length + 1);

      const usernames = usersAfterPost.map((u) => u.username);
      assert(usernames.includes("test2"));
    });

    test("users with duplicate usernames are not created", async () => {
      const newUser = {
        username: "test",
        name: "test2",
        password: "test2",
      };

      await api.post("/api/users").send(newUser).expect(400);

      const usersAfterPost = await helper.usersInDb();
      assert.strictEqual(usersAfterPost.length, helper.initialUsers.length);
    });

    test("users with usernames that are too short are not created", async () => {
      const newUser = {
        username: "tt",
        name: "Terry",
        password: "terryP",
      };

      await api.post("/api/users").send(newUser).expect(400);

      const usersAfterPost = await helper.usersInDb();
      assert.strictEqual(usersAfterPost.length, helper.initialUsers.length);
    });

    test("users with passwords that are too short are not created", async () => {
      const newUser = {
        username: "tttt",
        name: "Terry",
        password: "hi",
      };

      const response = await api.post("/api/users").send(newUser).expect(400);

      const usersAfterPost = await helper.usersInDb();
      assert.strictEqual(usersAfterPost.length, helper.initialUsers.length);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});