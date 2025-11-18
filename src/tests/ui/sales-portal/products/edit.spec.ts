import { test, expect } from "fixtures/business.fixture";
import { _ } from "lodash";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { AddNewProductPage } from "ui/pages/products";

// Реализовать е2е тест со следующими шагами:
//   - залогиниться
//   - Создать продукт через API
//   - Перейти на страницу Edit Product
//   - Заполнить поля валидными данными
//   - Сохранить продукт
//   - Проверить продукт в таблице
//   - Открыть модалку деталей продукта
//   - Проверить данные в модалке

//   За собой удаляем продукт через апи, разумеется:)


test.describe("[Sales Portal] [Products] [Edit]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test("Add new product with services", async ({
    loginUIService,
    addNewProductUIService,
    productsApiService,
    productsListUIService,
    productsListPage,
    editProductPage
  }) => {
    token = await loginUIService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    id = createdProduct._id;
    // await addNewProductPage.clickSave();
    await productsListUIService.open();
    await productsListPage.clickAction(createdProduct.name, "edit");
    await editProductPage.waitForOpened();
    const newProductData = generateProductData();
    await editProductPage.fillForm(newProductData);
    await editProductPage.clickSave();
    await expect(productsListPage.toastMessage).toContainText(NOTIFICATIONS.PRODUCT_UPDATED);
    await expect(productsListPage.tableRowByName(newProductData.name)).toBeVisible();
    const updatedProductTableData = _.omit(await productsListPage.getProductData(newProductData.name), ["createdOn"]);
    await expect(updatedProductTableData).toEqual(_.omit(newProductData, ["amount", "notes"]));
    await productsListPage.clickAction(newProductData.name, "details");
    const { detailsModal } = productsListPage;
    await detailsModal.waitForOpened();
    const detailsModalProductData = _.omit(await detailsModal.getData(), ["createdOn"]);
    await expect(detailsModalProductData).toEqual(newProductData);
  });
});
