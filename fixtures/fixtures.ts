import { test as base } from "@playwright/test";
import APIhelper from "../helpers/API.helper";
import MainPage from "../tests/pages/main.page";
import ProductsPage from "../tests/pages/products.page";
import UnitPage from "../tests/pages/unit.page";
import PrivacyPolicyPage from "../tests/pages/privacy-policy.page";
import CookiePolicyPage from "../tests/pages/cookie-policy.page";
import TermsConditionsPage from "../tests/pages/terms-conditions.page";
import TendersPage from "../tests/pages/tenders.page";
import ProfilePage from "../tests/pages/profile.page";
import HeaderPage from "../tests/pages/header.page";
import FooterPage from "../tests/pages/footer.page";
import OwnerUnitsPage from "../tests/pages/owner-units.page";
import OwnerTendersPage from "../tests/pages/owner-tenders.page";
import CreateTenderPage from "../tests/pages/create-tender.page";
import UnitProposesPage from "../tests/pages/proposes-to-owner-unit.page";
import UnitProposeDetailsPage from "../tests/pages/order-details.page";
import EditUnitPage from "../tests/pages/edit-unit.page";

type MyFixtures = {
  apiHelper: APIhelper;
  mainPage: MainPage;
  productsPage: ProductsPage;
  unitPage: UnitPage;
  privacyPolicyPage: PrivacyPolicyPage;
  cookiePolicyPage: CookiePolicyPage;
  termsConditionsPage: TermsConditionsPage;
  tendersPage: TendersPage;
  profilePage: ProfilePage;
  ownerUnitsPage: OwnerUnitsPage;
  ownerTendersPage: OwnerTendersPage;
  createTenderPage: CreateTenderPage;
  unitProposesPage: UnitProposesPage;
  unitProposeDetailsPage: UnitProposeDetailsPage;
  editUnitPage: EditUnitPage;
  headerPage: HeaderPage;
  footerPage: FooterPage;
};

export const test = base.extend<MyFixtures>({
  mainPage: async ({ page }, use) => {
    await use(new MainPage(page));
  },
  headerPage: async ({ page }, use) => {
    await use(new HeaderPage(page));
  },
  footerPage: async ({ page }, use) => {
    await use(new FooterPage(page));
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
  profilePage: async ({ page }, use) => {
    await use(new ProfilePage(page));
  },
  ownerUnitsPage: async ({ page }, use) => {
    await use(new OwnerUnitsPage(page));
  },
  ownerTendersPage: async ({ page }, use) => {
    await use(new OwnerTendersPage(page));
  },
  createTenderPage: async ({ page }, use) => {
    await use(new CreateTenderPage(page));
  },
  unitProposesPage: async ({ page }, use) => {
    await use(new UnitProposesPage(page));
  },
  unitProposeDetailsPage: async ({ page }, use) => {
    await use(new UnitProposeDetailsPage(page));
  },
  editUnitPage: async ({ page }, use) => {
    await use(new EditUnitPage(page));
  },
  apiHelper: async ({ request }, use) => {
    await use(new APIhelper(request));
  },
});
