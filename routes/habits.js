import express from "express";
const router = express.Router();

//prettier-ignore
import { getAllHabits, getHabitById, getHabitsByUserId, addNewHabit, deleteHabit, fullUpdateofHabit, updateHabitName, updateHabitDescription } from "../models/habits.js";

import convertHabitData from "../functions/convertHabitData.js";

// 🌍 GET
// all habits - includes search query for userId
router.get("/", async (req, res) => {
  // Get all habits by userId – via search query
  if (req.query.userId !== undefined) {
    console.log(req.query.userId);
    const result = await getHabitsByUserId(req.query.userId);
    const convertedData = convertHabitData(result);

    const payload = {
      success: true,
      message: `Data for user_id = ${req.query.userId}`,
      data: convertedData,
    };
    return res.json(payload);
  }

  const result = await getAllHabits();
  const convertedData = convertHabitData(result);

  const payload = {
    success: true,
    message: `All data on habits table`,
    data: convertedData,
  };
  return res.json(payload);
});

// 🌍 GET
//Get by habit id
router.get("/:id", async (req, res) => {
  const result = await getHabitById(Number(req.params.id));
  const convertedData = convertHabitData(result);
  const payload = {
    success: true,
    message: `Data for habit id = ${req.params.id}`,
    data: convertedData,
  };
  if (result.length < 1) {
    return res.json({
      success: false,
      message: "Habit id not found in database",
    });
  } else {
    return res.json(payload);
  }
});

// 📩 POST
// Add entire habit (must be received as body of request, in correct format)

// TODO: Check that body of the request is in the correct format and if not, return an error message

router.post("/", async (req, res) => {
  const result = await addNewHabit(req.body);
  const convertedData = convertHabitData(result);
  const payload = {
    success: true,
    message: `Created new habit (${convertedData[0].name}) for user ${convertedData[0].userId}`,
    data: convertedData,
  };

  return res.status(201).json(payload);
});

// ♻ PUT
// Full update of specific habit (name, description and userId)
// TODO: Check that body of the request is in the correct format and if not, return an error message

router.put("/:id", async (req, res) => {
  const result = await fullUpdateofHabit(Number(req.params.id), req.body);
  const convertedData = convertHabitData(result);
  // console.log(convertedData);
  const payload = {
    success: true,
    //message: `Update habit id ${convertedData[0].id}`,
    data: convertedData,
  };
  return res.json(payload);
});

// 😷 PATCH
// Update just one value of a specific habit
// 1. Update (router.patch) habit name
router.patch("/:id", async function (req, res) {
  const keys = Object.keys(req.body);
  const value = Object.values(req.body);
  let result = [];

  if (keys[0] === "name") {
    result = await updateHabitName(Number(req.params.id), value[0]);
  }
  if (keys[0] === "description") {
    result = await updateHabitDescription(Number(req.params.id), value[0]);
  }
  console.log(result);
  const convertedData = convertHabitData(result);
  console.log(convertedData);
  const payload = {
    success: true,
    message: `Update habit ${keys} for habit id  ${convertedData[0].id}`,
    data: convertedData,
  };
  return res.json(payload);
});

/*router.patch("/:id", async (req, res) => {
  const result = await updateHabitName(Number(req.params.id), req.body);
  const convertedData = convertHabitData(result);
  console.log(convertedData);
  const payload = {
    success: true,
    message: `Update habit name ${convertedData[0].id}`,
    data: convertedData,
  };
  return res.json(payload);
}); */

// 2. Update (router.patch) habit description

/*router.patch("/:id", async (req, res) => {
  const result = await updateHabitDescription(Number(req.params.id), req.body);
  const convertedData = convertHabitData(result);
  console.log(convertedData);
  const payload = {
    success: true,
    message: `Update habit description ${convertedData[0].id}`,
    data: convertedData,
  };
  return res.json(payload);
});*/

// ❌ DELETE
// Delete a habit by its id
router.delete("/:id", async (req, res) => {
  const result = await deleteHabit(Number(req.params.id));
  const convertedData = convertHabitData(result);
  const payload = {
    success: true,
    message: `Successfully deleted habit with id ${req.params.id}`,
    data: convertedData,
  };
  return res.status(200).json(payload);
});

export default router;
