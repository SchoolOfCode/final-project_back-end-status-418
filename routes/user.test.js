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
});

test(`if /user/user_id is sent it should return all the details for that`, async () => {
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
});

describe(`add new username and user_id from Auth0 onto users table`, () => {
  test(`add username and user_id`, async () => {
    const res = await request(app)
      .post("/user")
      .send({ user_id: "Auth0|GEGHEYRH463256", username: "sam123" });
    expect(res.statusCode).toBe(202);
  });
});
