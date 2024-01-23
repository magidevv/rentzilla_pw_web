import { test } from "@playwright/test";
import MainPage from "../pages/main.page";
import ProductsPage from "../pages/products.page";
import UnitPage from "../pages/unit.page";
import data from "../../utils/test-data.json";

test("Popular services checking", async ({ page }) => {
  const mainPage = new MainPage(page);
  const productsPage = new ProductsPage(page);
  const unitPage = new UnitPage(page);

  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  // Check the services display
  await mainPage.isServicesLabelDisplayed();
  await mainPage.areServiceTypeLabelsDisplayed();
  await mainPage.areProposesListItemsDisplayed();

  // Check the relevant checkbox is checked and the relevant units display
  const serviceType = data.Services.Type[0];
  await mainPage.clickService(serviceType, data.Services[serviceType][0]);
  await productsPage.checkProductsURL();
  await productsPage.checkRelevantCheckbox(data.Services[serviceType][0]);
  await productsPage.areUnitListItemsDisplayed();

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
    await mainPage.areProposesListItemsDisplayed();

    // Iterate through the different service types
    const serviceType = data.Services.Type[i];

    for (let j = 1; j < data.Services[serviceType].length; j++) {
      // Check the relevant checkbox is checked and the relevant units display
      await mainPage.clickService(serviceType, data.Services[serviceType][j]);
      await productsPage.checkProductsURL();
      await productsPage.checkRelevantCheckbox(data.Services[serviceType][j]);
      await productsPage.areUnitListItemsDisplayed();

      // Check the unit page is opened and contains the relevant service
      await productsPage.clickFirstUnitItem();
      await unitPage.checkUnitURL();
      await unitPage.isUnitServiceDisplayed(data.Services[serviceType][j]);

      // Return to the main page
      await unitPage.clickLogo();
    }
  }
});
