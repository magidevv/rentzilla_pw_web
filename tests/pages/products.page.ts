import { Page } from "@playwright/test";
import BasePage from "./base-page";

const mobileFilterBtn: string = "[data-testid='filters']";
const mobileCloseFilterBtn: string = "[data-testid='filtersClose']";
const mobileListSwitchBtn: string = "[data-testid='switch']";
const mobileUnitCount: string = "[data-testid='findLabel']";
const serviceFilter: string =
  "//div[contains(@class, 'ResetFilters_selectedCategory')]/p";
const unitItems: string = "//div[@data-testid='cardWrapper']";
const unitItemsName: string = "//div[@data-testid='unitName']";
const unitCount: string = "//h1[contains(@class, 'MapPagination_count')]";
const searchInputPlaceholder: string = "//input[@data-testid='searchInput']";
const searchInputField: string = "//input[@data-testid='searchInput']";
const map: string = "#map";
const searchUnitItems: string = "//div[@data-testid='cardContainer']";
const logo: string = "//div[@data-testid='Navbar']//div[@data-testid='logo']";
const heartIcon = "(//div[@data-testid='favourite'])";
const heartIconCSS = "#Vector > path";

class ProductsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkProductsURL(): Promise<void> {
    await super.doesPageHaveURL(/\/products\//);
  }

  public async clickMobileFilterBtn(): Promise<void> {
    await super.tap(mobileFilterBtn);
  }

  public async closeMobileFilterBtn(): Promise<void> {
    await super.tap(mobileCloseFilterBtn);
  }

  public async clickMobileListSwitchBtn(): Promise<void> {
    await super.tap(mobileListSwitchBtn);
    await super.waitForTimeout(500);
  }

  public async checkRelevantFilter(name: string): Promise<void> {
    await super.isDisplayed(serviceFilter);
    await super.toHaveText(serviceFilter, name);
  }

  public async isUnitCountGreaterZero(): Promise<boolean> {
    const searchResult = await super.getText(unitCount);
    const countMatch = searchResult.match(/(\d+)/);
    const count = countMatch ? parseInt(countMatch[1], 10) : 0;
    return count > 0 ? true : false;
  }

  public async isMobileUnitCountGreaterZero(): Promise<boolean> {
    const searchResult = await super.getText(mobileUnitCount);
    const countMatch = searchResult.match(/(\d+)/);
    const count = countMatch ? parseInt(countMatch[1], 10) : 0;
    return count > 0 ? true : false;
  }

  public async areUnitItemsDisplayed(): Promise<void> {
    await super.areDisplayed(unitItems);
  }

  public async areUnitItemsNotDisplayed(): Promise<void> {
    await super.areNotDisplayed(unitItems);
  }

  public async clickFirstUnitItem(): Promise<void> {
    await super.clickFirst(unitItems);
    await super.waitForLoad();
  }

  public async tapFirstUnitItem(): Promise<void> {
    await super.tapFirst(unitItems);
    await super.waitForLoad();
  }

  public async isPlaceholderDisplayed(): Promise<void> {
    await super.isDisplayed(searchInputPlaceholder);
    await super.doesElementHaveAttr(searchInputPlaceholder, "placeholder");
  }

  public async doesPlaceholderHaveText(text: string): Promise<void> {
    await super.doesElementAttrHaveValue(
      searchInputPlaceholder,
      "placeholder",
      text
    );
  }

  public async isSearchUnitCountGreaterZero(): Promise<boolean> {
    const count = await super.count(searchUnitItems);
    return count > 0 ? true : false;
  }

  public async areSearchUnitItemsDisplayed(
    searchPrompt: string
  ): Promise<void> {
    await super.areDisplayed(searchUnitItems);
    await super.elementsToContainText(searchUnitItems, searchPrompt);
  }

  public async isSearchUnitItemDisplayed(searchPrompt: string): Promise<void> {
    await super.toContainText(searchUnitItems, searchPrompt);
  }

  public async areSearchUnitItemsNotDisplayed(): Promise<void> {
    await super.areNotDisplayed(searchUnitItems);
  }

  public async clickSearchUnitItem(): Promise<void> {
    await super.click(searchUnitItems);
    await super.waitForLoad();
  }

  public async isSearchInputEmpty(): Promise<void> {
    await super.toHaveValue(searchInputField, "");
  }

  public async isMapDisplayed(): Promise<void> {
    await super.isDisplayed(map);
  }

  public async isMobileMapDisplayed(): Promise<boolean> {
    const mapVisibility = await super.isVisible(map);
    return mapVisibility;
  }

  public async areFoundUnitItemsDisplayed(searchPrompt: string): Promise<void> {
    await super.areDisplayed(unitItems);
    await super.elementsToContainText(unitItemsName, searchPrompt);
  }

  public async isEmptySearchResultDisplayed(
    searchResult: string
  ): Promise<void> {
    await super.isDisplayed(unitCount);
    await super.toContainText(unitCount, searchResult);
  }

  public async isSearchResultDisplayed(searchPrompt: string): Promise<void> {
    const searchResult =
      "на видимій території за запитом " + `"${searchPrompt}"`;
    await super.toContainText(unitCount, searchResult);
  }

  public async isSearchResultByTeritoryDisplayed(): Promise<void> {
    const searchResult = /Знайдено (\d+) оголошення?  на видимій території /;
    await super.toHaveText(unitCount, searchResult);
  }

  public async doesSearchFieldHaveValue(searchPrompt: string): Promise<void> {
    await super.toHaveValue(searchInputField, searchPrompt);
  }

  public async clickSearchInputField(): Promise<void> {
    await super.click(searchInputField);
  }

  public async fillSearchInputField(searchPrompt: string): Promise<void> {
    await super.setValue(searchInputField, searchPrompt);
    await super.waitForTimeout(1000);
  }

  public async pressSearchInputEnter(): Promise<void> {
    await super.press(searchInputField, "Enter");
  }

  public async clickLogo(): Promise<void> {
    await super.click(logo);
    await super.waitForLoad();
  }

  public async clickHeartIcon(count: number): Promise<void> {
    await super.click(heartIcon + `[${count}]`);
  }

  public async isHeartIconRed(): Promise<void> {
    await super.firstToHaveCSS(heartIconCSS, "fill", "rgb(247, 56, 89)");
  }

  public async isHeartIconNotRed(): Promise<void> {
    await super.firstNotToHaveCSS(heartIconCSS, "fill", "rgb(247, 56, 89)");
  }
}

export default ProductsPage;
