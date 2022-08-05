import express from "express";
const calendarRouter = express.Router();

import {
  getAllByID,
  getAllByIDAndDate,
  newCalendarEntry,
} from "../models/calendar.js";

// get habit by id and date
calendarRouter.get("/:id", async function (req, res) {
  //   let list = await getAllByID(Number(req.params.id));
  //   let selectedDate = list.filter(
  //     (item) => String(item.date) === String(req.query.date)
  //   );
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
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

// update status
// calendarRouter.patch("/:id", (async function(req, res){
//     res.json({success: true, payload: await })
// }))

// post new calendar entry
calendarRouter.post("/", async function (req, res) {
  res.json({ sucess: true, payload: await newCalendarEntry(req.body) });
});

// habit

export default calendarRouter;
