import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { IProduct } from "data/types/product.types";
import { createProductPositiveCases, createProductNegativeCases } from "data/salesPortal/products/createProductTestData";
import { title } from "process";

test.describe("[API] [Sales Portal] [Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test("Create Product", async ({ loginApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
    const productData = generateProductData();
    const createdProduct = await productsApi.create(productData, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.CREATED,
      schema: createProductSchema,
      IsSuccess: true,
      ErrorMessage: null,
    });

    id = createdProduct.body.Product._id;

    const actualProductData = createdProduct.body.Product;
    expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(productData);
  });

  test("NOT create product with invalid data", async ({ loginApiService, productsApi }) => {
    token = await loginApiService.loginAsAdmin();
    const productData = generateProductData();
    const createdProduct = await productsApi.create({ ...productData, name: 123 } as unknown as IProduct, token);
    validateResponse(createdProduct, {
      status: STATUS_CODES.BAD_REQUEST,
      IsSuccess: false,
      ErrorMessage: "Incorrect request body",
    });
  });

  test.describe("[HW-25] [Task-1] [Products with valid data are created]", () => {
    for (const positiveCase of createProductPositiveCases) {
      test(`${positiveCase.title}`, async ({ loginApiService, productsApi }) => {
        token = await loginApiService.loginAsAdmin();
        const createdProduct = await productsApi.create(positiveCase.productData as IProduct, token);
        validateResponse(createdProduct, {
          status: positiveCase.expectedStatus || STATUS_CODES.CREATED,
          schema: createProductSchema,
          IsSuccess: true,
          ErrorMessage: null,
        });

        id = createdProduct.body.Product._id;

        const actualProductData = createdProduct.body.Product;
        expect(_.omit(actualProductData, ["_id", "createdOn"])).toEqual(positiveCase.productData);
      });
    }
  });

  test.describe("[HW-25] [Task-2] [Products with invalid data are NOT created]", () => {
    for (const negativeCase of createProductNegativeCases) {
      test(`${negativeCase.title}`, async ({ loginApiService, productsApi }) => {
        token = await loginApiService.loginAsAdmin();
        const createdProduct = await productsApi.create(negativeCase.productData as IProduct, token);
        validateResponse(createdProduct, {
          status: negativeCase.expectedStatus || STATUS_CODES.BAD_REQUEST,
          IsSuccess: false,
          ErrorMessage: "Incorrect request body",
        });
      });
    }
  });
});
