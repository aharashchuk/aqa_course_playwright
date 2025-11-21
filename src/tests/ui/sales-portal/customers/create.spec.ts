import { test, expect } from "fixtures/business.fixture";
import _ from "lodash";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("[Sales Portal] [Customers] [Create]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ customersApiService }) => {
    if (id) await customersApiService.delete(token, id);
    id = "";
  });

  test("Add new customer with services", async ({ loginUIService, customersListPage, addNewCustomerUIService }) => {
    token = await loginUIService.loginAsAdmin();
    await addNewCustomerUIService.open();
    const createdCustomer = await addNewCustomerUIService.create();
    id = createdCustomer._id;
    await customersListPage.waitForOpened();
    await expect.soft(customersListPage.toastMessage).toContainText(NOTIFICATIONS.CUSTOMER_CREATED);
    await expect.soft(customersListPage.tableRowByEmail(createdCustomer.email)).toBeVisible();
  });
});
