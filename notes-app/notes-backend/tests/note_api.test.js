const {
  test,
  after,
  describe,
  beforeEach,
} = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const assert = require("assert");
const Note = require("../models/note");
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
  await Note.deleteMany({});

  // for...of guarantees execution order (while forEach does not)
  for (let note of helper.initialNotes) {
    let noteObject = new Note(note);
    await noteObject.save();
  }

  /* very cool Promise array way to do this
  const noteObjects = helper.initialNotes
    .map(note => new Note(note))
  const promiseArray = noteObjects.map(note => note.save())
  await Promise.all(promiseArray)
  */
});

describe("when there are some initial notes", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");

    assert.strictEqual(response.body.length, helper.initialNotes.length);
  });

  test("one of the notes is about HTTP being easy", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map((e) => e.content);
    assert(contents.includes("HTML is easy"));
  });

  describe("viewing a specific note", () => {

    test("with a valid id succeeds", async () => {
      const notesAtStart = await helper.notesInDb();

      const noteToView = notesAtStart[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.deepStrictEqual(resultNote.body, noteToView);
    });

    test("fails with statuscode 404 if note does not exist", async () => {
      const validNonexistingId = await helper.nonExistingId();

      await api.get(`/api/notes/${validNonexistingId}`).expect(404);
    });

    test("fails with statuscode 400 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/notes/${invalidId}`).expect(400);
    });
  });

  describe("addition of new note", () => {
    test("succeeds with valid data", async () => {
      const newNote = {
        content: "async/await simplifies making async calls",
        important: true,
      };

      await api
        .post("/api/notes")
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const notesAtEnd = await helper.notesInDb();
      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length + 1);

      const contents = notesAtEnd.map((n) => n.content);
      assert(contents.includes("async/await simplifies making async calls"));
    });

    test("fails with status 400 if data is invalid", async () => {
      const newNote = {
        important: true,
      };

      await api.post("/api/notes").send(newNote).expect(400);

      const notesAtEnd = await helper.notesInDb();

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length);
    });
  });

  describe("deletion of a note", () => {
    test("succeeds with 200 if id is valid", async () => {
      const notesAtStart = await helper.notesInDb();
      const noteToDelete = notesAtStart[0];

      await api
        .delete(`/api/notes/${noteToDelete.id}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      const notesAtEnd = await helper.notesInDb();

      const contents = notesAtEnd.map((r) => r.content);
      assert(!contents.includes(noteToDelete.content));

      assert.strictEqual(notesAtEnd.length, helper.initialNotes.length - 1);
    });
  });

});

after(async () => {
  await mongoose.connection.close();
});
