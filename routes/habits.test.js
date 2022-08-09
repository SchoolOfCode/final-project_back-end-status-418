import request from "supertest";
import app from "../app.js";
import { test, expect } from "@jest/globals";

//Get all portfolios
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
