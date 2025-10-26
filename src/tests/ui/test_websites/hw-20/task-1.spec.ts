import { test, expect } from "@playwright/test";

const url = "https://the-internet.herokuapp.com/";

test.describe("[HW-20][TASK-1]", () => {
  test("Test disappearing checkbox", async ({ page }) => {
    // Selectors
    const dynamicControlsLink = page.getByRole("link", { name: "Dynamic Controls" });
    const heading1 = page.getByRole("heading", { level: 1 });
    const dynamicControlsPageTitle = page.getByText("Dynamic Controls");
    const removeButton = page.getByRole("button", { name: "Remove" });
    const disappearingCheckbox = page.getByText(" A checkbox");
    const addButton = page.getByRole("button", { name: "Add" });
    const checkboxStatusMesssage = page.locator("p#message");

    //   - открыть https://the-internet.herokuapp.com/
    await page.goto(url);
    await expect(page).toHaveTitle(/The Internet/);
    await expect(heading1).toHaveText("Welcome to the-internet");
    // await expect(dynamicControlsLink).toBeVisible();
    //   - перейти на страницу Dynamic Controls
    await dynamicControlsLink.click();
    //   - Дождаться появления кнопки Remove
    await expect(removeButton).toBeVisible();
    //   - Завалидировать текста в заголовке страницы
    await expect(dynamicControlsPageTitle).toHaveText("Dynamic Controls");
    //   - Чекнуть чекбокс
    await disappearingCheckbox.locator("input").check();
    //   - Кликнуть по кнопке Remove
    await removeButton.click();
    //   - Дождаться исчезновения чекбокса
    await expect(disappearingCheckbox).toBeHidden();
    //   - Проверить наличие кнопки Add
    await expect(addButton).toBeVisible();
    //   - Завалидировать текст It's gone!
    await expect(checkboxStatusMesssage).toHaveText("It's gone!");
    //   - Кликнуть на кнопку Add
    await addButton.click();
    //   - Дождаться появления чекбокса
    await expect(disappearingCheckbox).toBeVisible();
    //   - Завалидировать текст It's back!
    await expect(checkboxStatusMesssage).toHaveText("It's back!");
  });
});
