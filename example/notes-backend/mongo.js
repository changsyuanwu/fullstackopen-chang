const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const url = process.env.MONGODB_ATLAS_URL;
console.log("connecting to", url);

mongoose.connect(url)
  .then(res => {
    console.log("connected to MongoDB");
  })
  .catch(err => {
    console.log("error connecting to MongoDB", err.message)
  })

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

// note.save().then((result) => {
//   console.log("note saved!");
//   console.log(result)
//   mongoose.connection.close();
// });

Note.find({}).then(res => {
  res.forEach(note => {
    console.log(note)
  })
  mongoose.connection.close()
})
