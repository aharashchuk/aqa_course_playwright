// Создать функцию getTableRow(page, email), которая возвращает строку в таблице по емейлу.
// Например getTableRow(page, 'jsmith@gmail.com') => { "Last Name": "Smith", "First Name": "John", Email: "jsmith@gmail.com", Due: "$50.00", "Web Site": "http://www.jsmith.com" }

// Создайте тест, проверяющий данную функцию, используя все емейлы из таблицы Example 2

// Сайт: https://the-internet.herokuapp.com/tables
import { test, expect, Page } from "@playwright/test";

type TableRow = Record<string, string>;

// interface ITableRow {
//   "Last Name": string;
//   "First Name": string;
//   Email: string;
//   Due: string;
//   "Web Site": string;
// }

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
const removeLastItem = (items: string[]): string[] => items.slice(0, -1);

async function getTableRow(page: Page, email: string): Promise<TableRow> {
  await page.goto(url);
  const table = page.locator("#table2");
  const headers = removeLastItem(await table.locator("th").allInnerTexts());
  const matchingRow = table.locator("tbody tr").filter({ hasText: email }).first();

  const cells = removeLastItem(await matchingRow.locator("td").allInnerTexts());

  return headers.reduce(
    (finalRow, header: string, idx: number) => (header ? ((finalRow[header] = cells[idx] ?? ""), finalRow) : finalRow),
    {} as TableRow
  );
}

test.describe("[HW-21][Get row by email]", () => {
  for (const user of testData) {
    test(`By '${user.Email}' get users' data from the table`, async ({ page }) => {
      const row = await getTableRow(page, `${user.Email}`);

      expect(row, `Incorrect user data with email: '${user.Email}'`).toEqual(user);
    });
  }
});
