import express from "express";
const calendarRouter = express.Router();

import {
  getAllByID,
  getAllByIDAndDate,
  changeStatus,
  newCalendarEntry,
  deleteCalendarEntry,
} from "../models/calendar.js";

// get habit by id and date
calendarRouter.get("/:id", async function (req, res) {
  try {
    if (req.query.date) {
      res.json({
        success: true,
        payload: await getAllByIDAndDate(Number(req.params.id), req.query.date),
      });
    }
    res.status(200).json({
      success: true,
      payload: await getAllByID(Number(req.params.id)),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send();
  }
});

// update status
calendarRouter.patch("/:id", async function (req, res) {
  try {
    res.json({
      success: true,
      payload: await changeStatus(Number(req.params.id), req.body.status),
    });
  } catch (err) {
    console.log(err);
  }
});

// post new calendar entry
calendarRouter.post("/", async function (req, res) {
  try {
    res.json({ success: true, payload: await newCalendarEntry(req.body) });
  } catch (err) {
    console.log(err);
  }
});

// delete
calendarRouter.delete("/:id", async function (req, res) {
  try {
    res.json({
      success: true,
      payload: await deleteCalendarEntry(Number(req.params.id), req.query.date),
    });
  } catch (err) {
    console.log(err);
  }
});

export default calendarRouter;
