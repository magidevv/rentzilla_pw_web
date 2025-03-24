import { test } from "../../fixtures/fixtures";
import catalogData from "../../utils/catalog-data.json";

test.describe("Catalog", () => {
  test.beforeEach(async ({ mainPage, profilePage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
    await profilePage.closeTelegramPopup();
  });

  test("C559: Verify 'Каталог'", async ({ headerPage, productsPage }) => {
    // Check the "Спецтехніка" section and "Будівельна техніка" tab
    await headerPage.tapMobileNavbar();
    await headerPage.isCatalogBtnDisplayed();
    await headerPage.tapCatalogBtn();
    await headerPage.areCatalogElementsDisplayed(
      catalogData.Types[0],
      catalogData.Types[1]
    );
    await headerPage.tapCatalogSpecialMachinery();
    const catalogFirstType = catalogData.Types[0];
    await headerPage.areCatalogSpecialMachineryItemsDisplayed(
      catalogData[catalogFirstType].Types[0].name
    );

    // Check the other tabs
    for (let i = 0; i < catalogData[catalogFirstType].Types.length; i++) {
      await headerPage.areCatalogSpecialMachineryItemsDisplayed(
        catalogData[catalogFirstType].Types[i].name
      );
    }

    // Check the "Спецтехніка" section -> "Будівельна техніка" tab -> all other tabs
    await headerPage.tapCatalogSpecialMachineryItem(0);
    const catalogFirstTypeName = catalogData[catalogFirstType].Types[0].name;
    for (
      let i = 0;
      i < catalogData[catalogFirstType][catalogFirstTypeName].length;
      i++
    ) {
      await headerPage.areCatalogSpecialMachinerySecondItemsDisplayed(
        catalogData[catalogFirstType][catalogFirstTypeName][i].name
      );
    }
    await headerPage.tapCatalogBackBtn();

    // Check the "Спецтехніка" section -> other tabs -> all other tabs
    for (let i = 1; i < catalogData[catalogFirstType].Types.length; i++) {
      const catalogFirstTypeName = catalogData[catalogFirstType].Types[i].name;
      for (
        let j = 0;
        j < catalogData[catalogFirstType][catalogFirstTypeName].length;
        j++
      ) {
        await headerPage.tapCatalogSpecialMachineryItem(i);
        await headerPage.areCatalogSpecialMachinerySecondItemsDisplayed(
          catalogData[catalogFirstType][catalogFirstTypeName][j].name
        );
        await headerPage.tapCatalogBackBtn();
      }
    }
    await headerPage.tapCatalogBackBtn();

    // Check the "Послуги" section -> other tabs -> all other tabs
    await headerPage.clickCatalogServices();
    const catalogSecondType = catalogData.Types[1];
    for (let i = 0; i < catalogData[catalogSecondType].Types.length; i++) {
      await headerPage.areCatalogServicesItemsDisplayed(
        catalogData[catalogSecondType].Types[i]
      );
      await headerPage.clickCatalogServicesItem(i);
      await headerPage.areCatalogServicesSecondItemsDisplayed();
      await headerPage.tapCatalogBackBtn();
    }
  });
});
