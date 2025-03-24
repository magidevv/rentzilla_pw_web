import { test } from "../../fixtures/fixtures";
import searchData from "../../utils/search-data.json";
import messagesData from "../../utils/messages-data.json";
import {
  categories,
  mainCategories,
  sortingMethods,
} from "../../utils/unit-data";

const data: any = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,

  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
};

let firstUnit: { name: string; responseBodyUnit: any };
let secondUnit: { name: string; responseBodyUnit: any };
let unit: {
  names: string[];
  id: number[];
} = {
  names: [],
  id: [],
};

test.describe.serial("Favourite Units", () => {
  test.beforeEach(
    async ({ mainPage, headerPage, ownerUnitsPage, apiHelper }) => {
      // Open the «Rentzila» main page
      await mainPage.openMainURL();
      await mainPage.waitForModalAccept();

      // Create the first random unit via API
      firstUnit = await apiHelper.createUnit();

      // Check the created unit and approve via API
      await mainPage.toBeTrue(
        await apiHelper.checkUnitResponseResults(firstUnit.responseBodyUnit.id)
      );
      await apiHelper.approveUnit(firstUnit.responseBodyUnit.id);

      // Create the second random unit via API
      secondUnit = await apiHelper.createUnit();

      // Check the created unit and approve via API
      await mainPage.toBeTrue(
        await apiHelper.checkUnitResponseResults(secondUnit.responseBodyUnit.id)
      );
      await apiHelper.approveUnit(secondUnit.responseBodyUnit.id);

      // Authorization with user account
      await headerPage.clickHeaderLoginBtn();
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.fillLoginEmailField(data.userEmail);
      await mainPage.fillLoginPasswordField(data.userPassword);
      await mainPage.clickLoginBtn();

      // Check the units display in "Активні" tab
      await headerPage.clickUserIcon();
      await headerPage.clickMyUnitsLink();
      await ownerUnitsPage.checkOwnerUnitsURL();
      await ownerUnitsPage.isActiveUnitsTabSelected();
      await ownerUnitsPage.fillUnitSearchInput(firstUnit.name);
      await ownerUnitsPage.isActiveUnitDisplayed(firstUnit.name);
      await ownerUnitsPage.fillUnitSearchInput(secondUnit.name);
      await ownerUnitsPage.isActiveUnitDisplayed(secondUnit.name);
    }
  );

  test("C300: The 'Обрані оголошення' page without 'Обрані' units", async ({
    headerPage,
    ownerFavUnitsPage,
    productsPage,
  }) => {
    await headerPage.clickUserIcon();
    await headerPage.clickFavUnitsLink();
    await ownerFavUnitsPage.checkOwnerFavUnitsURL();
    await ownerFavUnitsPage.isEmptyFavUnitsMsgDisplayed(
      messagesData.noFavUnits
    );
    await ownerFavUnitsPage.clickToUnitListBtn();
    await productsPage.checkProductsURL();
    await headerPage.isUnitLinkActive();
  });

  test("C302: 'Обрані' icon functionality", async ({
    headerPage,
    ownerFavUnitsPage,
    productsPage,
  }) => {
    await headerPage.clickUnitsLink();
    await productsPage.checkProductsURL();
    await productsPage.clickHeartIcon(1);
    await productsPage.isHeartIconRed();

    await headerPage.clickUserIcon();
    await headerPage.clickFavUnitsLink();
    await ownerFavUnitsPage.checkOwnerFavUnitsURL();
    await ownerFavUnitsPage.isFavUnitDisplayed(secondUnit.name);

    await productsPage.clickHeartIcon(1);
    await ownerFavUnitsPage.isUnitNotDisplayed();
    await ownerFavUnitsPage.isEmptyFavUnitsMsgDisplayed(
      messagesData.noFavUnits
    );
    await ownerFavUnitsPage.clickToUnitListBtn();
    await productsPage.checkProductsURL();
    await productsPage.isHeartIconNotRed();
  });

  test("C305: 'Пошук по назві' search field functionality", async ({
    headerPage,
    ownerFavUnitsPage,
    apiHelper,
  }) => {
    await apiHelper.addToFavUnit(firstUnit.responseBodyUnit.id);
    await apiHelper.addToFavUnit(secondUnit.responseBodyUnit.id);

    await headerPage.clickUserIcon();
    await headerPage.clickFavUnitsLink();
    await ownerFavUnitsPage.checkOwnerFavUnitsURL();
    await ownerFavUnitsPage.refreshPage();

    await ownerFavUnitsPage.pressEnterUnitSearchInput();
    await ownerFavUnitsPage.areUnitsDisplayed();

    for (const space of searchData.Prompts.spaces) {
      await ownerFavUnitsPage.fillUnitSearchInput(space);
      await ownerFavUnitsPage.isUnitSearchInputPlaceholderDisplayed(
        searchData.placeholder
      );
    }

    await ownerFavUnitsPage.resetUnitSearchInput();
    await ownerFavUnitsPage.areUnitsDisplayed();

    await ownerFavUnitsPage.fillUnitSearchInput(searchData.Prompts.number);
    await ownerFavUnitsPage.checkUnitDisplay(
      searchData.Prompts.number,
      messagesData.unitsNotFound
    );

    for (const symbol of searchData.Prompts.symbols) {
      await ownerFavUnitsPage.fillUnitSearchInput(symbol);
      await ownerFavUnitsPage.checkUnitDisplay(
        searchData.Prompts.number,
        messagesData.unitsNotFound
      );
    }

    await ownerFavUnitsPage.fillUnitSearchInput(
      searchData.Prompts["non-existent"]
    );
    await ownerFavUnitsPage.isUnitNotDisplayed();
    await ownerFavUnitsPage.isNonExistentUnitDisplayed(
      messagesData.unitsNotFound
    );

    await ownerFavUnitsPage.fillUnitSearchInput(firstUnit.name);
    await ownerFavUnitsPage.isFavUnitDisplayed(firstUnit.name);
  });

  test("C311: Check the pagination on the 'Обрані оголошення' page", async ({
    headerPage,
    ownerFavUnitsPage,
    apiHelper,
  }) => {
    // Create 15 random units for 3 pages
    for (let i = 0; i < 15; i++) {
      let newUnit = await apiHelper.createUnit();
      await apiHelper.addToFavUnit(newUnit.responseBodyUnit.id);
      unit.id.push(newUnit.responseBodyUnit.id);
    }

    await headerPage.clickUserIcon();
    await headerPage.clickFavUnitsLink();
    await ownerFavUnitsPage.checkOwnerFavUnitsURL();
    await ownerFavUnitsPage.refreshPage();
    await ownerFavUnitsPage.areUnitsDisplayed();

    await ownerFavUnitsPage.isPaginationNavDisplayed(3);
    await ownerFavUnitsPage.isPrevPageBtnDisabled();
    await ownerFavUnitsPage.isPaginationItemSelected(1);

    await ownerFavUnitsPage.clickNextPageBtn();
    await ownerFavUnitsPage.isPaginationItemSelected(2);

    // await ownerFavUnitsPage.doubleClickNextPageBtn();
    await ownerFavUnitsPage.clickNextPageBtn();
    await ownerFavUnitsPage.isPaginationItemSelected(3);
    await ownerFavUnitsPage.isNextPageBtnDisabled();

    await ownerFavUnitsPage.clickPrevPageBtn();
    await ownerFavUnitsPage.isPaginationItemSelected(2);

    // await ownerFavUnitsPage.doubleClickPrevPageBtn();
    await ownerFavUnitsPage.clickPrevPageBtn();
    await ownerFavUnitsPage.isPaginationItemSelected(1);
  });

  test("C315: 'Всі категорії' dropdown menu functionality", async ({
    headerPage,
    ownerFavUnitsPage,
    apiHelper,
  }) => {
    // Create two random units for each category via API
    for (const category of categories) {
      let newUnit = await apiHelper.createUnitByCategory(category);
      await apiHelper.addToFavUnit(newUnit.responseBodyUnit.id);
      unit.id.push(newUnit.responseBodyUnit.id);
    }

    await headerPage.clickUserIcon();
    await headerPage.clickFavUnitsLink();
    await ownerFavUnitsPage.checkOwnerFavUnitsURL();
    await ownerFavUnitsPage.refreshPage();
    await ownerFavUnitsPage.areUnitsDisplayed();
    await ownerFavUnitsPage.clickShowMoreBtn();
    await ownerFavUnitsPage.checkAllUnitsCount(8);
    await ownerFavUnitsPage.isSelectedCategoryItemDisplayed();

    for (let i = 0; i < mainCategories.length; i++) {
      await ownerFavUnitsPage.selectCategoryItem(i + 2);
      await ownerFavUnitsPage.checkUnitsDisplay(
        messagesData.unitsByCategoryNotFound
      );
      await ownerFavUnitsPage.checkUnitCategoryName(mainCategories[i]);
      await ownerFavUnitsPage.checkAllUnitsCount(2);
    }
    await ownerFavUnitsPage.selectCategoryItem(1);
    await ownerFavUnitsPage.checkAllUnitsCount(8);
  });

  test("C316: 'По даті створення' drop down menu functionality", async ({
    headerPage,
    ownerFavUnitsPage,
    apiHelper,
  }) => {
    // Create two random units for each category via API
    for (const category of categories) {
      let newUnit = await apiHelper.createUnitByCategory(category);
      await apiHelper.addToFavUnit(newUnit.responseBodyUnit.id);
      unit.id.push(newUnit.responseBodyUnit.id);
      unit.names.push(newUnit.name);
    }

    await headerPage.clickUserIcon();
    await headerPage.clickFavUnitsLink();
    await ownerFavUnitsPage.checkOwnerFavUnitsURL();
    await ownerFavUnitsPage.refreshPage();
    await ownerFavUnitsPage.areUnitsDisplayed();
    await ownerFavUnitsPage.clickShowMoreBtn();
    await ownerFavUnitsPage.checkAllUnitsCount(8);
    await ownerFavUnitsPage.isSelectedSortItemDisplayed(sortingMethods[1]);

    await ownerFavUnitsPage.selectSortItem(1);
    await ownerFavUnitsPage.isSelectedSortItemDisplayed(sortingMethods[0]);
    await ownerFavUnitsPage.checkUnitsSortByName(unit.names);

    await ownerFavUnitsPage.selectSortItem(2);
    await ownerFavUnitsPage.isSelectedSortItemDisplayed(sortingMethods[1]);
  });

  test("C303: 'Очистити список' button functionality", async ({
    headerPage,
    ownerFavUnitsPage,
    productsPage,
    apiHelper,
  }) => {
    // Create two random units for each category via API
    for (const category of categories) {
      let newUnit = await apiHelper.createUnitByCategory(category);
      await apiHelper.addToFavUnit(newUnit.responseBodyUnit.id);
      unit.id.push(newUnit.responseBodyUnit.id);
    }

    await headerPage.clickUserIcon();
    await headerPage.clickFavUnitsLink();
    await ownerFavUnitsPage.checkOwnerFavUnitsURL();
    await ownerFavUnitsPage.refreshPage();
    await ownerFavUnitsPage.areUnitsDisplayed();
    await ownerFavUnitsPage.clickShowMoreBtn();
    await ownerFavUnitsPage.checkAllUnitsCount(8);

    await ownerFavUnitsPage.clickRemoveFavUnitsBtn();
    await ownerFavUnitsPage.isRemoveFavUnitsPopupDisplayed();
    await ownerFavUnitsPage.clickRemoveFavUnitsPopupCancelBtn();
    await ownerFavUnitsPage.isRemoveFavUnitsPopupNotDisplayed();
    await ownerFavUnitsPage.checkAllUnitsCount(8);

    await ownerFavUnitsPage.clickRemoveFavUnitsBtn();
    await ownerFavUnitsPage.isRemoveFavUnitsPopupDisplayed();
    await ownerFavUnitsPage.closeRemoveFavUnitsPopup();
    await ownerFavUnitsPage.isRemoveFavUnitsPopupNotDisplayed();
    await ownerFavUnitsPage.checkAllUnitsCount(8);

    await ownerFavUnitsPage.clickRemoveFavUnitsBtn();
    await ownerFavUnitsPage.clickRemoveFavUnitsPopupSubmitBtn();
    await ownerFavUnitsPage.isEmptyFavUnitsMsgDisplayed(
      messagesData.noFavUnits
    );
    await ownerFavUnitsPage.clickToUnitListBtn();
    await productsPage.isHeartIconNotRed();
  });

  test.afterEach(async ({ apiHelper, mainPage }) => {
    // Delete the created units via API
    await apiHelper.deleteUnit(firstUnit.responseBodyUnit.id);
    await mainPage.toBeFalse(
      await apiHelper.checkUnitResponseResults(firstUnit.responseBodyUnit.id)
    );
    await apiHelper.deleteUnit(secondUnit.responseBodyUnit.id);
    await mainPage.toBeFalse(
      await apiHelper.checkUnitResponseResults(secondUnit.responseBodyUnit.id)
    );

    for (const id of unit.id) {
      await apiHelper.deleteUnit(id);
      await mainPage.toBeFalse(await apiHelper.checkUnitResponseResults(id));
    }
  });
});
