import { IResponseFields } from "./core.types";
import { ICustomerFromResponse, ICustomerMetrics } from "./customers.types";
import { IProduct } from "./product.types";

export interface IMetricsResponse extends IResponseFields {
  Metrics: IMetrics;
}

export interface IMetrics {
  orders: IOrderMetrics;
  customers: ICustomerMetricsData;
  products: IProductMetricsData;
}

export interface IOrderMetrics {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  totalCanceledOrders: number;
  recentOrders: IRecentOrder[];
  ordersCountPerDay: IOrdersCountPerDay[];
}

export interface IRecentOrder {
  _id: string;
  status: string;
  customer: ICustomerFromResponse;
  products: IProductInOrder[];
  delivery: null | string;
  total_price: number;
  createdOn: string;
  comments: string[];
  history: IOrderHistory[];
  assignedManager: null | string;
}

export interface IProductInOrder extends IProduct {
  _id: string;
  received: boolean;
}

export interface IOrderHistory {
  status: string;
  customer: ICustomerFromResponse["_id"];
  products: IProductInOrder[];
  total_price: number;
  delivery: null | string;
  changedOn: string;
  action: string;
  performer: IUser;
  assignedManager: null | string;
}
export interface IUser {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  roles: string[];
  createdOn: string;
}

export interface IOrdersCountPerDay {
  date: {
    day: number;
    month: number;
    year: number;
  };
  count: number;
}

export interface ICustomerMetricsData {
  totalNewCustomers: number;
  topCustomers: ICustomerMetrics[];
  customerGrowth: ICustomerGrowth[];
}

export interface ICustomerGrowth {
  date: {
    year: number;
    month: number;
    day: number;
  };
  count: number;
}

export interface IProductMetricsData {
  topProducts: ITopProduct[];
}

export interface ITopProduct {
  name: string;
  sales: number;
}
    "IsSuccess": true,
    "Metrics": {
        "orders": {
            "totalRevenue": 78139,
            "totalOrders": 1,
            "averageOrderValue": 78139,
            "totalCanceledOrders": 0,
            "recentOrders": [
                {
                    "_id": "69176e0785064ca12a5474ae",
                    "status": "Draft",
                    "customer": {
                        "_id": "6917685285064ca12a547485",
                        "email": "test@gmail.com",
                        "name": "test",
                        "country": "USA",
                        "city": "test",
                        "street": "test",
                        "house": 5,
                        "flat": 5,
                        "phone": "+16565656565",
                        "createdOn": "2025-11-14T17:35:14.000Z",
                        "notes": "test"
                    },
                    "products": [
                        {
                            "_id": "6914d98deded83194781ff64",
                            "name": "Keyboard83692",
                            "amount": 544,
                            "price": 78139,
                            "manufacturer": "Google",
                            "notes": "juSXNVAwB1DWkP3BOgPDKveInMQ7YH1VxiwezqWVAoh55QINdHlZ2ZG0TV4hVORIsKpAekls7z3kItqKjnQBezGIluhpIjQ0GkmkVM8Z0SR3079XCc6refEtCbJsakgNl4MJ0W5ks83VZu3V0hoImBFcq7OLIQn1m1x4Ojs0Y1ZOl1fU0ILiRwZSI1dSowFFb14DhuFkUp4W4ixLv3o0KDZIkda3xo1pLzWGkfb3JL4ulzKdBj8H2D4hz4",
                            "received": false
                        }
                    ],
                    "delivery": null,
                    "total_price": 78139,
                    "createdOn": "2025-11-14T17:59:35.000Z",
                    "comments": [],
                    "history": [
                        {
                            "status": "Draft",
                            "customer": "6917685285064ca12a547485",
                            "products": [
                                {
                                    "_id": "6914d98deded83194781ff64",
                                    "name": "Keyboard83692",
                                    "amount": 544,
                                    "price": 78139,
                                    "manufacturer": "Google",
                                    "notes": "juSXNVAwB1DWkP3BOgPDKveInMQ7YH1VxiwezqWVAoh55QINdHlZ2ZG0TV4hVORIsKpAekls7z3kItqKjnQBezGIluhpIjQ0GkmkVM8Z0SR3079XCc6refEtCbJsakgNl4MJ0W5ks83VZu3V0hoImBFcq7OLIQn1m1x4Ojs0Y1ZOl1fU0ILiRwZSI1dSowFFb14DhuFkUp4W4ixLv3o0KDZIkda3xo1pLzWGkfb3JL4ulzKdBj8H2D4hz4",
                                    "received": false
                                }
                            ],
                            "total_price": 78139,
                            "delivery": null,
                            "changedOn": "2025-11-14T17:59:35.000Z",
                            "action": "Order created",
                            "performer": {
                                "_id": "68f7c3a5dbfee5138a05b168",
                                "username": "admin@example.com",
                                "firstName": "Admin",
                                "lastName": "Admin",
                                "roles": [
                                    "ADMIN"
                                ],
                                "createdOn": "2025/10/21 17:32:21"
                            },
                            "assignedManager": null
                        }
                    ],
                    "assignedManager": null
                }
            ],
            "ordersCountPerDay": [
                {
                    "date": {
                        "day": 14,
                        "month": 11,
                        "year": 2025
                    },
                    "count": 1
                }
            ]
        },
        "customers": {
            "totalNewCustomers": 1,
            "topCustomers": [
                {
                    "_id": "6917685285064ca12a547485",
                    "totalSpent": 78139,
                    "ordersCount": 1,
                    "customerName": "test",
                    "customerEmail": "test@gmail.com"
                }
            ],
            "customerGrowth": [
                {
                    "date": {
                        "year": 2025,
                        "month": 10,
                        "day": 31
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 1
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 2
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 3
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 4
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 5
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 6
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 7
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 8
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 9
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 10
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 11
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 12
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 13
                    },
                    "count": 0
                },
                {
                    "date": {
                        "year": 2025,
                        "month": 11,
                        "day": 14
                    },
                    "count": 1
                }
            ]
        },
        "products": {
            "topProducts": [
                {
                    "name": "Keyboard83692",
                    "sales": 1
                }
            ]
        }
    },
    "ErrorMessage": null
}