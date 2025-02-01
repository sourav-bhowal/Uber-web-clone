const express = require("express");
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// create a new router
const userRouter = express.Router();

// User post route to register a new user
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

// User post route to login a user
userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Invalid email"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be 5 charcter long"),
  ],
  // call the loginUser function from the user controller
  userController.loginUser
);

// User get route to get user profile
userRouter.get(
  "/profile",
  authMiddleware.authUser,
  userController.getUserProfile
);

// User get route to logout a user
userRouter.get("/logout", authMiddleware.authUser, userController.logoutUser);

// export the router
module.exports = userRouter;
