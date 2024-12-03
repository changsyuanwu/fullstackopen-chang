const mongoose = require("mongoose");

const username = process.env.MONGODB_ATLAS_USERNAME;
const password = process.env.MONGODB_ATLAS_PASSWORD;
const mongoAtlasClusterLoc = process.env.MONGODB_ATLAS_CLUSTER_LOCATION;

const url = `mongodb+srv://${username}:${password}@${mongoAtlasClusterLoc}/noteApp?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.set("strictQuery", false);

mongoose.connect(url);

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

const note = new Note({
  content: "HTML is easy",
  important: true,
});

note.save().then((result) => {
  console.log("note saved!");
  console.log(result)
  mongoose.connection.close();
});
