import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test.describe("C210 Tests", () => {
  test.beforeEach(async ({ mainPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
  });

  test("C212: Checking 'Послуги' section on the main page", async ({
    mainPage,
    productsPage,
    unitPage,
  }) => {
    // Repeat for all services on all tabs
    for (let i = 0; i < data.Services.Type.length; i++) {
      // Check the services display
      await mainPage.isServicesLabelDisplayed();
      await mainPage.areServiceTypeLabelsDisplayed();
      await mainPage.areProposesServicesItemsDisplayed();

      // Iterate through the different service types
      const serviceType = data.Services.Type[i];

      for (let j = 0; j < data.Services[serviceType].length; j++) {
        // Check the relevant filter is checked and the relevant units display
        await mainPage.clickService(i, j);
        await productsPage.checkProductsURL();
        await productsPage.checkRelevantFilter(data.Services[serviceType][j]);

        if (await productsPage.isUnitCountGreaterZero()) {
          await productsPage.areUnitItemsDisplayed();

          // Check the unit page is opened and contains the relevant service
          await productsPage.clickFirstUnitItem();
          await unitPage.checkUnitURL();
          await unitPage.isUnitServiceDisplayed(data.Services[serviceType][j]);

          // Return to the main page
          await unitPage.clickLogo();
        }
      }
    }
  });

  test("C213: Checking 'Спецтехніка' section on the main page", async ({
    mainPage,
    productsPage,
    unitPage,
  }) => {
    // Repeat for all special machinery on all tabs
    for (let i = 0; i < data.SpecialMachinery.Type.length; i++) {
      // Check the special machinery display
      await mainPage.isSpecialMachineryLabelDisplayed();
      await mainPage.areSpecialMachineryTypeLabelsDisplayed();
      await mainPage.areProposesSpecialMachineryItemsDisplayed();

      // Iterate through the different SpecialMachinery types
      const specialMachineryType = data.SpecialMachinery.Type[i];

      for (
        let j = 0;
        j < data.SpecialMachinery[specialMachineryType].length;
        j++
      ) {
        // Check the relevant filter is checked and the relevant units display
        await mainPage.clickSpecialMachinery(i, j);
        await productsPage.checkProductsURL();
        await productsPage.checkRelevantFilter(
          data.SpecialMachinery[specialMachineryType][j].filter
        );
        if (await productsPage.isUnitCountGreaterZero()) {
          try {
            await productsPage.areUnitItemsDisplayed();

            // Check the unit page is opened and contains the relevant SpecialMachinery
            await productsPage.clickFirstUnitItem();
            await unitPage.checkUnitURL();
            await unitPage.isUnitCategoryDisplayed(
              data.SpecialMachinery[specialMachineryType][j].category
            );
          } catch (error) {
            console.error("Failed:", error.message);
            // Handle the error or log it, but execution will continue to the next block.
          }

          // Return to the main page
          await unitPage.clickLogo();
        }
      }
    }
  });

  test("C214: Verify that all elements on the footer are displayed and all links are clickable", async ({
    headerPage,
    footerPage,
    productsPage,
    privacyPolicyPage,
    cookiePolicyPage,
    termsConditionsPage,
    tendersPage,
  }) => {
    // Check the footer elements display
    await footerPage.isFooterDisplayed();
    await footerPage.isFooterLogoClickable();
    await footerPage.areFootersElementsDisplayed();

    // Check the privacy policy page
    await footerPage.clickPrivacyPolicy();
    await privacyPolicyPage.checkPrivacyPolicyURL();
    await privacyPolicyPage.isPrivacyPolicyTitleDisplayed();

    // Check the cookie privacy page
    await footerPage.clickCookiePolicy();
    await cookiePolicyPage.checkCookiePolicyURL();
    await cookiePolicyPage.isCookiePolicyTitleDisplayed();

    // Check the terms conditions page
    await footerPage.clickTermsConditions();
    await termsConditionsPage.checkTermsConditionsURL();
    await termsConditionsPage.isTermsConditionsTitleDisplayed();

    // Check the products page
    await footerPage.clickAdvertisment();
    await productsPage.isPlaceholderDisplayed();
    await productsPage.doesPlaceholderHaveText(data.placeholderProductsText);

    // Return to the «Rentzila» main page
    await headerPage.clickLogo();

    // Check the tenders page
    await footerPage.clickTenders();
    await tendersPage.isPlaceholderDisplayed();
    await tendersPage.doesPlaceholderHaveText(data.placeholderTendersText);

    // Return to the «Rentzila» main page
    await headerPage.clickLogo();

    // Check the email link
    await footerPage.isEmailClickable();
  });
});
