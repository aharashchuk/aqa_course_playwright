import { test, expect } from "@playwright/test";

const url = "https://anatoly-karpovich.github.io/demo-login-form/";
const testUser = {
  email: "test@gmail.com",
  password: "SecretPw123!@#"
};

test.describe("[HW-20][TASK-2]", () => {
  test("Test login via localStorage", async ({ page }) => {
    //Selectors
    const emailInput = page.locator("#userName");
    const passwordInput = page.locator("#password");
    const submitButton = page.locator("#submit");
    const successMessage = page.locator("#successMessage");

    // открыть https://anatoly-karpovich.github.io/demo-login-form/
    await page.goto(url);
    //   - Засунуть в localStorage браузера данные test@gmail.com / SecretPw123!@# для логина на сайт
    await page.evaluate((testUser) => {
      localStorage.setItem(testUser.email, JSON.stringify({ name: testUser.email, password: testUser.password }));
    }, testUser);

    //   - Залогиниться с данными что вы вставили в localStorage
    await page.reload();
    await emailInput.fill(testUser.email);
    await passwordInput.fill(testUser.password);
    await submitButton.click();
    await expect(successMessage).toHaveText(`Hello, ${testUser.email}!`);
  });
});
