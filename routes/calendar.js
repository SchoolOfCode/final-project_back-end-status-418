import express from "express";
const calendarRouter = express.Router();

import {
  getAllByID,
  getAllByIDAndDate,
  changeStatus,
  newCalendarEntry,
  deleteCalendarEntry,
  deleteAllCalendarEntriesByID,
} from "../models/calendar.js";

// get habit by id and date
calendarRouter.get("/:id", async (req, res) => {
  try {
    if (req.query.date) {
      res.status(200).json({
        success: true,
        payload: await getAllByIDAndDate(Number(req.params.id), req.query.date),
      });
      return;
    }
    res.status(200).json({
      success: true,
      payload: await getAllByID(Number(req.params.id)),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Server Unavailable" });
  }
});

// update status
calendarRouter.patch("/:id", async (req, res) => {
  try {
    res.status(202).json({
      success: true,
      payload: await changeStatus(Number(req.params.id), req.body.status),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Server Unavailable" });
  }
});

// post new calendar entry
calendarRouter.post("/", async (req, res) => {
  try {
    res
      .status(201)
      .json({ success: true, payload: await newCalendarEntry(req.body) });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Server Unavailable" });
  }
});

// delete
calendarRouter.delete("/:id", async (req, res) => {
  try {
    if (req.query.date) {
      res.status(200).json({
        success: true,
        payload: await deleteCalendarEntry(
          Number(req.params.id),
          req.query.date
        ),
      });
      return;
    }
    res.status(200).json({
      success: true,
      payload: await deleteAllCalendarEntriesByID(Number(req.params.id)),
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Server Unavailable" });
  }
});

export default calendarRouter;
