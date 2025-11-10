import { test, expect } from "fixtures/api.fixture";
import { generateProductData } from "data/salesPortal/products/generateProductData";
import { createProductSchema } from "data/schemas/products/create.schema";
import { getAllProductsSchema } from "data/schemas/products/getAll.schema";
import { STATUS_CODES } from "data/statusCodes";
import _ from "lodash";
import { validateResponse } from "utils/validation/validateResponse.utils";
import { loginSchema } from "data/schemas/auth/login.schema";


test.describe("[API] [Sales Portal] [HW-24 Task-2.Get All Products]", () => {
  let id = "";
  let token = "";

  test.afterEach(async ({ productsApiService }) => {
    if (id) await productsApiService.delete(token, id);
  });

  test("Get All Products", async ({ loginApiService, productsApiService, productsApi }) => {
    // const loginResponse = await request.post(baseURL + endpoints.login, {
    //   data: credentials,
    //   headers: {
    //     "content-type": "application/json",
    //   }
    // });
    const token = await loginApiService.loginAsAdmin();
    const createdProduct = await productsApiService.create(token);
    const id = createdProduct._id;

    const getAllProductsResponse = await productsApi.getAll(token);

    const getAllProductsBody = getAllProductsResponse.body;
    await validateResponse(getAllProductsResponse, {
      status: STATUS_CODES.OK,
      schema: getAllProductsSchema,
      IsSuccess: true,
      ErrorMessage: null
    });
    const product = getAllProductsBody["Products"].find((prod: { _id: string; }) => prod._id === id);
    expect(product).toEqual(createdProduct);
  });
});
