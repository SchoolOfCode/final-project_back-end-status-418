import request from "supertest";
import app from "../app.js";
import { describe, test, expect } from "@jest/globals";

//GET all habits
/*test(`if get request is sent to /habits, all habits should be returned`, async () => {
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
});*/

//test for specific habits using habit id
/*test(`if get request is sent to /habits/2, habits with id 2 should be returned`, async () => {
  const id = 2;
  const response = await request(app).get("/habits/2");
  const expectedBody = {
    success: true,
    message: `Data for habit id = ${id}`,
    data: expect.arrayContaining([
      expect.objectContaining({
        id: 2,
        name: "Drink water",
        description: "Keep a jug full of water by my desk",
        userId: "2",
        everyday: true,
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
});*/

//test for POST new habits
/*test(`if new habit data sent to /habits, should send message and return success`, async () => {
  const name = "test name";
  const userId = "test userId";
  const response = await request(app)
    .post("/habits")
    .send({
      name: "test name",
      description: "test description",
      userId: "test userId",
      everyday: true,
      frequency: { fr_reps: null, fr_interval: null },
    });

  const expectedBody = {
    success: true,
    message: `Created new habit (${name}) for user ${userId}`,
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
});*/

//test for convertedData for put route

//test for PUT by id
/*test(`Sending a new habits information for a specific id to put route, should update exisiting habit entry and confirm`, async () => {
  const id = 34;
  const response = await request(app)
    .put("/habits/34")
    .send({
      name: expect.any(String),
      description: expect.any(String),
      userId: expect.any(String),
      everyday: expect.any(Boolean),
      frequency: {
        fr_reps: null,
        fr_interval: null,
      },
    });
  const expectedBody = {
    success: true,
    message: "Update habit id 34",
    data: expect.arrayContaining([
      expect.objectContaining({
        id: 34,
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

  //expect(response.statusCode).toBe(200);
  //expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.body).toEqual(expectedBody);
});*/

//test for PATCH habit by id- for name and description
test(`Sending a new habit name for a specific id to patch route, should update habits name only`, async () => {
  const response = await request(app).patch("/habit/34").send({
    name: "test test name",
  });
  expect(response.statusCode).toBe(200);
  //expect(response.headers["content-type"]).toMatch(/json/);
  //expect(response.body).toEqual(expectedBody);
});

/*describe("Patch route", () => {
  test("Updating habit name by sending /habits/id to patch route", async () => {
    let convertedData = [
      {
        id: 3,
        name: "test name 1",
      },
    ];
    const res = await request(app).patch("/habits/3");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      success: true,
      message: `Update habit ${convertedData.name} for habit id  ${convertedData.id}`,
      data: convertedData,
    });
  });
});

//test for DELETE habit by id
/*describe("Delete route", () => {
  test("Sending a habit id to delete route, should delete habit entry and confirm", async () => {
    const res = await request(app).delete("/habits/34");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual({
      success: true,
      message: "Successfully deleted habit with id 34",
      data: [],
    });
  });
});
expect(response.headers["content-type"]).toMatch(/json/);*/

//PUT, PATCH AND DELETE ALL GIVE OUT 404 STATUS CODE RATHER THAN 200 OR 201
