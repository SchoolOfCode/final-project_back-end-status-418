import express from "express";
const userRouter = express.Router();

import { getUserById, getUserByUsername } from "../models/user.js";

//GET all habits using account_id
userRouter.get("/:id", async function (req, res) {
  try {
    res.status(200).json({
      success: true,
      payload: await getUserById(Number(req.params.id)),
    });
  } catch (e) {
    res.status(404).send({
      sucess: false,
      message: "Please enter correct account id number",
    });
  }
});

// GET all habits using username
userRouter.get("/", async function (req, res) {
  if (req.query.username !== undefined) {
    const result = await getUserByUsername(req.query.username);
    return res.json({ success: true, payload: result });
  }
});

export default userRouter;
