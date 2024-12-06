const User = require("../models/user");

const initialUsers = [
  {
    username: "test",
    name: "test",
    password: "test",
  },
];

const nonExistingUserId = async () => {
  const user = new User({
    username: "Soon to be delete",
    name: "not important",
    password: "something",
  });

  await user.save();
  await user.deleteOne();

  return user._id.toString;
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((user) => user.toJSON());
};

module.exports = {
  initialUsers,
  usersInDb,
  nonExistingUserId,
};
