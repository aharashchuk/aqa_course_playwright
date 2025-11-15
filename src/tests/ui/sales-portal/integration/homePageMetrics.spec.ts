import { test, expect } from "fixtures/business.fixture";
import { generateMetricsResponseData } from "data/salesPortal/homePage/generateMetricsData";
import { metricsTestCases } from "data/salesPortal/homePage/metricsTestData";
import { formatNumber } from "utils/formatNumber.utils";

test.describe("[Integration] [Sales Portal] [Home Page] [Metrics Display]", () => {
  for (const testCase of metricsTestCases) {
    test(`Metrics Display Test: ${testCase.title}`, async ({ loginAsAdmin, homePage, mock }) => {
      const metricsData = generateMetricsResponseData(testCase.metricsData);
      await mock.metricsHomePage(metricsData);
      await loginAsAdmin();
      expect.soft(homePage.orderThisYear).toHaveText(testCase.metricsData.orders!.totalOrders.toString());
      expect.soft(homePage.newCustomers).toHaveText(testCase.metricsData.customers!.totalNewCustomers.toString());
      expect.soft(homePage.canceledOrders).toHaveText(testCase.metricsData.orders!.totalCanceledOrders.toString());
      expect.soft(homePage.totalRevenue).toHaveText(formatNumber(testCase.metricsData.orders!.totalRevenue, "$0.0a"));
      expect
        .soft(homePage.avgOrdersValue)
        .toHaveText(formatNumber(testCase.metricsData.orders!.averageOrderValue, "$0.0a"));
    });
  }
});
