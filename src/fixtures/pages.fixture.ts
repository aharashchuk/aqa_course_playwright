import {
  test as base,
  expect,
  // Page
} from "@playwright/test";
import { HomePage } from "ui/pages/home.page";
import { LoginPage } from "ui/pages/login.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";
import { AddNewProductUIService } from "ui/services/addNewProduct.ui-service";
import { EditProductPage } from "ui/pages/products/editProduct.page";
import { HomeUIService } from "ui/services/home.ui-service";
import { LoginUIService } from "ui/services/login.ui-service";
import { ProductsListUIService } from "ui/services/productsList.ui-service";
import { CustomersListPage } from "ui/pages/customers/customersList.page";
import { AddNewCustomerPage } from "ui/pages/customers/addNewCustomer.page";
import { AddNewCustomerUIService } from "ui/services/addNewCustomer.ui.service";

export interface IPages {
  //pages
  loginPage: LoginPage;
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
  editProductPage: EditProductPage;
  customersListPage: CustomersListPage;
  addNewCustomerPage: AddNewCustomerPage;

  //ui-services
  homeUIService: HomeUIService;
  productsListUIService: ProductsListUIService;
  addNewProductUIService: AddNewProductUIService;
  loginUIService: LoginUIService;
  addNewCustomerUIService: AddNewCustomerUIService;
}

export const test = base.extend<IPages>({
  //pages
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
  },
  editProductPage: async ({ page }, use) => {
    await use(new EditProductPage(page));
  },
  customersListPage: async ({ page }, use) => {
    await use(new CustomersListPage(page));
  },
  addNewCustomerPage: async ({ page }, use) => {
    await use(new AddNewCustomerPage(page));
  },

  //ui-services
  homeUIService: async ({ page }, use) => {
    await use(new HomeUIService(page));
  },

  productsListUIService: async ({ page }, use) => {
    await use(new ProductsListUIService(page));
  },

  addNewProductUIService: async ({ page }, use) => {
    await use(new AddNewProductUIService(page));
  },

  loginUIService: async ({ page }, use) => {
    await use(new LoginUIService(page));
  },
  addNewCustomerUIService: async ({ page }, use) => {
    await use(new AddNewCustomerUIService(page));
  }
});

// export class Pages {
//   public homePage: HomePage;
//   public productsListPage: ProductsListPage;
//   public addNewProductPage: AddNewProductPage;

//   constructor(page: Page) {
//     this.homePage = new HomePage(page);
//     this.productsListPage = new ProductsListPage(page);
//     this.addNewProductPage = new AddNewProductPage(page);
//   }
// }

// interface IPages {
//   pages: Pages;
// }

// const test = base.extend<IPages>({
//   pages: async ({ page }, use) => {
//     await use(new Pages(page));
//   },
// });

export { expect };