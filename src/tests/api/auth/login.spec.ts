import { test, expect } from "fixtures/api.fixture";
import { apiConfig } from "config/apiConfig";
import { LoginApi } from "api/api/login.api";
import { credentials } from "config/env";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { loginSchema } from "data/schemas/auth/login.schema";

const { baseURL, endpoints } = apiConfig;

test.describe("[API] [Sales Portal] [Auth]", () => {

  test("HW-24 Task-1. User Login with valid credentials", async ({ loginApi }) => {
    // const loginResponse = await request.post(baseURL + endpoints.login, {
    //   data: credentials,
    //   headers: {
    //     "content-type": "application/json",
    //   }
    // });
    const loginResponse = await loginApi.login(credentials);

    await validateResponse(loginResponse, {
      status: STATUS_CODES.OK,
      schema: loginSchema,
      IsSuccess: true,
      ErrorMessage: null
    });

    const loginBody = loginResponse.body;
    expect.soft(loginBody.User.username).toBe(credentials.username);

    const headers = loginResponse.headers;
    expect(headers["authorization"]).toBeTruthy();
  });
});
