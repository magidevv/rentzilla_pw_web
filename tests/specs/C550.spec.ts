import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test.describe("C550 Tests", () => {
  test.beforeEach(async ({ mainPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
  });

  test("C559: Verify 'Каталог'", async ({ headerPage, productsPage }) => {
    // Check the "Спецтехніка" section and "Будівельна техніка" tab
    await headerPage.isCatalogBtnDisplayed();
    await headerPage.clickCatalogBtn();
    await headerPage.areCatalogElementsDisplayed(
      data.Catalog.Types[0],
      data.Catalog.Types[1]
    );
    await headerPage.hoverCatalogSpecialMachinery();
    const catalogFirstType = data.Catalog.Types[0];
    await headerPage.areCatalogSpecialMachineryItemsDisplayed(
      data.Catalog[catalogFirstType].Types[0].name
    );
    await headerPage.clickCatalogSpecialMachineryItem(0);
    await productsPage.doesPageHaveURL(
      data.Catalog[catalogFirstType].Types[0].link
    );
    await productsPage.checkRelevantFilter(
      data.Catalog[catalogFirstType].Types[0].name
    );

    // Check the "Спецтехніка" section and other tabs
    for (let i = 0; i < data.Catalog[catalogFirstType].Types.length; i++) {
      await headerPage.clickCatalogBtn();
      await headerPage.areCatalogElementsDisplayed(
        data.Catalog.Types[0],
        data.Catalog.Types[1]
      );
      await headerPage.hoverCatalogSpecialMachinery();
      await headerPage.areCatalogSpecialMachineryItemsDisplayed(
        data.Catalog[catalogFirstType].Types[i].name
      );
      await headerPage.clickCatalogSpecialMachineryItem(i);
      await productsPage.doesPageHaveURL(
        data.Catalog[catalogFirstType].Types[i].link
      );
      await productsPage.checkRelevantFilter(
        data.Catalog[catalogFirstType].Types[i].name
      );
    }

    // Check the "Спецтехніка" section -> "Будівельна техніка" tab -> all other tabs
    const catalogFirstTypeName = data.Catalog[catalogFirstType].Types[0].name;
    for (
      let i = 0;
      i < data.Catalog[catalogFirstType][catalogFirstTypeName].length;
      i++
    ) {
      await headerPage.clickCatalogBtn();
      await headerPage.areCatalogElementsDisplayed(
        data.Catalog.Types[0],
        data.Catalog.Types[1]
      );
      await headerPage.hoverCatalogSpecialMachinery();
      await headerPage.areCatalogSpecialMachineryItemsDisplayed(
        data.Catalog[catalogFirstType].Types[0].name
      );
      await headerPage.hoverCatalogSpecialMachineryItem(0);
      await headerPage.areCatalogSpecialMachinerySecondItemsDisplayed(
        data.Catalog[catalogFirstType][catalogFirstTypeName][i].name
      );
      await headerPage.clickCatalogSpecialMachinerySecondItem(i);
      await productsPage.doesPageHaveURL(
        data.Catalog[catalogFirstType][catalogFirstTypeName][i].link
      );
    }

    // Check the "Спецтехніка" section -> other tabs -> all other tabs
    for (let i = 1; i < data.Catalog[catalogFirstType].Types.length; i++) {
      const catalogFirstTypeName = data.Catalog[catalogFirstType].Types[i].name;
      for (
        let j = 0;
        j < data.Catalog[catalogFirstType][catalogFirstTypeName].length;
        j++
      ) {
        await headerPage.clickCatalogBtn();
        await headerPage.areCatalogElementsDisplayed(
          data.Catalog.Types[0],
          data.Catalog.Types[1]
        );
        await headerPage.hoverCatalogSpecialMachinery();
        await headerPage.areCatalogSpecialMachineryItemsDisplayed(
          data.Catalog[catalogFirstType].Types[i].name
        );
        await headerPage.hoverCatalogSpecialMachineryItem(i);
        await headerPage.areCatalogSpecialMachinerySecondItemsDisplayed(
          data.Catalog[catalogFirstType][catalogFirstTypeName][j].name
        );
        await headerPage.clickCatalogSpecialMachinerySecondItem(j);
        await productsPage.doesPageHaveURL(
          data.Catalog[catalogFirstType][catalogFirstTypeName][j].link
        );
      }
    }

    // Check the "Послуги" section -> other tabs -> all other tabs
    const catalogSecondType = data.Catalog.Types[1];
    await headerPage.clickCatalogBtn();
    for (let i = 0; i < data.Catalog[catalogSecondType].Types.length; i++) {
      await headerPage.areCatalogElementsDisplayed(
        data.Catalog.Types[0],
        data.Catalog.Types[1]
      );
      await headerPage.hoverCatalogServices();
      await headerPage.areCatalogServicesItemsDisplayed(
        data.Catalog[catalogSecondType].Types[i]
      );
      await headerPage.hoverCatalogServicesItem(i);
      await headerPage.areCatalogServicesSecondItemsDisplayed();
    }
  });
});
