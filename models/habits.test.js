import app from "../app.js";
import { test, expect } from "@jest/globals";
import request from "supertest";

//testing the overall object structure of the habits table
test("Testing that the habits table is an object within an array", function () {
  const actual = [
    {
      name: "Walk the dog",
      description: "Every day after work I'll grab the dog's leash",
      userId: "1",
      everyday: true,
      frequency: { fr_reps: null, fr_interval: null },
    },
  ];

  const expected = {
    success: true,
    message: "All data on habits table",
    data: [
      {
        name: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
        frequency: {
          fr_reps: null,
          fr_interval: null,
        },
      },
    ],
  };
  expect(actual).toStrictEqual(expected);
});

//test for getHabitsByUserId function
test(`When called getHabitsByUserId function will return with the correct object for that specific UserId`, () => {
  const userId = "1";
  async function getHabitsByUserId(userId) {
    return {
      success: true,
      data: {
        name: "Walk the dog",
        description: "Every day after work I'll grab the dog's leash",
        userId: "1",
        everyday: true,
        frequency: { fr_reps: null, fr_interval: null },
      },
    };
  }
  const actual = getHabitsByUserId(userId);

  const expected = {
    success: true,
    data: {
      name: expect.any(String),
      description: expect.any(String),
      userId: "1",
      everyday: expect.any(Boolean),
      frequency: {
        fr_reps: null,
        fr_interval: null,
      },
    },
  };

  expect(actual).resolves.toStrictEqual(expected);
});

//test for getHabitsById function
test(`When called getHabitsById function will return with the correct object for that specific habit Id`, () => {
  const habitId = 2;
  async function getHabitsByUserId(habitId) {
    return {
      success: true,
      data: [
        {
          haitId: 2,
          name: "Walk the dog",
          description: "Every day after work I'll grab the dog's leash",
          userId: "1",
          everyday: true,
          frequency: { fr_reps: null, fr_interval: null },
        },
      ],
    };
  }
  const actual = getHabitsByUserId(habitId);

  const expected = {
    message: "Data for habit id = 2",
    success: true,
    data: [
      {
        haitId: 2,
        name: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
        frequency: {
          fr_reps: null,
          fr_interval: null,
        },
      },
    ],
  };

  expect(actual).resolves.toStrictEqual(expected);
});

//test for getAllHabits function
test(`When called getAllHabits function will return with all habits`, () => {
  async function getAllHabits() {
    return {
      success: true,
      data: [
        {
          name: "Walk the dog",
          description: "Every day after work I'll grab the dog's leash",
          userId: "1",
          everyday: true,
          frequency: { fr_reps: null, fr_interval: null },
        },
        {
          name: "Drink water",
          description: "Keep a jug full of water by my desk",
          userId: "2",
          everyday: true,
          frequency: { fr_reps: null, fr_interval: null },
        },
        {
          name: "Go to gym",
          description:
            "On Mon, Wed and Fri I'll leave my gym bag by the front door",
          userId: "3",
          everyday: true,
          frequency: { fr_reps: null, fr_interval: null },
        },
      ],
    };
  }
  const actual = getAllHabits();

  const expected = {
    success: true,
    message: "All data on habits table",
    data: [
      {
        name: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
        frequency: {
          fr_reps: null,
          fr_interval: null,
        },
      },
      {
        name: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
        frequency: {
          fr_reps: null,
          fr_interval: null,
        },
      },
      {
        name: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
        frequency: {
          fr_reps: null,
          fr_interval: null,
        },
      },
    ],
  };

  expect(actual).resolves.toStrictEqual(expected);
});

////testing the addNewHabit function
test("Testing that when addNewHabit function is called it will insert the habits into the correct property within the object", function () {
  async function addNewHabit() {
    return {
      success: true,
      data: [
        {
          name: "Walk the dog",
          description: "Every day after work I'll grab the dog's leash",
          userId: "1",
          everyday: true,
          frequency: { fr_reps: null, fr_interval: null },
        },
      ],
    };
  }
  const actual = addNewHabit();

  const expected = {
    success: true,
    data: [
      {
        name: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
        frequency: {
          fr_reps: null,
          fr_interval: null,
        },
      },
    ],
  };
});

////testing the fullUpdateHabit function
test("Testing that when fullUpdateHabit function is called it will insert new the habits details into the correct property within the object", function () {
  async function fullUpdateHabit() {
    return {
      success: true,
      data: [
        {
          name: "Walk the dog",
          description: "Every day after work I'll grab the dog's leash",
          userId: "1",
          everyday: true,
        },
      ],
    };
  }
  const actual = fullUpdateHabit();

  const expected = {
    success: true,
    data: [
      {
        name: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
      },
    ],
  };
});

//testing the deleteHabit function- come back to this
test("Testing that when deleteHabit function is called it will delete the specific habit using the id", function () {
  const habitId = 1;
  async function deleteHabit(habitId) {
    return {
      success: true,
      data: [
        {
          habitId: 1,
          name: "Walk the dog",
          description: "Every day after work I'll grab the dog's leash",
          userId: "1",
          everyday: true,
          frequency: { fr_reps: null, fr_interval: null },
        },
      ],
    };
  }
  const actual = deleteHabit(habitId);

  const expected = {
    success: true,
    message: `Successfully deleted habit with id ${habitId}`,
    data: [
      {
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
        frequency: {
          fr_reps: null,
          fr_interval: null,
        },
      },
    ],
  };
});

//testing the updateHabitName function
test("Testing that when updateHabitName function is called it will change the habits name using the habit id", function () {
  const habitId = 1;
  const name = "Drink water";
  async function updateHabitName(name, habitId) {
    return {
      success: true,
      data: [
        {
          habitId: 1,
          name: "Walk the dog",
          description: "Every day after work I'll grab the dog's leash",
          userId: "1",
          everyday: true,
        },
      ],
    };
  }
  const actual = updateHabitName(name, habitId);

  const expected = {
    success: true,
    data: [
      {
        habitId: 1,
        name: "Drink water",
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
      },
    ],
  };
});

//testing the updateHabitDescription function
test("Testing that when updateHabitDescription function is called it will change the habits description using the habit id", function () {
  const habitId = 1;
  const description = "Every day before work I'll grab the dog's leash";
  async function updateHabitName(description, habitId) {
    return {
      success: true,
      data: [
        {
          habitId: 1,
          name: "Walk the dog",
          description: "Every day after work I'll grab the dog's leash",
          userId: "1",
          everyday: true,
        },
      ],
    };
  }
  const actual = updateHabitName(description, habitId);

  const expected = {
    success: true,
    data: [
      {
        habitId: 1,
        name: "Every day before work I'll grab the dog's leash",
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
      },
    ],
  };
});
