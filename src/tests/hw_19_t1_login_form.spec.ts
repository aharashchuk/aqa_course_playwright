import { test, expect } from "@playwright/test";
import { selectors, NOTIFICATIONS } from "./hw_19_variables.spec";

// Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/
// Требования:
//   Страница регистрации:
//     Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//     Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
//   Страница логина:
//     Username: обязательное
//     Password: обязательное

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATIONS {
  REGISTER_SUCCESS = "Successfully registered! Please, click Back to return on login page",
  SHORT_PASS = "Password should contain at least 8 characters",
  SHORT_USERNAME = "Username should contain at least 3 characters",
  SPACES_PREFIX_OR_POSTFIX_USERNAME = "Prefix and postfix spaces are not allowed is username",
  ONLY_SPACES_PASS = "Password is required",
  ONLY_SPACES_USERNAME = "Prefix and postfix spaces are not allowed is username",
  WITHOUT_UPPER_PASS = "Password should contain at least one character in upper case",
  WITHOUT_LOWER_PASS = "Password should contain at least one character in lower case",
  EMPTY_PASS = "Password is required",
  EMPTY_USERNAME = "Username is required"
}

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  // Click the get started link.
  await page.getByRole("link", { name: "Get started" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole("heading", { name: "Installation" })).toBeVisible();
});
