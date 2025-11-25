import { test, expect } from "fixtures/business.fixture";
import _ from "lodash";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { NOTIFICATIONS } from "data/salesPortal/notifications";
import { TAGS } from "data/tags";

test.describe("[Sales Portal] [Products] [Edit]", async () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
    id = "";
  });

  test("Edit product with services", 
    { tag: [TAGS.SMOKE, TAGS.REGRESSION, TAGS.UI, TAGS.PRODUCTS] },
    async ({ productsApiService, productsListUIService, productsListPage, editProductPage }) => {
      token = await productsListPage.getAuthToken();
      const createdProduct = await productsApiService.create(token);
      id = createdProduct._id;
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
