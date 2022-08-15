import express from "express";
const calendarRouter = express.Router();

import {
  getAllByID,
  getAllByIDAndDate,
  changeStatus,
  newCalendarEntry,
  deleteCalendarEntry,
  deleteAllCalendarEntriesByID,
  getByIDAndUserID,
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
    if (req.query.userId) {
      const results = await getByIDAndUserID(
        Number(req.params.id),
        req.query.userId
      );
      let count = 0;
      for (let i = 0; i < results.length - 1; i++) {
        if (
          Number(results[i].date.charAt(6) + results[i].date.charAt(7)) + 1 ===
            Number(
              results[i + 1].date.charAt(6) + results[i + 1].date.charAt(7)
            ) &&
          results[i].status &&
          results[i + 1].status === "complete"
        ) {
          count++;
        }
      }
      console.log(count);
      res.json({ payload: count });
      return;
    }
    res.status(200).json({
      success: true,
      payload: await getAllByID(Number(req.params.id)),
    });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .send({ success: false, message: "ID and/or date not found" });
  }
});

// update status
calendarRouter.patch("/:id", async (req, res) => {
  try {
    if (req.query.date) {
      res.status(202).json({
        success: true,
        payload: await changeStatus(
          Number(req.params.id),
          req.body.status,
          req.query.date
        ),
      });
      return;
    }
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
