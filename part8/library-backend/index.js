const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v7: uuidv7 } = require("uuid");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const Author = require("./models/author");
const Book = require("./models/book");
const typeDefs = require("./typedefs");

require("@dotenvx/dotenvx").config();

const MONGODB_URI = process.env.MONGODB_ATLAS_URL;

console.log("connecting to", MONGODB_URI);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const resolvers = {
  Author: {
    bookCount: async (root) => {
      return await Book.find({ author: root.id }).countDocuments();
    },
  },
  Query: {
    bookCount: async => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.genre) {
        return Book.find({}).populate("author");
      }

      return Book
        .find({ genres: { $in: args.genre } })
        .populate("author");
    },
    allAuthors: async () => Author.find({}),
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });

      try {
        let existingAuthor = await Author.findOne({ name: args.author });

        if (!existingAuthor) {
          const author = new Author({ name: args.author });
          existingAuthor = await author.save();
        }

        book.author = existingAuthor.id;
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }

      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving author born year failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            error,
          },
        });
      }
      return author;
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
