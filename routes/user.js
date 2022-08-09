import express from "express";
const userRouter = express.Router();

import {
  getUserById,
  getAllUsers,
  addNewUser,
  changeUsername,
  deleteUser,
} from "../models/user.js";

// GET all users
userRouter.get("/", async function (req, res) {
  try {
    res.status(200).json({ success: true, payload: await getAllUsers() });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Server Unavailable" });
  }
});

//GET specific users using the user_id
userRouter.get("/:id", async function (req, res) {
  try {
    res.status(200).json({
      success: true,
      payload: await getUserById(req.params.id),
    });
  } catch (err) {
    res.status(400).send({
      success: false,
      message: "Please enter correct account id number",
    });
  }
});

// post new user ID from Auth0
userRouter.post("/", async (req, res) => {
  try {
    res
      .status(202)
      .json({ success: true, payload: await addNewUser(req.body) });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Server Unavailable" });
  }
});

// update username- to allow users to change username
userRouter.patch("/:id", async (req, res) => {
  try {
    res.status(202).json({
      success: true,
      payload: await changeUsername(req.body.username, req.params.id),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Server Unavailable" });
  }
});

// delete user
userRouter.delete("/:id", async (req, res) => {
  try {
    res
      .status(200)
      .json({ success: true, payload: await deleteUser(req.params.id) });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Server Unavailable" });
  }
});

export default userRouter;
