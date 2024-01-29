import { Page } from "@playwright/test";
import BasePage from "./base-page";

class ProductsPage extends BasePage {
  private readonly serviceFilter: string;
  private readonly unitItems: string;
  private readonly unitItemsName: string;
  private readonly unitCount: string;
  private readonly searchInputPlaceholder: string;
  private readonly searchInputField: string;
  private readonly map: string;
  private readonly searchUnitItems: string;
  private readonly logo: string;

  constructor(page: Page) {
    super(page);

    this.serviceFilter =
      "//div[contains(@class, 'ResetFilters_selectedCategory')]/p";
    this.unitItems = "//div[@data-testid='cardWrapper']";
    this.unitItemsName = "//div[@data-testid='unitName']";
    this.unitCount = "//h1[contains(@class, 'MapPagination_count')]";
    this.searchInputPlaceholder = "//input[@data-testid='searchInput']";
    this.searchInputField = "//input[@data-testid='searchInput']";
    this.map = "#map";
    this.searchUnitItems = "//div[@data-testid='cardContainer']";
    this.logo = "//div[@data-testid='Navbar']//div[@data-testid='logo']";
  }

  public async checkProductsURL(): Promise<void> {
    await super.doesPageHaveURL(/\/products\//);
  }

  public async checkRelevantFilter(name: string): Promise<void> {
    await this.isDisplayed(this.serviceFilter);
    await this.toHaveText(this.serviceFilter, name);
  }

  public async isUnitCountGreaterZero(): Promise<boolean> {
    const searchResult = await this.getText(this.unitCount);
    const countMatch = searchResult.match(/(\d+)/);
    const count = countMatch ? parseInt(countMatch[1], 10) : 0;
    return count > 0 ? true : false;
  }

  public async areUnitItemsDisplayed(): Promise<void> {
    await this.areDisplayed(this.unitItems);
  }

  public async areUnitItemsNotDisplayed(): Promise<void> {
    await this.areNotDisplayed(this.unitItems);
  }

  public async clickFirstUnitItem(): Promise<void> {
    await this.clickFirst(this.unitItems);
    await this.waitForLoad();
  }

  public async isPlaceholderDisplayed(): Promise<void> {
    await this.isDisplayed(this.searchInputPlaceholder);
    await this.doesElementHaveAttr(this.searchInputPlaceholder, "placeholder");
  }

  public async doesPlaceholderHaveText(text: string): Promise<void> {
    await this.doesElementAttrHaveText(
      this.searchInputPlaceholder,
      "placeholder",
      text
    );
  }

  public async isSearchUnitCountGreaterZero(): Promise<boolean> {
    const count = await this.count(this.searchUnitItems);
    return count > 0 ? true : false;
  }

  public async areSearchUnitItemsDisplayed(
    searchPrompt: string
  ): Promise<void> {
    await this.areDisplayed(this.searchUnitItems);
    await this.elementsToContainText(this.searchUnitItems, searchPrompt);
  }

  public async areSearchUnitItemsNotDisplayed(): Promise<void> {
    await this.areNotDisplayed(this.searchUnitItems);
  }

  public async isSearchInputEmpty(): Promise<void> {
    await this.toHaveValue(this.searchInputField, "");
  }

  public async isMapDisplayed(): Promise<void> {
    await this.isDisplayed(this.map);
  }

  public async areFoundUnitItemsDisplayed(searchPrompt: string): Promise<void> {
    await this.areDisplayed(this.unitItems);
    await this.elementsToContainText(this.unitItemsName, searchPrompt);
  }

  public async isEmptySearchResultDisplayed(
    searchResult: string
  ): Promise<void> {
    await this.isDisplayed(this.unitCount);
    await this.toContainText(this.unitCount, searchResult);
  }

  public async isSearchResultDisplayed(searchPrompt: string): Promise<void> {
    const searchResult =
      "на видимій території за запитом " + `"${searchPrompt}"`;
    await this.toContainText(this.unitCount, searchResult);
  }

  public async isSearchResultByTeritoryDisplayed(): Promise<void> {
    const searchResult =
      /Знайдено (\d+) оголошення?  на видимій території /
    await this.toHaveText(this.unitCount, searchResult);
  }

  public async doesSearchFieldHaveValue(searchPrompt: string): Promise<void> {
    await this.toHaveValue(this.searchInputField, searchPrompt);
  }

  public async clickSearchInputField(): Promise<void> {
    await this.click(this.searchInputField);
  }

  public async fillSearchInputField(searchPrompt: string): Promise<void> {
    await this.setValue(this.searchInputField, searchPrompt);
    await this.waitForTimeout(1000);
  }

  public async pressSearchInputEnter(): Promise<void> {
    await this.press(this.searchInputField, "Enter");
  }

  public async clickLogo(): Promise<void> {
    await this.click(this.logo);
    await this.waitForLoad();
  }
}

export default ProductsPage;
