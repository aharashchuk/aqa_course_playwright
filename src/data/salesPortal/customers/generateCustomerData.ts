import { faker } from "@faker-js/faker";
import { ObjectId } from "bson";
import { ICustomer } from "data/types/customers.types";

const COUNTRIES: ICustomer["country"][] = [
  "USA",
  "Canada",
  "Belarus",
  "Ukraine",
  "Germany",
  "France",
  "Great Britain",
  "Russia"
];

export function generateCustomerData(params?: Partial<ICustomer>): ICustomer {
  return {
    email: faker.internet.email(),
    name: faker.person.fullName(),
    country: faker.helpers.arrayElement(COUNTRIES),
    city: faker.location.city(),
    street: faker.location.street(),
    house: faker.number.int({ min: 1, max: 999 }),
    flat: faker.number.int({ min: 1, max: 9999 }),
    phone: faker.phone.number({ style: "international" }),
    notes: faker.string.alphanumeric({ length: 250 }),
    ...params
  };
}
