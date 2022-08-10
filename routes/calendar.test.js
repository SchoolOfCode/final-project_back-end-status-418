import app from "../app.js";
import require from "supertest";
import { describe, test, expect } from "@jest/globals";

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

  test(`checks if the input is of type json`, async () => {
    const res = await require(app).post("/calendar").send({
      habit_id: 2,
      date: "20220809",
      status: "complete",
    });
    expect(res.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});

// patch
describe(`update status from incomplete to either complete, miss or fail`, () => {
  test(`updateStatus`, async () => {
    const res = await require(app).patch("/calendar/2?date=20220810").send({
      status: "complete",
    });
    expect(res.statusCode).toBe(202);
  });

  test(`checks if response body is {success: true, payload: array)`, async () => {
    const res = await require(app).patch("/calendar/2?date=20220810").send({
      status: "complete",
    });
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
  });

  test(`check if every item in the payload array is { id: any number, date: any string, created_at: any string, updated_at: any string, status: any string}`, async () => {
    const res = await require(app).patch("/calendar/2?date=20220810").send({
      status: "complete",
    });
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
  });
});

// delete
describe(`Delete a calendar entry by date`, () => {
  test(`Delete a calendar entry`, async () => {
    const res = await require(app).delete("/calendar/2?date=20220811");
    expect(res.statusCode).toBe(200);
  });

  test(`checks if response body is {success: true}`, async () => {
    const res = await require(app).delete("/calendar/2?date=20220811");
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
  });
});

// describe(`delete all calendar entries for a habit`, () => {
//   test(`delete all calendar entries`, async () => {});
// });
