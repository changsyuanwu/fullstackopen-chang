const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({}).populate(
    "user",
    {
      username: 1,
      name: 1
    }
  );
  response.json(notes);
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), config.JWT_SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }
  const user = await User.findById(decodedToken.id);

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  response.status(201).json(savedNote);
});

notesRouter.get("/:id", async (request, response) => {
  const id = request.params.id;
  const note = await Note.findById(id);
  if (note)
    response.json(note);
  else
    response.status(404).end();
});

notesRouter.delete("/:id", async (request, response) => {
  const id = request.params.id;
  const deletedNote = await Note.findByIdAndDelete(id);
  if (deletedNote) response.status(200).json(deletedNote); // makes more sense to me to give a 200 and return the deleted note
  else response.status(204).end();
});

notesRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  const updatedNote = await Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: "query",
  });
  response.json(updatedNote);
});

module.exports = notesRouter;