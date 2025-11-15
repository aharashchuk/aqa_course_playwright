import { IResponseFields } from "./core.types";
import { ICustomerFromResponse } from "./customers.types";
import { ITopProduct } from "./product.types";
import { IOrderFromResponse } from "./orders.types";
import { IDate } from "./core.types";

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

export interface IMetrics {
  orders: IOrderMetricsData;
  customers: ICustomerMetricsData;
  products: IProductMetricsData;
}

export interface IOrderMetricsData {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: IOrderFromResponse[];
  ordersCountPerDay: IOrdersCountPerDay[];
}

export interface ICustomerMetricsData {
  totalNewCustomers: number;
  topCustomers: ICustomerMetrics[];
  customerGrowth: ICustomerGrowth[];
}

export interface ICustomerMetrics {
  _id: ICustomerFromResponse["_id"];
  totalSpent: number;
  ordersCount: number; // Renamed to match API response sample
  customerName: ICustomerFromResponse["name"];
  customerEmail: ICustomerFromResponse["email"];
}

export interface ICustomerGrowth {
  date: IDate;
  count: number;
}

export interface IOrdersCountPerDay {
  date: IDate;
  count: number;
}

export interface IProductMetricsData {
  topProducts: ITopProduct[];
}
// Sample API response (reference only, not executable code):
// {
//   "IsSuccess": true,
//   "Metrics": {
//     "orders": {
//       "totalRevenue": 78139,
//       "totalOrders": 1,
//       "averageOrderValue": 78139,
//       "totalCanceledOrders": 0,
//       "recentOrders": [ /* IRecentOrder[] */ ],
//       "ordersCountPerDay": [ { "date": { "day": 14, "month": 11, "year": 2025 }, "count": 1 } ]
//     },
//     "customers": {
//       "totalNewCustomers": 1,
//       "topCustomers": [ { "_id": "<id>", "totalSpent": 78139, "ordersCount": 1, "customerName": "test", "customerEmail": "test@gmail.com" } ],
//       "customerGrowth": [ /* ICustomerGrowth[] */ ]
//     },
//     "products": { "topProducts": [ { "name": "Keyboard83692", "sales": 1 } ] }
//   },
//   "ErrorMessage": null
// }