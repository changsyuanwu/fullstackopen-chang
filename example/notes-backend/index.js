require("@dotenvx/dotenvx").config()
const express = require("express")
const cors = require("cors")
const Note = require("./models/note")

const app = express()

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}

app.use(express.static("dist"))
app.use(express.json())
app.use(cors())
app.use(requestLogger)

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.get("/api/notes", (request, response, next) => {
  Note.find({})
    .then((notes) => {
      response.json(notes)
    })
    .catch((err) => next(err))
})

app.post("/api/notes", (request, response, next) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    })
  }

  const note = new Note({
    content: body.content,
    important: Boolean(body.important) || false,
  })

  note
    .save()
    .then((savedNote) => {
      response.json(savedNote)
    })
    .catch((err) => next(err))
})

app.get("/api/notes/:id", (request, response, next) => {
  const id = request.params.id
  Note.findById(id)
    .then((note) => {
      if (note)
        response.json(note)
      else
        response.status(404).end()
    })
    .catch(err => next(err))
})

app.delete("/api/notes/:id", (request, response, next) => {
  const id = request.params.id
  Note.findByIdAndDelete(id)
    .then(result => {
      if (result)
        response.status(200).json(result)
      else
        response.status(204).end()
    })
    .catch(err => next(err))
})

app.put("/api/notes/:id", (request, response, next) => {
  const body = request.body

  const note = {
    content: body.content,
    important: body.important,
  }

  Note.findByIdAndUpdate(
    request.params.id,
    note,
    {
      new: true,
      runValidators: true,
      context: "query"
    }
  )
    .then((updatedNote) => {
      response.json(updatedNote)
    })
    .catch((error) => next(error))
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" })
  }
  else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)