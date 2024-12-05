const notesRouter = require("express").Router();
const Note = require("../models/note");

notesRouter.get("/", async (request, response) => {
  const notes = await Note.find({});
  response.json(notes);
});

notesRouter.post("/", async (request, response) => {
  const body = request.body;

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  });

  const savedNote = await note.save();
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

notesRouter.put("/:id", (request, response, next) => {
  const body = request.body;

  const note = {
    content: body.content,
    important: body.important,
  };

  Note.findByIdAndUpdate(request.params.id, note, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedNote) => {
      response.json(updatedNote);
    })
    .catch((error) => next(error));
});

module.exports = notesRouter;