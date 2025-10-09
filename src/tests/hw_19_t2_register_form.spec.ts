// Создайте ОДИН смоук тест со следующими шагами:

// 1. Переход на страницу https://anatoly-karpovich.github.io/demo-registration-form/
// 2. Заполните форму регистрации
// 3. Проверьте, что пользователь успешно зарегистрирован

import { test, expect } from "@playwright/test";

type Country = "USA" | "Canada" | "UK";
type Gender = "Male" | "Female";
type Hobbies = "Movies" | "Travelling" | "Gaming" | "Sports" | "Dancing";
type Language = "English" | "Spanish" | "French" | "German" | "Chinese" | "Russian";
type Skills = "Java" | "JavaScript" | "Python" | "C++" | "Ruby";
type MonthNames =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

interface IUserData {
  firstName: string;
  lastName: string;
  address: string;
  email: string;
  phone: string;
  country: Country;
  gender: Gender;
  hobbies: Hobbies[];
  languages: Language[];
  skills: Skills[];
  birthDate: { day: number; month: MonthNames; year: number };
  password: string;
}

const userData: IUserData = {
  firstName: "John",
  lastName: "Doe",
  address: "123 Main St, Anytown, USA",
  email: "john.doe@example.com",
  phone: "1234567890",
  country: "USA",
  gender: "Male",
  hobbies: ["Movies", "Travelling"],
  languages: ["English", "Spanish"],
  skills: ["Java", "JavaScript"],
  birthDate: { day: 1, month: "January", year: 2000 },
  password: "password123"
};

test.describe("[SMOKE][DEMO REGISTRATION FORM]", () => {
  const url = "https://anatoly-karpovich.github.io/demo-registration-form/";

  test("User registration with valid credentials", async ({ page }) => {
    // Selectors
    const pageTitle = page.locator("h2");
    const firstNameInput = page.locator("#firstName");
    const lastNameInput = page.locator("#lastName");
    const fullNameDetails = page.locator("#fullName");
    const addressTextBox = page.locator("#address");
    const emailInput = page.locator("#email");
    const phoneInput = page.locator("#phone");
    const countryDropdown = page.locator("#country");
    const genderMaleRadio = page.locator(`input[value="male"]`);
    const genderFemaleRadio = page.locator(`input[value="female"]`);
    const genderDetails = page.locator("#gender");
    const hobbiesCheckboxes = (hobby: Hobbies) => page.locator(`input.hobby[value="${hobby}"]`);
    const hobbiesDetails = page.locator("#hobbies");
    const languageInput = page.locator("#language");
    const skillsMultiSelect = page.locator("#skills");
    const birthYearDropdown = page.locator("#year");
    const birthMonthDropdown = page.locator("#month");
    const birthDayDropdown = page.locator("#day");
    const birthDateDetails = page.locator("#dateOfBirth");
    const passwordInput = page.locator("#password");
    const confirmPasswordInput = page.locator("#password-confirm");
    const submitButton = page.locator("button[type='submit']");

    // Fill the registration form
    await page.goto(url);
    await expect(pageTitle).toHaveText("Register");
    await firstNameInput.fill(userData.firstName);
    await lastNameInput.fill(userData.lastName);
    await addressTextBox.fill(userData.address);
    await emailInput.fill(userData.email);
    await phoneInput.fill(userData.phone.toString());
    await countryDropdown.selectOption({ label: userData.country });
    userData.gender === "Male" ? await genderMaleRadio.check() : await genderFemaleRadio.check();
    for (const hobby of userData.hobbies) {
      await hobbiesCheckboxes(hobby).check();
    }
    await languageInput.fill(userData.languages.join(", "));
    await skillsMultiSelect.selectOption(userData.skills);
    await birthYearDropdown.selectOption({ label: userData.birthDate.year.toString() });
    await birthMonthDropdown.selectOption({ label: userData.birthDate.month });
    await birthDayDropdown.selectOption({ label: userData.birthDate.day.toString() });
    await passwordInput.fill(userData.password);
    await confirmPasswordInput.fill(userData.password);
    await submitButton.click();

    // Verification
    await expect(pageTitle).toHaveText("Registration Details");
    await expect(fullNameDetails).toHaveText(`${userData.firstName} ${userData.lastName}`);
    await expect(addressTextBox).toHaveText(userData.address);
    await expect(emailInput).toHaveText(userData.email);
    await expect(phoneInput).toHaveText(userData.phone.toString());
    await expect(countryDropdown).toHaveText(userData.country);
    await expect(genderDetails).toHaveText(userData.gender.toLowerCase());
    for (const hobby of userData.hobbies) {
      await expect(hobbiesDetails).toContainText(hobby);
    }
    for (const skill of userData.skills) {
      await expect(skillsMultiSelect).toContainText(skill);
    }
    await expect(birthDateDetails).toHaveText(
      `${userData.birthDate.day} ${userData.birthDate.month} ${userData.birthDate.year}`
    );
  });
});
