import { faker } from "@faker-js/faker";
import { IMetrics, IMetricsResponse } from "data/types/metrics.type";

export function generateMetricsData(params?: Partial<IMetrics>): IMetrics {
  return {
    orders: {
      totalRevenue: faker.number.int({ min: 1000, max: 100000 }),
      totalOrders: faker.number.int({ min: 1, max: 1000 }),
      averageOrderValue: faker.number.int({ min: 100, max: 10000 }),
      totalCanceledOrders: faker.number.int({ min: 0, max: 100 }),
      recentOrders: [],
      ordersCountPerDay: [],
    },
    customers: {
      totalNewCustomers: faker.number.int({ min: 1, max: 500 }),
      topCustomers: [],
      customerGrowth: [],
    },
    products: {
      topProducts: [],
    },
    ...params,
  };
}

export function generateMetricsResponseData(params?: Partial<IMetrics>): IMetricsResponse {
  const mockMetrics = generateMetricsData(params);
  return {
    Metrics: mockMetrics,
    IsSuccess: true,
    ErrorMessage: null,
    ...params
  };
}
