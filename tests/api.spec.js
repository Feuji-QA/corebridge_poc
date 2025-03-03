import { test } from "@playwright/test";
require("dotenv").config();
import fs from "fs";
import {
  assertValueToBe,
  assertToHaveProperty,
  assertToBeTruthy,
} from "../utils/helper";

test.describe("Yamaha API Automation", () => {
  let authToken;
  const registrationPayload = JSON.parse(
    fs.readFileSync("data/registrationPayload.json", "utf8")
  );

  test("Login and get Auth Token", async ({ request }) => {
    const response = await request.post(
      `${process.env.BASE_URL}/api/security/login`,
      {
        data: {
          username: process.env.USER_NAME,
          password: process.env.PASS_WORD,
        },
      }
    );
    assertValueToBe(
      response.status(),
      `Login status code is ${response.status()}`,
      200
    );
    const responseBody = await response.json();
    authToken = responseBody.replace(/^Adminqa:/, "");
    assertToBeTruthy(authToken, "Auth token is not empty");
  });

  test("Register a product", async ({ request }) => {
    const response = await request.post(
      `${process.env.BASE_URL}/Marketing/api/Registration`,
      {
        headers: {
          Authenticate: `Avala-Api krishnakanthk:${authToken}`,
          "Content-Type": "application/json",
        },
        data: registrationPayload,
        params: {
          manufacturer: "YM",
        },
      }
    );
    assertValueToBe(
      response.status(),
      `Registration status code is ${response.status()}`,
      201
    );
    const responseBody = await response.json();
    assertToHaveProperty(
      responseBody,
      "Response body contains RegistrationResponseRecords",
      "RegistrationResponseRecords"
    );
  });
});
