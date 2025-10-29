import { test as base, expect } from "@playwright/test";
import { SignInPage } from "ui/pages/signIn.page";
import { HomePage } from "ui/pages/home.page";
import { AddNewProductPage } from "ui/pages/products/addNewProduct.page";
import { ProductsListPage } from "ui/pages/products/productsList.page";

export interface IPages {
  signInPage: SignInPage;
  homePage: HomePage;
  productsListPage: ProductsListPage;
  addNewProductPage: AddNewProductPage;
}

export const test = base.extend<IPages>({
  signInPage: async ({ page }, use) => {
    await use(new SignInPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  productsListPage: async ({ page }, use) => {
    await use(new ProductsListPage(page));
  },
  addNewProductPage: async ({ page }, use) => {
    await use(new AddNewProductPage(page));
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

// export const test = base.extend<IPages>({
//   pages: async ({ page }, use) => {
//     await use(new Pages(page));
//   }
// });

export { expect };
