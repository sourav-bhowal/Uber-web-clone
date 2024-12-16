const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");

// create a new router
const userRouter = express.Router();

// User post router to register a new user
userRouter.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be 3 charcter long"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be 5 charcter long"),
  ],
  // call the registerUser function from the user controller
  userController.registerUser
);

// export the router
module.exports = userRouter;
