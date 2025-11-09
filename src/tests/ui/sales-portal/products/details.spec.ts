import { test, expect } from "fixtures/pages.fixture";
import { credentials } from "config/env";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";

test.describe("[Sales Portal] [Products]", () => {
  test.beforeEach(async ({ homePage, signInPage, productsListPage, addNewProductPage }) => {
    await signInPage.open();
    await signInPage.emailInput.fill(credentials.username);
    await signInPage.passwordInput.fill(credentials.password);
    await signInPage.loginButton.click();
    await homePage.waitForOpened();
    await homePage.clickOnViewModule("Products");
    await productsListPage.waitForOpened();
    await productsListPage.clickAddNewProduct();
    await addNewProductPage.waitForOpened();
  });

  test("HW-22.Create product and check details in the table", async ({ productsListPage, addNewProductPage }) => {
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    const actual = await productsListPage.getProductData(productData.name);
    expect(_.omit(actual, ["createdOn"])).toEqual(_.omit(productData, ["notes", "amount"]));
  });

  test("Create product and check details in the product modal", async ({ productsListPage, addNewProductPage }) => {
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    await productsListPage.detailsButton(productData.name).click();
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();
    const actual = await detailsModal.getData();
    expect(_.omit(actual, ["createdOn"])).toEqual(productData);
  });

  test("HW-23.Delete product", async ({ productsListPage, addNewProductPage }) => {
    await addNewProductPage.waitForOpened();
    const productData = generateProductData();
    await addNewProductPage.fillForm(productData);
    await addNewProductPage.clickSave();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
    await productsListPage.closeToastMessage();
    await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
    const actual = await productsListPage.getProductData(productData.name);
    expect(_.omit(actual, ["createdOn"])).toEqual(_.omit(productData, ["notes", "amount"]));
    await productsListPage.deleteButton(productData.name).click();
    const { deleteConfirmationModal } = productsListPage;
    await deleteConfirmationModal.waitForOpened();
    await deleteConfirmationModal.clickConfirm();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
    await expect(productsListPage.tableRowByName(productData.name)).toHaveCount(0);
  });

  //test with fixtures version 2
  // test("Product Details", async ({ page, pages }) => {
  //   const { homePage, productsListPage, addNewProductPage } = pages;
  //   //login page
  //   const emailInput = page.locator("#emailinput");
  //   const passwordInput = page.locator("#passwordinput");
  //   const loginButton = page.locator("button[type='submit']");
  //   await homePage.open();
  //   await expect(emailInput).toBeVisible();
  //   await emailInput.fill(credentials.username);
  //   await passwordInput.fill(credentials.password);
  //   await loginButton.click();
  //   await homePage.waitForOpened();
  //   await homePage.clickOnViewModule("Products");
  //   await productsListPage.waitForOpened();
  //   await productsListPage.clickAddNewProduct();
  //   await addNewProductPage.waitForOpened();
  //   const productData = generateProductData();
  //   await addNewProductPage.fillForm(productData);
  //   await addNewProductPage.clickSave();
  //   await productsListPage.waitForOpened();
  //   await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_CREATED);
  //   await expect(productsListPage.tableRowByName(productData.name)).toBeVisible();
  //   await productsListPage.detailsButton(productData.name).click();
  //   const { detailsModal } = productsListPage;
  //   await detailsModal.waitForOpened();
  //   const actual = await detailsModal.getData();
  //   expect(_.omit(actual, ["createdOn"])).toEqual(productData);
  // });
});