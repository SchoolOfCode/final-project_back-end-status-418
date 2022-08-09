import request from "supertest";
import app from "../app.js";
import { test, expect } from "@jest/globals";

//GET all habits
test(`if get request is sent to /habits, all habits should be returned`, async () => {
  const response = await request(app).get("/habits");
  const expectedBody = {
    message: "All data on habits table",
    success: true,
    data: expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(Number),
        name: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
        frequency: {
          fr_reps: null,
          fr_interval: null,
        },
      }),
    ]),
  };
  expect(response.statusCode).toBe(200);
  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.body).toEqual(expectedBody);
});

//test for POST new habits
//Change info below as this is already in the database
test(`if new habit data sent to /habits, should send and return success`, async () => {
  const response = await request(app)
    .post("/habits")
    .send({
      name: "Go to gym",
      description:
        "On Mon, Wed and Fri I'll leave my gym bag by the front door",
      userId: "3",
      everyday: true,
      frequency: { fr_reps: null, fr_interval: null },
    });

  const expectedBody = {
    success: true,
    message: `Created new habit (${habit.name}) for user ${habit.userId}`,
    data: expect.arrayContaining([
      expect.objectContaining({
        name: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
        frequency: {
          fr_reps: null,
          fr_interval: null,
        },
      }),
    ]),
  };

  expect(response.statusCode).toBe(201);
  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.body).toEqual(expectedBody);
});

//test for PUT by id
test(`Sending a new habit information for a specific id to put route, should update habits entry and confirm`, async () => {
  const response = await request(app)
    .put("/habit/2")
    .send({
      name: "Drink water",
      description: "Keep a jug full of water by my desk",
      userId: "2",
      everyday: true,
      frequency: { fr_reps: null, fr_interval: null },
    });
  const expectedBody = {
    success: true,
    data: expect.arrayContaining([
      expect.objectContaining({
        id: 2,
        name: "Drink water",
        description: "Keep a jug full of water by my desk",
        userId: "2",
        everyday: true,
        frequency: { fr_reps: null, fr_interval: null },
      }),
    ]),
  };

  expect(response.statusCode).toBe(200);
  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.body).toEqual(expectedBody);
});

//test for specific habits using habit id
test(`if get request is sent to /habits/2, habits with id 2 should be returned`, async () => {
  const response = await request(app).get("/habits/2");
  const expectedBody = {
    success: true,
    message: `Data for habit id = ${habitId}`,
    data: expect.arrayContaining([
      expect.objectContaining({
        id: 2,
        name: expect.any(String),
        description: expect.any(String),
        userId: expect.any(String),
        everyday: expect.any(Boolean),
        frequency: {
          fr_reps: null,
          fr_interval: null,
        },
      }),
    ]),
  };
  expect(response.statusCode).toBe(200);
  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.body).toEqual(expectedBody);
});

//test for DELETE habit by id
test(`Sending a habit id to delete route, should delete habit  entry and confirm`, async () => {
  const response = await request(app).delete("/habit/1");
  const expectedBody = {
    success: true,
    message: "Successfully deleted habit with id 2",
  };
  expect(response.statusCode).toBe(200);
  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.body).toEqual(expectedBody);
});
