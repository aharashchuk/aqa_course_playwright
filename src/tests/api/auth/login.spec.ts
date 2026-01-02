import { test, expect } from "fixtures/api.fixture";
import { credentials } from "config/env";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { loginSchema } from "data/schemas/auth/login.schema";
import { TAGS } from "data/tags";

test.describe("[API] [Sales Portal] [Auth]", () => {
  test(
    "HW-24 Task-1. User Login with valid credentials",
    { tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.API, TAGS.AUTH] },
    async ({ loginApi }) => {
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
