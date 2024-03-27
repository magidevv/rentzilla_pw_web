import { test } from "../../fixtures/fixtures";
import catalogData from "../../utils/catalog-data.json";

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
      catalogData.Types[0],
      catalogData.Types[1]
    );
    await headerPage.hoverCatalogSpecialMachinery();
    const catalogFirstType = catalogData.Types[0];
    await headerPage.areCatalogSpecialMachineryItemsDisplayed(
      catalogData[catalogFirstType].Types[0].name
    );
    await headerPage.clickCatalogSpecialMachineryItem(0);
    await productsPage.doesPageHaveURL(
      catalogData[catalogFirstType].Types[0].link
    );
    await productsPage.checkRelevantFilter(
      catalogData[catalogFirstType].Types[0].name
    );

    // Check the "Спецтехніка" section and other tabs
    for (let i = 0; i < catalogData[catalogFirstType].Types.length; i++) {
      await headerPage.clickCatalogBtn();
      await headerPage.areCatalogElementsDisplayed(
        catalogData.Types[0],
        catalogData.Types[1]
      );
      await headerPage.hoverCatalogSpecialMachinery();
      await headerPage.areCatalogSpecialMachineryItemsDisplayed(
        catalogData[catalogFirstType].Types[i].name
      );
      await headerPage.clickCatalogSpecialMachineryItem(i);
      await productsPage.doesPageHaveURL(
        catalogData[catalogFirstType].Types[i].link
      );
      await productsPage.checkRelevantFilter(
        catalogData[catalogFirstType].Types[i].name
      );
    }

    // Check the "Спецтехніка" section -> "Будівельна техніка" tab -> all other tabs
    const catalogFirstTypeName = catalogData[catalogFirstType].Types[0].name;
    for (
      let i = 0;
      i < catalogData[catalogFirstType][catalogFirstTypeName].length;
      i++
    ) {
      await headerPage.clickCatalogBtn();
      await headerPage.areCatalogElementsDisplayed(
        catalogData.Types[0],
        catalogData.Types[1]
      );
      await headerPage.hoverCatalogSpecialMachinery();
      await headerPage.areCatalogSpecialMachineryItemsDisplayed(
        catalogData[catalogFirstType].Types[0].name
      );
      await headerPage.hoverCatalogSpecialMachineryItem(0);
      await headerPage.areCatalogSpecialMachinerySecondItemsDisplayed(
        catalogData[catalogFirstType][catalogFirstTypeName][i].name
      );
      await headerPage.clickCatalogSpecialMachinerySecondItem(i);
      await productsPage.doesPageHaveURL(
        catalogData[catalogFirstType][catalogFirstTypeName][i].link
      );
    }

    // Check the "Спецтехніка" section -> other tabs -> all other tabs
    for (let i = 1; i < catalogData[catalogFirstType].Types.length; i++) {
      const catalogFirstTypeName = catalogData[catalogFirstType].Types[i].name;
      for (
        let j = 0;
        j < catalogData[catalogFirstType][catalogFirstTypeName].length;
        j++
      ) {
        await headerPage.clickCatalogBtn();
        await headerPage.areCatalogElementsDisplayed(
          catalogData.Types[0],
          catalogData.Types[1]
        );
        await headerPage.hoverCatalogSpecialMachinery();
        await headerPage.areCatalogSpecialMachineryItemsDisplayed(
          catalogData[catalogFirstType].Types[i].name
        );
        await headerPage.hoverCatalogSpecialMachineryItem(i);
        await headerPage.areCatalogSpecialMachinerySecondItemsDisplayed(
          catalogData[catalogFirstType][catalogFirstTypeName][j].name
        );
        await headerPage.clickCatalogSpecialMachinerySecondItem(j);
        await productsPage.doesPageHaveURL(
          catalogData[catalogFirstType][catalogFirstTypeName][j].link
        );
      }
    }

    // Check the "Послуги" section -> other tabs -> all other tabs
    const catalogSecondType = catalogData.Types[1];
    await headerPage.clickCatalogBtn();
    for (let i = 0; i < catalogData[catalogSecondType].Types.length; i++) {
      await headerPage.areCatalogElementsDisplayed(
        catalogData.Types[0],
        catalogData.Types[1]
      );
      await headerPage.hoverCatalogServices();
      await headerPage.areCatalogServicesItemsDisplayed(
        catalogData[catalogSecondType].Types[i]
      );
      await headerPage.hoverCatalogServicesItem(i);
      await headerPage.areCatalogServicesSecondItemsDisplayed();
    }
  });
});
