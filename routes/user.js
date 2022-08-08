import express from "express";
const userRouter = express.Router();

import { getUserById, getUserByUsername } from "../models/user.js";

//GET all users using account_id
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

// GET  users using username
userRouter.get("/", async function (req, res) {
  const user = String(req.query.username);
  console.log(user);
  if (req.query.username !== undefined) {
    const result = await getUserByUsername(req.query.username);
    return res.json({ success: true, payload: result });
  }
  return res.json({ message: "List of users not available" });
});

export default userRouter;
