import app from "../app.js";
import require from "supertest";
import { describe, test, expect } from "@jest/globals";
import { request } from "express";

// check if response = 200
// check if response body is { success: true, payload: array }
// check if every item in payload array is
// {
// "date": any string,
// "status": any string,
// "name": any string,
// "userid": any string,
// "id": any number
// }

// get habit item by id
describe(`get habit item by habit_id`, () => {
  test(`getAllByID`, async () => {
    const res = await require(app).get("/calendar/2");
    expect(res.statusCode).toBe(200);
  });

  test(`checks if response body is {
    success: true, payload: array
  }`, async () => {
    const res = await require(app).get("/calendar/2");
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
  });

  test(`check if every item in the payload array is { date: any string, status: any string, name: any string, userid: any string, id: any number}`, async () => {
    const res = await require(app).get("/calendar/2");
    expect(res.body.payload).toEqual(
      expect.arrayContaining([
        {
          date: expect.any(String),
          status: expect.any(String),
          name: expect.any(String),
          userid: expect.any(String),
          id: expect.any(Number),
        },
      ])
    );
  });
});

// get habit item by id and date
describe(`get habit item by habit_id and date`, () => {
  test(`getAllByIDAndDate`, async () => {
    const res = await require(app).get("/calendar/5?date=20220802");
    expect(res.statusCode).toBe(200);
  });

  test(`checks if response body is {
    success: true, payload: array
  }`, async () => {
    const res = await require(app).get("/calendar/5?date=20220802");
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
  });

  test(`check if every item in the payload array is { date: any string, status: any string, name: any string, userid: any string, id: any number}`, async () => {
    const res = await require(app).get("/calendar/5?date=20220802");
    expect(res.body.payload).toEqual(
      expect.arrayContaining([
        {
          date: expect.any(String),
          id: expect.any(Number),
          name: expect.any(String),
          status: expect.any(String),
          userid: expect.any(String),
        },
      ])
    );
  });
});

// post new calendar entry
describe(`post new calendar entry`, () => {
  test(`Add habit_id, date and status to database`, async () => {
    const res = await require(app).post("/calendar").send({
      habit_id: 2,
      date: "20220809",
      status: "complete",
    });
    expect(res.statusCode).toBe(201);
  });
});
