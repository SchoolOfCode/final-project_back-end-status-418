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
      // count the number of consecutive complete up to and include current day
      //

    const today = new Date();
    const year = String(today.getFullYear())
    let month = ""; 
    if (today.getMonth() + 1 < 9) {
    month = "0" + String(today.getMonth() + 1)
    } else {
        month = String(today.getMonth() + 1)
    }
    console.log("MONTH: ", month)
    let day = "";
    if (today.getDate() < 10) {
        day = "0" + String(today.getDate())
    } else {
        day = String(today.getDate())
    }
    console.log("DAY : ", day)
  
    const fullDate = Number(year+month+day)

      let count = 0;
      let streaks = 0;
      console.log(results);
      for (let i = 0; i < results.length - 1; i++) {
        // console.log(
        //   "i",
        //   Number(results[i].date.charAt(6) + results[i].date.charAt(7))
        // );
        console.log(
          "i+1",
          Number(results[i].date.charAt(6) + results[i].date.charAt(7)) + 1
        );
        console.log(
          "next date",
          Number(results[i + 1].date.charAt(6) + results[i + 1].date.charAt(7))
        );
        if (
          Number(results[i].date.charAt(6) + results[i].date.charAt(7)) + 1 ===
            Number(
              results[i + 1].date.charAt(6) + results[i + 1].date.charAt(7)
            ) &&
          results[i].status === "complete" &&
          results[i + 1].status === "complete"
        ) {
          console.log(count);
          count++;
          streaks++;
        } else {
          count = 0;
        }
      }
      if (count > 1) {
        count++;
      }
      // if (
      //   Number(
      //     results[results.length - 2].date.charAt(6) +
      //       results[results.length - 2].date.charAt(7)
      //   ) +
      //     1 ===
      //     Number(
      //       results[results.length - 1].date.charAt(6) +
      //         results[results.length - 1].date.charAt(7)
      //     ) &&
      //   ((results[results.length - 2].status === "complete") ===
      //     results[results.length - 1].status) ===
      //     "complete"
      // ) {
      //   count++;
      // }
      console.log("final", count);
      console.log(streaks);
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
