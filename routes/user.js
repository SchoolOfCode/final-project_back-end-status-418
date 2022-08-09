import express from "express";
const userRouter = express.Router();

import {
  getUserById,
  getAllUsers,
  addNewUser,
  changeUsername,
} from "../models/user.js";

// GET all users
userRouter.get("/", async function (req, res) {
  return res.json({ success: true, payload: await getAllUsers() });
});

//GET specific users using the user_id
userRouter.get("/:id", async function (req, res) {
  try {
    res.status(200).json({
      success: true,
      payload: await getUserById(req.params.id),
    });
  } catch (e) {
    res.status(200).send({
      success: false,
      message: "Please enter correct account id number",
    });
  }
});

// post new user ID from Auth0
userRouter.post("/", async (req, res) => {
  res.json({ success: true, payload: await addNewUser(req.body) });
});

// update username- to allow users to change username
userRouter.put("/:id", async (req, res) => {
  res.json({
    success: true,
    payload: await changeUsername(req.params.id, req.body.username),
  });
});

// delete user

export default userRouter;
