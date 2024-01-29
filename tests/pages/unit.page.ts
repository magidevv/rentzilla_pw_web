import { Page } from "@playwright/test";
import BasePage from "./base-page";

class UnitPage extends BasePage {
  private readonly unitService: string;
  private readonly unitCategory: string;
  private readonly logo: string;
  private readonly unitTitle: string;
  private readonly searchInputField: string;

  constructor(page: Page) {
    super(page);

    this.unitService =
      "//div[@itemprop='services']/div[contains(@class, 'UnitCharacteristics_service')]";
    this.unitCategory =
      "//div[contains(@class, 'UnitCharacteristics_characteristics_info')]/span";
    this.logo = "//div[@data-testid='Navbar']//div[@data-testid='logo']";
    this.unitTitle = "//h1[contains(@class, 'UnitName_name')]";
    this.searchInputField = "//input[@data-testid='searchInput']";
  }

  public async checkUnitURL(): Promise<void> {
    await super.doesPageHaveURL(/unit\/$/);
  }

  public async isUnitServiceDisplayed(serviceName: string): Promise<void> {
    await this.filteredDisplay(this.unitService, serviceName);
  }

  public async isUnitCategoryDisplayed(categoryName: string): Promise<void> {
    await this.isDisplayed(this.unitCategory);
    await this.toHaveText(this.unitCategory, categoryName);
  }

  public async clickLogo(): Promise<void> {
    await this.click(this.logo);
    await this.waitForLoad();
  }

  public async doesUnitTitleHaveText(searchPrompt: string): Promise<void> {
    await this.toContainText(this.unitTitle, searchPrompt);
  }

  public async clickSearchInputField(): Promise<void> {
    await this.click(this.searchInputField);
  }

  public async fillSearchInputField(searchPrompt: string): Promise<void> {
    await this.setValue(this.searchInputField, searchPrompt);
    await this.waitForTimeout(1000);
  }
}

export default UnitPage;
