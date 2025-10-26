// Создать тест сьют используя DDT подход с негативными тест-кейсами по регистрации на сайте
// https://anatoly-karpovich.github.io/demo-login-form/

// Требования:
// Страница регистрации:
//   Username: обязательное, от 3 до 40 символов включительно, запрещены префиксные/постфиксные пробелы, как и имя состоящее из одних пробелов
//   Password: обязательное, от 8 до 20 символов включительно, необходима хотя бы одна буква в верхнем и нижнем регистрах, пароль из одних пробелов запрещен

// Страница логина:
//   Username: обязательное
//   Password: обязательное

import { test, expect } from "@playwright/test";

interface ICredentials {
  credentials: {
    username: string;
    password: string;
  };
}

interface IInvalidCredentials extends ICredentials {
  message: NOTIFICATIONS;
  title: string;
}

enum NOTIFICATIONS {
  REGISTERED = "Successfully registered! Please, click Back to return on login page",
  SHORT_PASSWORD = "Password should contain at least 8 characters",
  SHORT_USERNAME = "Username should contain at least 3 characters",
  LONG_USERNAME = "Username should contain at most 40 characters",
  LONG_PASSWORD = "Password should contain at most 20 characters",
  BAN_SPACES = "Prefix and postfix spaces are not allowed is username",
  PASSWORD_MISS_UPPERCASE = "Password should contain at least one character in upper case",
  PASSWORD_MISS_LOWERCASE = "Password should contain at least one character in lower case",
  EMPTY_PASSWORD = "Password is required",
  EMPTY_USERNAME = "Username is required"
}

const invalidCredentials: IInvalidCredentials[] = [
  {
    title: "2 characters username not registered",
    credentials: { username: "us", password: "Password1" },
    message: NOTIFICATIONS.SHORT_USERNAME
  },
  {
    title: "Only spaces username not registered",
    credentials: { username: " ", password: "Password1" },
    message: NOTIFICATIONS.BAN_SPACES
  },
  {
    title: "Empty username not registered",
    credentials: { username: "", password: "Password1" },
    message: NOTIFICATIONS.EMPTY_USERNAME
  },
  {
    title: "Username with leading space not registered",
    credentials: { username: " user3", password: "Password1" },
    message: NOTIFICATIONS.BAN_SPACES
  },
  {
    title: "Username with trailing space not registered",
    credentials: { username: "user4 ", password: "Password1" },
    message: NOTIFICATIONS.BAN_SPACES
  },
  {
    title: "4 characters password not registered",
    credentials: { username: "user5", password: "pass" },
    message: NOTIFICATIONS.SHORT_PASSWORD
  },
  {
    title: "Password without uppercase not registered",
    credentials: { username: "user6", password: "password" },
    message: NOTIFICATIONS.PASSWORD_MISS_UPPERCASE
  },
  {
    title: "Password without lowercase not registered",
    credentials: { username: "user7", password: "PASSWORD" },
    message: NOTIFICATIONS.PASSWORD_MISS_LOWERCASE
  },
  {
    title: "Empty password not registered",
    credentials: { username: "user8", password: " " },
    message: NOTIFICATIONS.EMPTY_PASSWORD
  },
  {
    title: "41 characters username not registered",
    credentials: { username: "u".repeat(41), password: "Password1" },
    message: NOTIFICATIONS.SHORT_USERNAME
  },
  {
    title: "21 characters password not registered",
    credentials: { username: "user10", password: "P".repeat(21) },
    message: NOTIFICATIONS.LONG_PASSWORD
  }
];

test.describe("[HW-21][DDT Invalid credentials]", () => {
  const url = "https://anatoly-karpovich.github.io/demo-login-form/";
  for (const { title, credentials, message } of invalidCredentials) {
    test(title, async ({ page }) => {
      //Selectors
      const loginFormTitle = page.locator("#loginForm");
      const toRegisterButton = page.locator("#registerOnLogin");
      const registerFormTitle = page.locator("#registerForm");
      const usernameInput = page.locator("#userNameOnRegister");
      const passwordInput = page.locator("#passwordOnRegister");
      const registerButton = page.locator("#register");
      //Steps
      await page.goto(url);
      await expect(loginFormTitle).toHaveText("Login");
      await toRegisterButton.click();
      await expect(registerFormTitle).toHaveText("Registration");
      await usernameInput.fill(credentials.username);
      await passwordInput.fill(credentials.password);
      await registerButton.click();
      const notification = page.locator("#errorMessageOnRegister");
      await expect(notification).toHaveText(message);
    });
  }
});
