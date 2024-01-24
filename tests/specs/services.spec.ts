import { test } from "@playwright/test";
import MainPage from "../pages/main.page";
import ProductsPage from "../pages/products.page";
import UnitPage from "../pages/unit.page";
import data from "../../utils/test-data.json";

test.describe("Sections checking", () => {
  test("Services section checking", async ({ page }) => {
    const mainPage = new MainPage(page);
    const productsPage = new ProductsPage(page);
    const unitPage = new UnitPage(page);

    // Open the «Rentzila» main page
    await mainPage.openMainURL();

    // Check the services display
    await mainPage.isServicesLabelDisplayed();
    await mainPage.areServiceTypeLabelsDisplayed();
    await mainPage.areProposesServicesItemsDisplayed();

    // Check the relevant filter is checked and the relevant units display
    const serviceType = data.Services.Type[0];
    await mainPage.clickService(serviceType, data.Services[serviceType][0]);
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
        await mainPage.clickService(serviceType, data.Services[serviceType][j]);
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

  test("Special machinery section checking", async ({ page }) => {
    const mainPage = new MainPage(page);
    const productsPage = new ProductsPage(page);
    const unitPage = new UnitPage(page);

    // Open the «Rentzila» main page
    await mainPage.openMainURL();

    // Check the special machinery display
    await mainPage.isSpecialMachineryLabelDisplayed();
    await mainPage.areSpecialMachineryTypeLabelsDisplayed();
    await mainPage.areProposesSpecialMachineryItemsDisplayed();

    // Check the relevant filter is checked and the relevant units display
    const specialMachineryType = data.SpecialMachinery.Type[0];
    await mainPage.clickSpecialMachinery(
      specialMachineryType,
      data.SpecialMachinery[specialMachineryType][0].name
    );
    await productsPage.checkProductsURL();
    await productsPage.checkRelevantFilter(
      data.SpecialMachinery[specialMachineryType][0].filter
    );
    await productsPage.areUnitItemsDisplayed();

    // Check the unit page is opened and contain the relevant SpecialMachinery
    await productsPage.clickFirstUnitItem();
    await unitPage.checkUnitURL();
    await unitPage.isUnitCategoryDisplayed(
      data.SpecialMachinery[specialMachineryType][0].category
    );

    // Return to the main page
    await unitPage.clickLogo();

    // Repeat for other special machinery on other tabs
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
        await mainPage.clickSpecialMachinery(
          specialMachineryType,
          data.SpecialMachinery[specialMachineryType][j].name
        );
        await productsPage.checkProductsURL();
        await productsPage.checkRelevantFilter(
          data.SpecialMachinery[specialMachineryType][j].filter
        );
        if (await productsPage.isUnitCountGreaterZero()) {
          await productsPage.areUnitItemsDisplayed();

          // Check the unit page is opened and contains the relevant SpecialMachinery
          await productsPage.clickFirstUnitItem();
          await unitPage.checkUnitURL();
          await unitPage.isUnitCategoryDisplayed(
            data.SpecialMachinery[specialMachineryType][j].category
          );

          // Return to the main page
          await unitPage.clickLogo();
        }
      }
    }
  });
});
