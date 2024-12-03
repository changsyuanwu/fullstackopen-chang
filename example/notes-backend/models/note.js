const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const username = process.env.MONGODB_ATLAS_USERNAME;
const password = process.env.MONGODB_ATLAS_PASSWORD;
const mongoAtlasClusterLoc = process.env.MONGODB_ATLAS_CLUSTER_LOCATION;

const url = `mongodb+srv://${username}:${password}@${mongoAtlasClusterLoc}/noteApp?retryWrites=true&w=majority&appName=Cluster0`;
console.log("connecting to", url);

mongoose
  .connect(url)
  .then((res) => {
    console.log("connected to MongoDB");
  })
  .catch((err) => {
    console.log("error connecting to MongoDB", err.message);
  });

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
});

noteSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Note", noteSchema)