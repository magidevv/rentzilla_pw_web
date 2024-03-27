import { test } from "../../fixtures/fixtures";
import inputData from "../../utils/input-data.json";

test.describe("C530 Tests", () => {
  test.beforeEach(async ({ mainPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
  });

  test("C530: Verify search Input", async ({
    mainPage,
    productsPage,
    unitPage,
    headerPage
  }) => {
    async function checkInputSearchPrompt(prompt: string) {
      await mainPage.fillSearchInput(prompt);
      await mainPage.pressSearchInputEnter();
      await productsPage.checkProductsURL();
      await productsPage.isMapDisplayed();
      await productsPage.areFoundUnitItemsDisplayed(prompt);
      await productsPage.clickFirstUnitItem();
      await unitPage.checkUnitURL();
      await headerPage.clickLogo();
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
    await checkInputSearchPrompt(inputData.Search.prompts[0]);

    // Check the "Ремонт гидравлики" search prompt
    await checkInputSearchPrompt(inputData.Search.prompts[1]);

    // Check the "Ремонт" search prompt results
    await mainPage.fillSearchInput(inputData.Search.prompts[2]);
    await mainPage.areSearchUnitItemsDisplayed(inputData.Search.prompts[2]);
    await mainPage.clickFirstUnitItem();
    await unitPage.checkUnitURL();
    await unitPage.doesUnitTitleHaveText(inputData.Search.prompts[2]);

    // Check only spaces search prompt
    await headerPage.clickLogo();
    await mainPage.fillSearchInput(inputData.Search.prompts[3]);
    await mainPage.areSearchUnitItemsNotDisplayed();
    await mainPage.areHistoryItemsDisplayed(
      ...inputData.Search.prompts.slice(1, 3)
    );
    await mainPage.areServicesItemsNotDisplayed();
    await mainPage.areCategoryItemsNotDisplayed();
    await mainPage.pressSearchInputEnter();
    await productsPage.checkProductsURL();
    await productsPage.isEmptySearchResultDisplayed(inputData.Search.result);

    // Check the "123" search prompt
    await productsPage.previousPage();
    await mainPage.fillSearchInput(inputData.Search.prompts[4]);
    if (await mainPage.areSearchUnitItemsGreaterZero()) {
      await mainPage.areSearchUnitItemsDisplayed(inputData.Search.prompts[4]);
      await mainPage.pressSearchInputEnter();
      await productsPage.isSearchResultDisplayed(inputData.Search.prompts[4]);
      await productsPage.areFoundUnitItemsDisplayed(
        inputData.Search.prompts[4]
      );
      await productsPage.clickFirstUnitItem();
      await unitPage.checkUnitURL();

      // Check allowed specific symbols search prompts
      await unitPage.clickSearchInputField();
      for (const allowedSpecificSymbol of inputData.SpecificSymbols.allowed) {
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
      await productsPage.isSearchResultDisplayed(inputData.Search.prompts[4]);
    }

    // Check forbidden specific symbols search prompts (only first symbol because of bug)
    await productsPage.clickSearchInputField();
    await productsPage.fillSearchInputField(
      inputData.SpecificSymbols.forbidden[0]
    );
    await productsPage.isSearchInputEmpty();
    await productsPage.pressSearchInputEnter();
    await productsPage.checkProductsURL();
    await productsPage.isSearchInputEmpty();
    await productsPage.areUnitItemsDisplayed();

    // Check the non-existing keyword search prompt
    await headerPage.clickLogo();
    await mainPage.fillSearchInput(inputData.Search.prompts[5]);
    await mainPage.areSearchUnitItemsNotDisplayed();
    await mainPage.pressSearchInputEnter();
    await productsPage.checkProductsURL();
    await productsPage.doesSearchFieldHaveValue(inputData.Search.prompts[5]);
    await productsPage.isSearchResultDisplayed(inputData.Search.prompts[5]);

    // Check the service "Асфальтування" search prompt
    await productsPage.previousPage();
    await mainPage.fillSearchInput(inputData.Search.prompts[6]);
    await mainPage.isMainSearchDropdownDisplayed();
    await mainPage.areSearchUnitItemsDisplayed(inputData.Search.prompts[6]);
    await mainPage.isSearchServiceItemDisplayed(inputData.Search.prompts[6]);
    await mainPage.clickSearchServiceItem(inputData.Search.prompts[6]);
    await productsPage.checkProductsURL();
    await productsPage.checkRelevantFilter(inputData.Search.prompts[6]);
    await productsPage.isSearchResultByTeritoryDisplayed();

    // Check the category "Драглайн" search prompt
    await productsPage.previousPage();
    await mainPage.clickMainSearchInput();
    await mainPage.fillSearchInput(inputData.Search.prompts[7]);
    await mainPage.isMainSearchDropdownDisplayed();
    await mainPage.areSearchUnitItemsDisplayed(
      inputData.Search.prompts[7].toLowerCase()
    );
    await mainPage.isSearchCategoryItemDisplayed(
      inputData.Search.prompts[7].toLowerCase()
    );
    await mainPage.clickSearchCategoryItem(
      inputData.Search.prompts[7].toLowerCase()
    );
    await productsPage.checkProductsURL();
    await productsPage.checkRelevantFilter(
      inputData.Search.prompts[7].toLowerCase() + "и"
    );
    await productsPage.isSearchResultByTeritoryDisplayed();

    // Check the search field clearing functionality
    await productsPage.previousPage();
    await mainPage.clickMainSearchInput();
    await mainPage.fillSearchInput(inputData.Search.prompts[2]);
    await mainPage.isMainSearchDropdownDisplayed();
    await mainPage.areSearchUnitItemsDisplayed(inputData.Search.prompts[2]);
    await mainPage.clickMainSearchClearIcon();
    await mainPage.isMainSearchDropdownNotDisplayed();
    await mainPage.isSearchInputEmpty();

    // Check the search history prompts after refreshing the page
    await mainPage.refreshPage();
    await mainPage.areSearchHistoryItemsDisplayed(
      inputData.Search.prompts[2],
      inputData.Search.prompts[7],
      inputData.Search.prompts[6]
    );
  });
});
