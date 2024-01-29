import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test("C212: Checking 'Послуги' section on the main page", async ({
  mainPage,
  productsPage,
  unitPage,
}) => {
  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  // Check the services display
  await mainPage.isServicesLabelDisplayed();
  await mainPage.areServiceTypeLabelsDisplayed();
  await mainPage.areProposesServicesItemsDisplayed();

  // Check the relevant filter is checked and the relevant units display
  const serviceType = data.Services.Type[0];
  await mainPage.clickService(0, 0);
  await productsPage.checkProductsURL();
  await productsPage.checkRelevantFilter(data.Services[serviceType][0]);
  await productsPage.areUnitItemsDisplayed();

  // Check the unit page is opened and contain the relevant service
  await productsPage.clickFirstUnitItem();
  await unitPage.checkUnitURL();
  await unitPage.isUnitServiceDisplayed(data.Services[serviceType][0]);

  // Return to the main page
  await unitPage.clickLogo();

  // Repeat for other services on other tabs
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
