import { test, expect } from "fixtures/business.fixture";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import _ from "lodash";

test.describe("[Sales Portal] [Products]", () => {
  test.beforeEach(async ({ homePage, loginAsAdmin, productsListPage, addNewProductPage }) => {
    await loginAsAdmin();
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
    const { deleteModal } = productsListPage;
    await deleteModal.waitForOpened();
    await deleteModal.clickConfirm();
    await productsListPage.waitForOpened();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_DELETED);
    await expect(productsListPage.tableRowByName(productData.name)).toHaveCount(0);
  });
});

test.describe("[Sales Portal] [Products with services]", () => {
  let id = "";
  let token = "";
  //test with fixtures version 1
  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test("Product Details with services", async ({
    loginUIService,
    homeUIService,
    productsListUIService,
    productsApiService,
    productsListPage,
  }) => {
    token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;
    await homeUIService.openModule("Products");
    await productsListUIService.openDetailsModal(createdProduct.name);
    const actual = await productsListPage.detailsModal.getData();
    productsListUIService.assertDetailsData(actual, createdProduct);
  });

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });
});
