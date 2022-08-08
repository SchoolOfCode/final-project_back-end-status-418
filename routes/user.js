import express from "express";
const userRouter = express.Router();

import { getUserById, getAllUsers } from "../models/user.js";

// GET all users
userRouter.get("/", async function (req, res) {
  const result = await getAllUsers(req.query.username);
  return res.json({ success: true, payload: result });
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

export default userRouter;
