import { generateMetricsData } from "data/salesPortal/homePage/generateMetricsData";
import _ from "lodash";
import { ICase } from "data/types/core.types";
import { IMetrics } from "data/types/metrics.type";

interface IMetricsCase extends ICase {
  metricsData: Partial<IMetrics>;
}

export const metricsTestCases: IMetricsCase[] = [
  {
    title: "Metrics with zero orders",
    metricsData: generateMetricsData({
      orders: {
        totalRevenue: 0,
        totalOrders: 0,
        averageOrderValue: 0,
        totalCanceledOrders: 0,
        recentOrders: [],
        ordersCountPerDay: []
      }
    })
  },
  {
    title: "Metrics with high average order value",
    metricsData: generateMetricsData({
      orders: {
        totalRevenue: 100000,
        totalOrders: 2,
        averageOrderValue: 50000,
        totalCanceledOrders: 0,
        recentOrders: [],
        ordersCountPerDay: []
      }
    })
  },
  {
    title: "Metrics with multiple canceled orders",
    metricsData: generateMetricsData({
      orders: {
        totalRevenue: 20000,
        totalOrders: 10,
        averageOrderValue: 2000,
        totalCanceledOrders: 5,
        recentOrders: [],
        ordersCountPerDay: []
      }
    })
  },
  {
    title: "Metrics with zero new customers",
    metricsData: generateMetricsData({
      customers: {
        totalNewCustomers: 0,
        topCustomers: [],
        customerGrowth: []
      }
    })
  },
  {
    title: "Metrics with multiple new customers",
    metricsData: generateMetricsData({
      customers: {
        totalNewCustomers: 10,
        topCustomers: [],
        customerGrowth: []
      }
    })
  },
];
