import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test.describe("C530 Tests", () => {
  test.beforeEach(async ({ mainPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
  });

  test("C530: Verify search Input", async ({
    mainPage,
    productsPage,
    unitPage,
  }) => {
    async function checkInputSearchPrompt(prompt: string) {
      await mainPage.fillSearchInput(prompt);
      await mainPage.pressSearchInputEnter();
      await productsPage.checkProductsURL();
      await productsPage.isMapDisplayed();
      await productsPage.areFoundUnitItemsDisplayed(prompt);
      await productsPage.clickFirstUnitItem();
      await unitPage.checkUnitURL();
      await unitPage.clickLogo();
      await mainPage.clickMainSearchInput();
      await mainPage.isMainSearchDropdownDisplayed();
      await mainPage.isHistoryUnitAdded(prompt);
    }
    // Check the search dropdown with elements
    await mainPage.clickMainSearchInput();
    await mainPage.areSearchDropdownElementsDisplayed();

    // Check the empty input functionality
    await mainPage.pressSearchInputEnter();
    await productsPage.checkProductsURL();
    await productsPage.isSearchInputEmpty();
    await productsPage.areUnitItemsDisplayed();

    // Check the "Трактор" search prompt
    await productsPage.previousPage();
    await checkInputSearchPrompt(data.searchPrompts[0]);

    // Check the "Ремонт гидравлики" search prompt
    await checkInputSearchPrompt(data.searchPrompts[1]);

    // Check the "Ремонт" search prompt results
    await mainPage.fillSearchInput(data.searchPrompts[2]);
    await mainPage.areSearchUnitItemsDisplayed(data.searchPrompts[2]);
    await mainPage.clickFirstUnitItem();
    await unitPage.checkUnitURL();
    await unitPage.doesUnitTitleHaveText(data.searchPrompts[2]);

    // Check only spaces search prompt
    await unitPage.clickLogo();
    await mainPage.fillSearchInput(data.searchPrompts[3]);
    await mainPage.areSearchUnitItemsNotDisplayed();
    await mainPage.areHistoryItemsDisplayed(...data.searchPrompts.slice(1, 3));
    await mainPage.areServicesItemsNotDisplayed();
    await mainPage.areCategoryItemsNotDisplayed();
    await mainPage.pressSearchInputEnter();
    await productsPage.checkProductsURL();
    await productsPage.isEmptySearchResultDisplayed(data.searchResult);

    // Check the "123" search prompt
    await productsPage.previousPage();
    await mainPage.fillSearchInput(data.searchPrompts[4]);
    if (await mainPage.areSearchUnitItemsGreaterZero()) {
      await mainPage.areSearchUnitItemsDisplayed(data.searchPrompts[4]);
      await mainPage.pressSearchInputEnter();
      await productsPage.isSearchResultDisplayed(data.searchPrompts[4]);
      await productsPage.areFoundUnitItemsDisplayed(data.searchPrompts[4]);
      await productsPage.clickFirstUnitItem();
      await unitPage.checkUnitURL();

      // Check allowed specific symbols search prompts
      await unitPage.clickSearchInputField();
      for (const allowedSpecificSymbol of data.allowedSpecificSymbols) {
        await unitPage.fillSearchInputField(allowedSpecificSymbol);
        await mainPage.isMainSearchDropdownDisplayed();
        if (await mainPage.areSearchUnitItemsGreaterZero()) {
          await mainPage.areSearchUnitItemsDisplayed(allowedSpecificSymbol);
          await productsPage.pressSearchInputEnter();
          await productsPage.checkProductsURL();
          await productsPage.doesSearchFieldHaveValue(allowedSpecificSymbol);
          await productsPage.isSearchResultDisplayed(allowedSpecificSymbol);
          await productsPage.areFoundUnitItemsDisplayed(allowedSpecificSymbol);
        } else {
          await mainPage.areSearchUnitItemsNotDisplayed();
          await productsPage.pressSearchInputEnter();
          await productsPage.checkProductsURL();
          await productsPage.doesSearchFieldHaveValue(allowedSpecificSymbol);
          await productsPage.isSearchResultDisplayed(allowedSpecificSymbol);
        }
      }
    } else {
      await mainPage.areSearchUnitItemsNotDisplayed();
      await productsPage.pressSearchInputEnter();
      await productsPage.isSearchResultDisplayed(data.searchPrompts[4]);
    }

    // Check forbidden specific symbols search prompts (only first symbol because of bug)
    await productsPage.clickSearchInputField();
    await productsPage.fillSearchInputField(data.forbiddenSpecificSymbols[0]);
    await productsPage.isSearchInputEmpty();
    await productsPage.pressSearchInputEnter();
    await productsPage.checkProductsURL();
    await productsPage.isSearchInputEmpty();
    await productsPage.areUnitItemsDisplayed();

    // Check the non-existing keyword search prompt
    await productsPage.clickLogo();
    await mainPage.fillSearchInput(data.searchPrompts[5]);
    await mainPage.areSearchUnitItemsNotDisplayed();
    await mainPage.pressSearchInputEnter();
    await productsPage.checkProductsURL();
    await productsPage.doesSearchFieldHaveValue(data.searchPrompts[5]);
    await productsPage.isSearchResultDisplayed(data.searchPrompts[5]);

    // Check the service "Асфальтування" search prompt
    await productsPage.previousPage();
    await mainPage.fillSearchInput(data.searchPrompts[6]);
    await mainPage.isMainSearchDropdownDisplayed();
    await mainPage.areSearchUnitItemsDisplayed(data.searchPrompts[6]);
    await mainPage.isSearchServiceItemDisplayed(data.searchPrompts[6]);
    await mainPage.clickSearchServiceItem(data.searchPrompts[6]);
    await productsPage.checkProductsURL();
    await productsPage.checkRelevantFilter(data.searchPrompts[6]);
    await productsPage.isSearchResultByTeritoryDisplayed();

    // Check the category "Драглайн" search prompt
    await productsPage.previousPage();
    await mainPage.clickMainSearchInput();
    await mainPage.fillSearchInput(data.searchPrompts[7]);
    await mainPage.isMainSearchDropdownDisplayed();
    await mainPage.areSearchUnitItemsDisplayed(
      data.searchPrompts[7].toLowerCase()
    );
    await mainPage.isSearchCategoryItemDisplayed(
      data.searchPrompts[7].toLowerCase()
    );
    await mainPage.clickSearchCategoryItem(data.searchPrompts[7].toLowerCase());
    await productsPage.checkProductsURL();
    await productsPage.checkRelevantFilter(
      data.searchPrompts[7].toLowerCase() + "и"
    );
    await productsPage.isSearchResultByTeritoryDisplayed();

    // Check the search field clearing functionality
    await productsPage.previousPage();
    await mainPage.clickMainSearchInput();
    await mainPage.fillSearchInput(data.searchPrompts[2]);
    await mainPage.isMainSearchDropdownDisplayed();
    await mainPage.areSearchUnitItemsDisplayed(data.searchPrompts[2]);
    await mainPage.clickMainSearchClearIcon();
    await mainPage.isMainSearchDropdownNotDisplayed();
    await mainPage.isSearchInputEmpty();

    // Check the search history prompts after refreshing the page
    await mainPage.refreshPage();
    await mainPage.areSearchHistoryItemsDisplayed(
      data.searchPrompts[2],
      data.searchPrompts[7],
      data.searchPrompts[6]
    );
  });
});
