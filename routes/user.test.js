import request from "supertest";
import app from "../app.js";
import { describe, test, expect } from "@jest/globals";

test(`if /user is sent to get route should return all the users in the database`, async () => {
  const response = await request(app).get("/user");
  const expectedBody = {
    success: true,
    payload: expect.arrayContaining([
      {
        user_id: expect.any(String),
        username: expect.any(String),
      },
    ]),
  };
  expect(response.statusCode).toBe(200);
  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.body).toEqual(expectedBody);
}, 50000);

test(`if /user/user_id is sent it should return all the details for that user`, async () => {
  const response = await request(app).get("/user/1");
  const expectedBody = {
    success: true,
    payload: expect.arrayContaining([
      {
        user_id: expect.any(String),
        username: expect.any(String),
      },
    ]),
  };
  expect(response.statusCode).toBe(200);
  expect(response.headers["content-type"]).toMatch(/json/);
  expect(response.body).toEqual(expectedBody);
}, 50000);

describe(`add new username and user_id from Auth0 onto users table`, () => {
  test(`add username and user_id`, async () => {
    const res = await request(app)
      .post("/user")
      .send({ user_id: "GEGHEYRH463256", username: "sam123" });
    expect(res.statusCode).toBe(202);
  }, 50000);

  test(`check if response body is {success: true, payload: any array}`, async () => {
    const res = await request(app)
      .post("/user")
      .send({ user_id: "GEGHEYRH463256", username: "sam123" });
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
  }, 50000);
});

// change username
describe(`update username by id`, () => {
  test(`update username`, async () => {
    const res = await request(app)
      .patch("/user/1")
      .send({ username: "roberto123" });
    expect(res.statusCode).toBe(202);
  });

  test(`check if response body is {success: true}`, async () => {
    const res = await request(app)
      .patch("/user/1")
      .send({ username: "roberto123" });
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
  }, 50000);

  test(`check if every item in the payload array is { user_id: any string, username: any string}`, async () => {
    const res = await request(app)
      .patch("/user/1")
      .send({ username: "roberto123" });
    expect(res.body.payload).toEqual(
      expect.arrayContaining([
        {
          user_id: expect.any(String),
          username: expect.any(String),
        },
      ])
    );
  }, 50000);
});

// delete user
describe(`delete user by id`, () => {
  test(`delete user`, async () => {
    const res = await request(app).delete("/user/3");
    expect(res.statusCode).toBe(200);
  });

  test(`checks if response body is {success: true}`, async () => {
    const res = await request(app).delete("/user/3");
    expect(res.body).toEqual({
      success: true,
      payload: expect.any(Array),
    });
  }, 50000);
});
