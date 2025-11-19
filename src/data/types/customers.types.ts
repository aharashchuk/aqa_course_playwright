import { ID, ICreatedOn, IResponseFields } from "./core.types";

type Country = "USA" | "Canada" | "Belarus" | "Ukraine" | "Germany" | "France" | "Great Britain" | "Russia";

export interface ICustomer {
  email: string;
  name: string;
  country: Country;
  city: string;
  street: string;
  house: number;
  flat: number;
  phone: string;
  notes?: string;
} 

export interface ICustomerInTable extends Pick<ICustomer, "email" | "name" | "country">, ICreatedOn {}

export type CustomersTableHeader = "Email" | "Name" | "Country" | "Created On";

export type ICustomerDetails = Required<ICustomer>;

export interface ICustomerFromResponse extends Required<ICustomer>, ICreatedOn, ID {}

export interface ICustomerResponse extends IResponseFields {
  Customer: ICustomerFromResponse;
}
