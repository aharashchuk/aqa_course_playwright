// Используя DDT подход, напишите тест сьют для проверки эндпоинта создания продукта:
//   - с позитивными проверками

//   Используйте LoginApiService, ProductsApi, после каждого теста, где создастся продукт - удаляйте его.

//   Требования:
//   Name: обязательное, уникальное, Products's name should contain only 3-40 alphanumerical characters and one space between
//   Manufacturer: обязательное
//   Price: обязательное, Price should be in range 1-99999
//   Amount: обязательное, Amount should be in range 0-999
//   Notes: Notes should be in range 0-250 and without < or > symbols

import { generateProductData } from "data/salesPortal/products/generateProductData";
import { IProduct } from "data/types/product.types";
import { STATUS_CODES } from "data/statusCodes";
import { ERROR_MESSAGES } from "../notifications";
import { faker } from "@faker-js/faker";
import _ from "lodash";
import { ICase } from "data/types/core.types";

interface ICreateProductCase extends ICase {
  productData: Partial<IProduct>;
}

export const createProductPositiveCases: ICreateProductCase[] = [
  {
    title: "Create product with 3 character length",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 3 }) }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Create product with 40 character length",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 40 }) }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Create product with 1 space in name",
    productData: generateProductData({ name: `Test Product` }),
  },
  {
    title: "Create product with 1 price",
    productData: generateProductData({ price: 1 }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Create product with 99999 price",
    productData: generateProductData({ price: 99999 }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Create product with 0 amount",
    productData: generateProductData({ amount: 0 }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Create product with 999 amount",
    productData: generateProductData({ amount: 999 }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Create product with 250 notes",
    productData: generateProductData({ notes: faker.string.alphanumeric({ length: 250 }) }),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Create product without notes",
    productData: _.omit(generateProductData(), "notes"),
    expectedStatus: STATUS_CODES.CREATED
  },
  {
    title: "Create product with empty notes",
    productData: generateProductData({ notes: "" }),
    expectedStatus: STATUS_CODES.CREATED
  }
];

export const createProductNegativeCases: ICreateProductCase[] = [
  {
    title: "2 character name product not created",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 2 }) }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "41 character name product not created",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 41 }) }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Name with 2 spaces product not created",
    productData: generateProductData({ name: "Test  Product" }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Name with special characters product not created",
    productData: generateProductData({ name: faker.string.alphanumeric({ length: 10 }) + "@#$%" }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Product without name not created",
    productData: _.omit(generateProductData(), "name"),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Empty name product not created",
    productData: generateProductData({ name: "" }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "0 price product not created",
    productData: generateProductData({ price: 0 }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Without manufacturer product not created",
    productData: _.omit(generateProductData(), "manufacturer"),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "100000 price product not created",
    productData: generateProductData({ price: 100000 }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Product without price not created",
    productData: _.omit(generateProductData(), "price"),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Negative price product not created",
    productData: generateProductData({ price: -50 }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Not integer price product not created",
    productData: generateProductData({ price: faker.string.alphanumeric({ length: 5 }) }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Negative amount product not created",
    productData: generateProductData({ amount: -10 }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "1000 amount product not created",
    productData: generateProductData({ amount: 1000 }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Product without amount not created",
    productData: _.omit(generateProductData(), "amount"),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Not integer amount product not created",
    productData: generateProductData({ amount: faker.string.alphanumeric({ length: 3 }) }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "251 notes product not created",
    productData: generateProductData({ notes: faker.string.alphanumeric({ length: 251 }) }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  },
  {
    title: "Notes with < or > symbols product not created",
    productData: generateProductData({ notes: "Invalid notes with <symbol>" }),
    expectedStatus: STATUS_CODES.BAD_REQUEST,
    expectedErrorMessage: ERROR_MESSAGES.BAD_REQUEST
  }
];
