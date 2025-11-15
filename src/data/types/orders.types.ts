import { IO } from "inspector/promises";
import { ID, IResponseFields,  ICreatedOn } from "./core.types";
import { ICustomerFromResponse } from "./customers.types";
import { IProductFromOrder } from "./product.types";
import { IUser } from "./user.types";

export type OrderStatus = "Draft" | "Processing" | "Shipped" | "Delivered" | "Canceled";
export type DeliveryStatus = "Pending" | "In Transit" | "Delivered" | "Failed";

export interface IOrderFromResponse extends ICreatedOn, ID {
  status: OrderStatus;
  customer: ICustomerFromResponse;
  products: IProductFromOrder[];
  delivery: null | DeliveryStatus;
  total_price: number;
  comments: string[];
  history: IOrderHistory[];
  assignedManager: null | IUser["_id"];
}

export interface IOrderHistory extends Omit<IOrderFromResponse, "comments" | "history" | "customer" > {
  customer: ICustomerFromResponse["_id"];
  changedOn: string;
  action: string;
}

/* Sample order response (for reference only):
{
  "Order": {
    "_id": "<order id>",
    "status": "Draft",
    "customer": { "_id": "<customer id>", "email": "test@gmail.com", "name": "test" },
    "products": [ { "_id": "<product id>", "name": "Keyboard83692", "amount": 544, "price": 78139 } ],
    "delivery": null,
    "total_price": 78139,
    "comments": [],
    "history": [ { "status": "Draft", "customer": "<customer id>", "products": [ { "_id": "<product id>" } ], "total_price": 78139, "delivery": null, "changedOn": "2025-11-14T17:59:35.000Z", "action": "Order created", "assignedManager": null } ],
    "assignedManager": null
  },
  "IsSuccess": true,
  "ErrorMessage": null
}
*/