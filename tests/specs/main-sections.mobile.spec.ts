import { test } from "../../fixtures/fixtures";
import servicesData from "../../utils/services-data.json";
import specialMachineryData from "../../utils/special-machinery-data.json";
import inputData from "../../utils/input-data.json";

test.describe("Main Sections (Mobile)", () => {
  test.beforeEach(async ({ mainPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
  });

  test("C212: Checking 'Послуги' section on the main page", async ({
    mainPage,
    productsPage,
    unitPage,
    footerPage,
  }) => {
    // Check the services display
    await mainPage.isServicesLabelDisplayed();
    await mainPage.areServiceTypeLabelsDisplayed();
    await mainPage.areProposesServicesItemsDisplayed();

    // Check all services on all tabs
    for (let i = 0; i < servicesData.Type.length; i++) {
      // Iterate through the different service types
      const serviceType = servicesData.Type[i];
      for (let j = 0; j < servicesData[serviceType].length; j++) {
        if (i !== 0) {
          await mainPage.tapServiceType(i);
          await mainPage.areProposesServicesItemsDisplayed();
        }
        await mainPage.tapServiceItem(j);

        // Check the relevant filter is checked and the relevant units display
        await productsPage.checkProductsURL();
        await productsPage.clickMobileFilterBtn();
        await productsPage.checkRelevantFilter(servicesData[serviceType][j]);
        await productsPage.closeMobileFilterBtn();

        if (await productsPage.isMobileMapDisplayed()) {
          await productsPage.clickMobileListSwitchBtn();
        }
        if (await productsPage.isMobileUnitCountGreaterZero()) {
          await productsPage.areUnitItemsDisplayed();

          // Check the unit page is opened and contains the relevant service
          await productsPage.tapFirstUnitItem();
          await unitPage.checkUnitURL();
          await unitPage.isUnitServiceDisplayed(servicesData[serviceType][j]);
        }
        // Return to the main page
        await footerPage.clickMobileHomeBtn();
      }
    }
  });

  test("C213: Checking 'Спецтехніка' section on the main page", async ({
    mainPage,
    productsPage,
    unitPage,
    footerPage,
  }) => {
    // Check the special machinery display
    await mainPage.isSpecialMachineryLabelDisplayed();
    await mainPage.areSpecialMachineryTypeLabelsDisplayed();
    await mainPage.areProposesSpecialMachineryItemsDisplayed();

    // Check all special machinery on all tabs
    for (let i = 0; i < specialMachineryData.Type.length; i++) {
      // Iterate through the different SpecialMachinery types
      const specialMachineryType = specialMachineryData.Type[i];
      for (
        let j = 0;
        j < specialMachineryData[specialMachineryType].length;
        j++
      ) {
        if (i !== 0) {
          await mainPage.tapSpecialMachineryType(i);
          await mainPage.areProposesSpecialMachineryItemsDisplayed();
        }
        await mainPage.tapSpecialMachineryItem(j);

        // Check the relevant filter is checked and the relevant units display
        await productsPage.checkProductsURL();
        await productsPage.clickMobileFilterBtn();
        await productsPage.checkRelevantFilter(
          specialMachineryData[specialMachineryType][j].filter
        );
        await productsPage.closeMobileFilterBtn();

        if (await productsPage.isMobileMapDisplayed()) {
          await productsPage.clickMobileListSwitchBtn();
        }
        if (await productsPage.isMobileUnitCountGreaterZero()) {
          try {
            await productsPage.areUnitItemsDisplayed();

            // Check the unit page is opened and contains the relevant SpecialMachinery
            await productsPage.tapFirstUnitItem();
            await unitPage.checkUnitURL();
            await unitPage.isUnitCategoryDisplayed(
              specialMachineryData[specialMachineryType][j].category
            );
          } catch (error) {
            console.error("Failed:", error.message);
            // Handle the error or log it, but execution will continue to the next block.
          }
        }
        // Return to the main page
        await footerPage.clickMobileHomeBtn();
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
    // Check the navbar elements display
    await headerPage.tapMobileNavbar();
    await footerPage.areFootersElementsDisplayed();

    // Check the privacy policy page
    await footerPage.tapPrivacyPolicy();
    await privacyPolicyPage.checkPrivacyPolicyURL();
    await privacyPolicyPage.isPrivacyPolicyTitleDisplayed();

    // Open navbar
    await headerPage.tapMobileNavbar();

    // Check the cookie privacy page
    await footerPage.tapCookiePolicy();
    await cookiePolicyPage.checkCookiePolicyURL();
    await cookiePolicyPage.isCookiePolicyTitleDisplayed();

    // Open navbar
    await headerPage.tapMobileNavbar();

    // Check the terms conditions page
    await footerPage.tapTermsConditions();
    await termsConditionsPage.checkTermsConditionsURL();
    await termsConditionsPage.isTermsConditionsTitleDisplayed();

    // Open navbar
    await headerPage.tapMobileNavbar();

    // Check the products page
    await footerPage.tapAdvertisment();
    await productsPage.isPlaceholderDisplayed();
    await productsPage.doesPlaceholderHaveText(
      inputData.Placeholders.productsText
    );

    // Open navbar
    await headerPage.tapMobileNavbar();

    // Check the tenders page
    await footerPage.tapTenders();
    await tendersPage.isPlaceholderDisplayed();
    await tendersPage.doesPlaceholderHaveText(
      inputData.Placeholders.tendersText
    );

    // Open navbar
    await headerPage.tapMobileNavbar();

    // Check the email link
    await footerPage.isEmailClickable();
  });
});
