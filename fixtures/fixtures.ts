import { test as base } from "@playwright/test";
import MainPage from "../tests/pages/main.page";
import ProductsPage from "../tests/pages/products.page";
import UnitPage from "../tests/pages/unit.page";
import PrivacyPolicyPage from "../tests/pages/privacy-policy.page";
import CookiePolicyPage from "../tests/pages/cookie-policy.page";
import TermsConditionsPage from "../tests/pages/terms-conditions.page";
import TendersPage from "../tests/pages/tenders.page";

type MyFixtures = {
  mainPage: MainPage;
  productsPage: ProductsPage;
  unitPage: UnitPage;
  privacyPolicyPage: PrivacyPolicyPage;
  cookiePolicyPage: CookiePolicyPage;
  termsConditionsPage: TermsConditionsPage;
  tendersPage: TendersPage;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  productsPage: async ({ page }, use) => {
    await use(new ProductsPage(page));
  },
  unitPage: async ({ page }, use) => {
    await use(new UnitPage(page));
  },
  privacyPolicyPage: async ({ page }, use) => {
    await use(new PrivacyPolicyPage(page));
  },
  cookiePolicyPage: async ({ page }, use) => {
    await use(new CookiePolicyPage(page));
  },
  termsConditionsPage: async ({ page }, use) => {
    await use(new TermsConditionsPage(page));
  },
  tendersPage: async ({ page }, use) => {
    await use(new TendersPage(page));
  },
});
