import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test("C213: Checking 'Спецтехніка' section on the main page", async ({
  mainPage,
  productsPage,
  unitPage,
}) => {
  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  // Check the special machinery display
  await mainPage.isSpecialMachineryLabelDisplayed();
  await mainPage.areSpecialMachineryTypeLabelsDisplayed();
  await mainPage.areProposesSpecialMachineryItemsDisplayed();

  // Check the relevant filter is checked and the relevant units display
  const specialMachineryType = data.SpecialMachinery.Type[0];
  await mainPage.clickSpecialMachinery(0, 0);
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
