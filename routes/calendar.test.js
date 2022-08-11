import app from "../app.js";
import request from "supertest";
import { describe, test, expect } from "@jest/globals";

// get habit item by id
describe(`get habit item by habit_id`, () => {
  test(`getAllByID`, async () => {
    const res = await request(app).get("/calendar/4");
    expect(res.statusCode).toBe(200);
  }, 50000);

  test(`checks if response body is {
    success: true, payload: array
  }`, async () => {
    const res = await request(app).get("/calendar/4");
    expect(res.body).toEqual(
      {
        success: true,
        payload: expect.any(Array),
      },
      50000
    );
  });

  test(`check if every item in the payload array is { date: any string, status: any string, name: any string, userid: any string, id: any number}`, async () => {
    const res = await request(app).get("/calendar/4");
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
}, 50000);

// get habit item by id and date
describe(`get habit item by habit_id and date`, () => {
  test(`getAllByIDAndDate`, async () => {
    const res = await request(app).get("/calendar/5?date=20220802");
    expect(res.statusCode).toBe(200);
  }, 50000);

  test(`checks if response body is {
    success: true, payload: array
  }`, async () => {
    const res = await request(app).get("/calendar/5?date=20220802");
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
  }, 50000);

  test(`check if every item in the payload array is { date: any string, status: any string, name: any string, userid: any string, id: any number}`, async () => {
    const res = await request(app).get("/calendar/5?date=20220802");
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
  }, 50000);
});

// post new calendar entry
describe(`post new calendar entry`, () => {
  test(`Add habit_id, date and status to database`, async () => {
    const res = await request(app).post("/calendar").send({
      habit_id: 2,
      date: "20220809",
      status: "complete",
    });
    expect(res.statusCode).toBe(201);
  }, 50000);

  test(`checks if the input is of type json`, async () => {
    const res = await request(app).post("/calendar").send({
      habit_id: 2,
      date: "20220809",
      status: "complete",
    });
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  }, 50000);
});

// patch
describe(`update status from incomplete to either complete, miss or fail`, () => {
  test(`updateStatus`, async () => {
    const res = await request(app).patch("/calendar/6?date=20220804").send({
      status: "complete",
    });
    expect(res.statusCode).toBe(202);
  }, 50000);

  test(`checks if response body is {success: true, payload: array)`, async () => {
    const res = await request(app).patch("/calendar/6?date=20220804").send({
      status: "complete",
    });
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
  }, 50000);

  test(`check if every item in the payload array is { id: any number, date: any string, created_at: any string, updated_at: any string, status: any string}`, async () => {
    const res = await request(app).patch("/calendar/6?date=20220804").send(
      {
        status: "complete",
      },
      50000
    );
    expect(res.body.payload).toEqual(
      expect.arrayContaining([
        {
          created_at: expect.any(String),
          date: expect.any(String),
          habit_id: expect.any(Number),
          status: expect.any(String),
          updated_at: expect.any(String),
        },
      ])
    );
  }, 50000);
});

// delete
describe(`Delete a calendar entry by date`, () => {
  test(`Delete a calendar entry`, async () => {
    const res = await request(app).delete("/calendar/6?date=20220802");
    expect(res.statusCode).toBe(200);
  }, 50000);

  test(`checks if response body is {success: true}`, async () => {
    const res = await request(app).delete("/calendar/6?date=20220802");
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
  }, 50000);
});

describe(`delete all calendar entries for a habit`, () => {
  test(`delete all calendar entries`, async () => {
    const res = await request(app).delete("/calendar/2");
    expect(res.statusCode).toBe(200);
  }, 50000);

  test(`checks if response body is {success: true}`, async () => {
    const res = await request(app).delete("/calendar/3");
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
  }, 50000);
});
