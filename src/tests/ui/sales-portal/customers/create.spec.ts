import { test, expect } from "fixtures/business.fixture";
import { _ } from "lodash";
import { generateCustomerData } from "data/salesPortal/customers/generateCustomerData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";

test.describe("[Sales Portal] [Customers] [Create]", async () => {
  let id = "";
  let token = "";
  
  test.afterEach(async ({ customerApiService }) => {
      if (id) await customerApiService.delete(token, id);
      id = "";
    });

  test("Add new customer with services", async ({
    loginUIService,
    customerApiService,
    customersListPage,
  }) => {
    token = await loginUIService.loginAsAdmin();
    const createdCustomer = await customerApiService.create(token);