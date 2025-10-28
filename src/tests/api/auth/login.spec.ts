import test, { expect } from "@playwright/test";
import { apiConfig } from "config/apiConfig";
import { credentials } from "config/env";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validateResponse.utils";
import { userSchema } from "data/schemas/auth/user.schema";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Auth]", () => {

  test("HW-24 Task-1. User Login with valid credentials", async ({ request }) => {
    const loginResponse = await request.post(baseURL + endpoints.login, {
      data: credentials,
      headers: {
        "content-type": "application/json",
      }
    });

    await validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      schema: userSchema,
      IsSuccess: true,
      ErrorMessage: null
    });

    const loginBody = await loginResponse.json();
    expect.soft(loginBody.User.username).toBe(credentials.username);

    const headers = loginResponse.headers();
    expect(headers["authorization"]).toBeTruthy();
  });
});
