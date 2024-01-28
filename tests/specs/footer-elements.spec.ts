import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test("Footer elements checking", async ({
  mainPage,
  productsPage,
  privacyPolicyPage,
  cookiePolicyPage,
  termsConditionsPage,
  tendersPage,
}) => {
  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  // Check the footer elements display
  await mainPage.isFooterDisplayed();
  await mainPage.isFooterLogoClickable();
  await mainPage.areFootersElementsDisplayed();

  // Check the privacy policy page
  await mainPage.clickPrivacyPolicy();
  await privacyPolicyPage.checkPrivacyPolicyURL();
  await privacyPolicyPage.isPrivacyPolicyTitleDisplayed();

  // Check the cookie privacy page
  await mainPage.clickCookiePolicy();
  await cookiePolicyPage.checkCookiePolicyURL();
  await cookiePolicyPage.isCookiePolicyTitleDisplayed();

  // Check the terms conditions page
  await mainPage.clickTermsConditions();
  await termsConditionsPage.checkTermsConditionsURL();
  await termsConditionsPage.isTermsConditionsTitleDisplayed();

  // Check the products page
  await mainPage.clickAdvertisment();
  await productsPage.isPlaceholderDisplayed();
  await productsPage.doesPlaceholderHaveText(data.placeholderProductsText);

  // Return to the «Rentzila» main page
  await mainPage.clickLogo();

  // Check the tenders page
  await mainPage.clickTenders();
  await tendersPage.isPlaceholderDisplayed();
  await tendersPage.doesPlaceholderHaveText(data.placeholderTendersText);

  // Return to the «Rentzila» main page
  await mainPage.clickLogo();

  // Check the email link
  await mainPage.isEmailClickable();
});

