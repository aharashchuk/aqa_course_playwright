// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

// Сайт: https://the-internet.herokuapp.com/tables
import { test, expect, Page } from "@playwright/test";

type TableRow = Record<string, string>;

const testData: TableRow[] = [
  {
    "Last Name": "Smith",
    "First Name": "John",
    Email: "jsmith@gmail.com",
    Due: "$50.00",
    "Web Site": "http://www.jsmith.com"
  },
  {
    "Last Name": "Bach",
    "First Name": "Frank",
    Email: "fbach@yahoo.com",
    Due: "$51.00",
    "Web Site": "http://www.frank.com"
  },
  {
    "Last Name": "Doe",
    "First Name": "Jason",
    Email: "jdoe@hotmail.com",
    Due: "$100.00",
    "Web Site": "http://www.jdoe.com"
  },
  {
    "Last Name": "Conway",
    "First Name": "Tim",
    Email: "tconway@earthlink.net",
    Due: "$50.00",
    "Web Site": "http://www.timconway.com"
  }
];

const url = "https://the-internet.herokuapp.com/tables";

async function getTableRow(page: Page, email: string): Promise<TableRow | undefined> {
  await page.goto(url);
  const table = page.locator("#table2");
  const rows = await table.locator("tbody tr").all();
  const headers = await table.locator("th").allInnerTexts();
  for (const row of rows) {
    const rowData: TableRow = {};
    const cells = await row.locator("td").all();
    for (let i = 0; i < cells.length; i++) {
      const header = headers[i];
      const value = await cells[i]!.innerText();
      if (header) {
        rowData[header] = value;
      }
    }
    if (rowData.Email === email) {
      return rowData;
    }
  }
  return undefined;
}

test.describe("[HW-21][Get row by email]", () => {
  for (const { Email } of testData) {
    test(Email!, async ({ page }) => {
      const row = await getTableRow(page, Email!);
      expect(row).toBeDefined();
      expect(row?.Email).toBe(Email);
    });
  }
});