import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test("C559: Verify 'Каталог'", async ({ mainPage, productsPage }) => {
  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  // Check the "Спецтехніка" section and "Будівельна техніка" tab
  await mainPage.isCatalogBtnDisplayed();
  await mainPage.clickCatalogBtn();
  await mainPage.areCatalogElementsDisplayed(
    data.Catalog.Types[0],
    data.Catalog.Types[1]
  );
  await mainPage.hoverCatalogSpecialMachinery();
  const catalogFirstType = data.Catalog.Types[0];
  await mainPage.areCatalogSpecialMachineryItemsDisplayed(
    data.Catalog[catalogFirstType].Types[0].name
  );
  await mainPage.clickCatalogSpecialMachineryItem(0);
  await productsPage.doesPageHaveURL(
    data.Catalog[catalogFirstType].Types[0].link
  );
  await productsPage.checkRelevantFilter(
    data.Catalog[catalogFirstType].Types[0].name
  );

  // Check the "Спецтехніка" section and other tabs
  for (let i = 0; i < data.Catalog[catalogFirstType].Types.length; i++) {
    await mainPage.clickCatalogBtn();
    await mainPage.areCatalogElementsDisplayed(
      data.Catalog.Types[0],
      data.Catalog.Types[1]
    );
    await mainPage.hoverCatalogSpecialMachinery();
    await mainPage.areCatalogSpecialMachineryItemsDisplayed(
      data.Catalog[catalogFirstType].Types[i].name
    );
    await mainPage.clickCatalogSpecialMachineryItem(i);
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
    await mainPage.clickCatalogBtn();
    await mainPage.areCatalogElementsDisplayed(
      data.Catalog.Types[0],
      data.Catalog.Types[1]
    );
    await mainPage.hoverCatalogSpecialMachinery();
    await mainPage.areCatalogSpecialMachineryItemsDisplayed(
      data.Catalog[catalogFirstType].Types[0].name
    );
    await mainPage.hoverCatalogSpecialMachineryItem(0);
    await mainPage.areCatalogSpecialMachinerySecondItemsDisplayed(
      data.Catalog[catalogFirstType][catalogFirstTypeName][i].name
    );
    await mainPage.clickCatalogSpecialMachinerySecondItem(i);
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
      await mainPage.clickCatalogBtn();
      await mainPage.areCatalogElementsDisplayed(
        data.Catalog.Types[0],
        data.Catalog.Types[1]
      );
      await mainPage.hoverCatalogSpecialMachinery();
      await mainPage.areCatalogSpecialMachineryItemsDisplayed(
        data.Catalog[catalogFirstType].Types[i].name
      );
      await mainPage.hoverCatalogSpecialMachineryItem(i);
      await mainPage.areCatalogSpecialMachinerySecondItemsDisplayed(
        data.Catalog[catalogFirstType][catalogFirstTypeName][j].name
      );
      await mainPage.clickCatalogSpecialMachinerySecondItem(j);
      await productsPage.doesPageHaveURL(
        data.Catalog[catalogFirstType][catalogFirstTypeName][j].link
      );
    }
  }

  // Check the "Послуги" section -> other tabs -> all other tabs
  const catalogSecondType = data.Catalog.Types[1];
  await mainPage.clickCatalogBtn();
  for (let i = 0; i < data.Catalog[catalogSecondType].Types.length; i++) {
    await mainPage.areCatalogElementsDisplayed(
      data.Catalog.Types[0],
      data.Catalog.Types[1]
    );
    await mainPage.hoverCatalogServices();
    await mainPage.areCatalogServicesItemsDisplayed(
      data.Catalog[catalogSecondType].Types[i]
    );
    await mainPage.hoverCatalogServicesItem(i);
    await mainPage.areCatalogServicesSecondItemsDisplayed();
  }
});
