const userModel = require("../models/user.model");

// create a new user in the database
module.exports.createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  // check if all fields are provided
  if (!firstName || !email || !password) {
    throw new Error("All fields are required");
  }

  // create a new user in the database
  const user = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
  });

  // return the user
  return user;
};
