import { ID, ICreatedOn } from "./core.types";

type Country = "USA" | "Canada" | "Belarus" | "Ukraine" | "Germany" | "France" | "Great Britain" | "Russia";

export interface ICustomer {
  email: string;
  name: string;
  country: Country;
  city: string;
  street: string;
  house: string;
  flat: string;
  phone: string;
  notes?: string;
} 

export interface ICustomerInTable extends Pick<ICustomer, "email" | "name" | "country">, ICreatedOn {}

export type ICustomerDetails = Required<ICustomer>;

export interface ICustomerFromResponse extends Required<ICustomer>, ICreatedOn, ID {}
