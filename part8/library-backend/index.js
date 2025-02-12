const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { v7: uuidv7 } = require("uuid");
const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const bcrypt = require("bcrypt");
const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");
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
      if (!args.genre && !args.author) {
        return Book.find({}).populate("author");
      }

      if (args.genre && args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          return [];
        }

        return Book
          .find({
            genres: { $in: args.genre },
            author: author.id
          }).
          populate("author");
      }

      if (args.genre) {
        return Book.find({ genres: { $in: args.genre } }).populate("author");
      }

      if (args.author) {
        const author = await Author.findOne({ name: args.author });
        if (!author) {
          return [];
        }
        return Book.find({ author: author._id }).populate("author");
      }
    },
    allAuthors: async () => Author.find({}),
    me: async (root, args, context) => {
      return context.currentUser;
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      const book = new Book({ ...args });

      try {
        let existingAuthor = await Author.findOne({ name: args.author });

        if (!existingAuthor) {
          const author = new Author({ name: args.author });
          existingAuthor = await author.save()
            .catch(error => {
              throw new GraphQLError("Creating author failed", {
                extensions: {
                  code: "BAD_USER_INPUT",
                  invalidArgs: args.author,
                  error,
                },
              });
            });
        }

        book.author = existingAuthor.id;
        await book.save();
      } catch (error) {
        throw new GraphQLError("Saving book failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.title,
            error,
          },
        });
      }

      return book;
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name });

      if (!author) {
        throw new GraphQLError("Author not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.name,
          },
        });
      }

      author.born = args.setBornTo;

      try {
        await author.save();
      } catch (error) {
        throw new GraphQLError("Saving author born year failed", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.setBornTo,
            error,
          },
        });
      }
      return author;
    },
    createUser: async (root, args) => {
      const passwordHash = await bcrypt.hash(args.password, 10);

      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre,
        passwordHash,
      });

      return user.save()
        .catch(error => {
          throw new GraphQLError("Creating new user failed", {
            extensions: {
              code: "BAD_USER_INPUT",
              error,
            }
          });
        });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user) {
        throw new GraphQLError("User not found", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.username,
          },
        });
      }

      const passwordCorrect = await bcrypt.compare(args.password, user.passwordHash);
      if (!passwordCorrect) {
        throw new GraphQLError("Wrong password", {
          extensions: {
            code: "BAD_USER_INPUT",
            invalidArgs: args.password,
          },
        });
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, process.env.JWT_SECRET),
      };
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

startStandaloneServer(server, {
  listen: { port: 4001 },
  context: async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null;
      if (auth && auth.startsWith("Bearer ")) {
        const decodedToken = jwt.verify(
          auth.substring(auth.indexOf(" ") + 1),
          process.env.JWT_SECRET
        );

        const currentUser = await User.findById(decodedToken.id);
        return { currentUser };
      }
    },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
