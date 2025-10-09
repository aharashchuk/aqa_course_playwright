// Разработайте смоук тест-сьют с тестами на REGISTER на странице https://anatoly-karpovich.github.io/demo-login-form/
// Требования:
//   Страница регистрации:
//     Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//     Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен
//   Страница логина:
//     Username: обязательное
//     Password: обязательное

import { test, expect } from "@playwright/test";

interface ICredentials {
  username: string;
  password: string;
}

enum NOTIFICATIONS {
  REGISTERED = "Successfully registered! Please, click Back to return on login page",
  SHORT_PASSWORD = "Password should contain at least 8 characters",
  SHORT_USERNAME = "Username should contain at least 3 characters",
  BAN_SPACES = "Prefix and postfix spaces are not allowed is username",
  PASSWORD_MISS_UPPERCASE = "Password should contain at least one character in upper case",
  PASSWORD_MISS_LOWERCASE = "Password should contain at least one character in lower case",
  EMPTY_PASSWORD = "Password is required",
  EMPTY_USERNAME = "Username is required"
}

test.describe("[SMOKE][DEMO LOGIN FORM]", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";

  const validCredentials: ICredentials = {
    username: "alex_user_01",
    password: "Password1"
  };

  const invalidCredentials: readonly ICredentials[] = [
    { username: "us", password: "Password1" }, // too short username
    { username: " ", password: "Password1" }, // only spaces username
    { username: "", password: "Password1" }, // valid username
    { username: " user3", password: "Password1" }, // prefix space in username
    { username: "user4 ", password: "Password1" }, // postfix space in username
    { username: "user5", password: "pass" }, // too short password
    { username: "user6", password: "password" }, // password without uppercase
    { username: "user7", password: "PASSWORD" }, // password without lowercase
    { username: "user8", password: " " } // password with only spaces
  ];

  test.beforeEach(async ({ page }) => {
    const loginFormTitle = page.locator("#loginForm");
    const registerButton = page.locator("#registerOnLogin");
    const registerFormTitle = page.locator("#registerForm");
    await page.goto(url);
    await expect(loginFormTitle).toHaveText("Login");
    await registerButton.click();
    await expect(registerFormTitle).toHaveText("Registration");
  });

  test("User registration with valid credentials", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    await usernameInput.fill(validCredentials.username);
    await passwordInput.fill(validCredentials.password);
    await registerButton.click();
    const notification = page.locator("#errorMessageOnRegister");
    await expect(notification).toHaveText(NOTIFICATIONS.REGISTERED);
  });

  test("Fail short username registration", async ({ page }) => {
    const usernameInput = page.locator("#userNameOnRegister");
    const passwordInput = page.locator("#passwordOnRegister");
    const registerButton = page.locator("#register");
    const { username, password } = invalidCredentials[0]!;
    await usernameInput.fill(username);
    await passwordInput.fill(password);
    await registerButton.click();
    const notification = page.locator("#errorMessageOnRegister");
    await expect(notification).toHaveText(NOTIFICATIONS.SHORT_USERNAME);
  });
});
