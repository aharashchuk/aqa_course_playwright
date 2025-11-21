import { SalesPortalPage } from "../salesPortal.page";
import { ICustomer, ICustomerInTable, CustomersTableHeader } from "data/types/customers.types";

export class CustomersListPage extends SalesPortalPage {
  readonly title = this.page.locator("h2.fw-bold");
  readonly addNewCustomerButton = this.page.locator('[name="add-button"]');
  readonly tableRow = this.page.locator("tbody tr");
  readonly tableRowByEmail = (email: string) =>
    this.page.locator("table tbody tr", { has: this.page.locator("td", { hasText: email }) });
  readonly tableRowByIndex = (index: number) => this.page.locator("table tbody tr").nth(index);
  readonly emailCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(0);
  readonly nameCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(1);
  readonly countryCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(2);
  readonly createdOnCell = (email: string) => this.tableRowByEmail(email).locator("td").nth(3);
  readonly tableHeader = this.page.locator("thead th div[current]");
  readonly tableHeaderNamed = (name: CustomersTableHeader) => this.tableHeader.filter({ hasText: name });
  readonly tableHeaderArrow = (name: CustomersTableHeader, { direction }: { direction: "asc" | "desc" }) =>
    this.page
      .locator("thead th", { has: this.page.locator("div[current]", { hasText: name }) })
      .locator(`i.${direction === "asc" ? "bi-arrow-down" : "bi-arrow-up"}`);

  readonly editButton = (email: string) => this.tableRowByEmail(email).getByTitle("Edit");
  readonly detailsButton = (email: string) => this.tableRowByEmail(email).getByTitle("Details");
  readonly deleteButton = (email: string) => this.tableRowByEmail(email).getByTitle("Delete");

  readonly searchInput = this.page.locator("#search");
  readonly searchButton = this.page.locator("#search-customer");

  readonly uniqueElement = this.addNewCustomerButton;

  async clickAddNewCustomer() {
    await this.addNewCustomerButton.click();
  }

  async getCustomerData(email: string): Promise<ICustomerInTable> {
    return {
      email: await this.emailCell(email).innerText(),
      name: await this.nameCell(email).innerText(),
      country: (await this.countryCell(email).innerText()) as ICustomer["country"],
      createdOn: await this.createdOnCell(email).innerText()
    };
  }

  async getTableData(): Promise<ICustomerInTable[]> {
    const data: ICustomerInTable[] = [];

    const rows = await this.tableRow.all();
    for (const row of rows) {
      const [email, name, country, createdOn] = await row.locator("td").allInnerTexts();
      data.push({
        email: email!,
        name: name!,
        country: country! as ICustomer["country"],
        createdOn: createdOn!
      });
    }
    return data;
  }

  async clickAction(email: string, action: "edit" | "details" | "delete") {
    if (action === "edit") await this.editButton(email).click();
    if (action === "delete") await this.deleteButton(email).click();
    if (action === "details") await this.detailsButton(email).click();
  }

  async clickTableHeader(name: CustomersTableHeader) {
    await this.tableHeaderNamed(name).click();
  }

  async fillSearchInput(text: string) {
    await this.searchInput.fill(text);
  }

  async clickSearch() {
    await this.searchButton.click();
  }
}
