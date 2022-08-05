import express from "express";
const calendarRouter = express.Router();

import {
  getAllByID,
  getAllByIDAndDate,
  newCalendarEntry,
} from "../models/calendar.js";

// get all habits with a particular habit_id
calendarRouter.get("/:id", async function (req, res) {
  try {
    res.status(200).json({
      success: true,
      payload: await getAllByID(Number(req.params.id)),
    });
  } catch (e) {
    console.log(e);
    res.status(404).send({
      sucess: false,
      message: "Please enter correct id number",
    });
  }
});

// get habit by id and date
calendarRouter.get("/:id", async function (req, res) {
  res.json({
    success: true,
    payload: await getAllByIDAndDate(Number(req.params.id), req.query.date),
  });
});

// update status

// post new calendar entry
calendarRouter.post("/", async function (req, res) {
  res.json({ sucess: true, payload: await newCalendarEntry(req.body) });
});

// habit

export default calendarRouter;
