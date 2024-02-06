import { Page } from "@playwright/test";
import BasePage from "./base-page";

const unitService: string =
  "//div[@itemprop='services']/div[contains(@class, 'UnitCharacteristics_service')]";
const unitCategory: string =
  "//div[contains(@class, 'UnitCharacteristics_characteristics_info')]/span";
const logo: string = "//div[@data-testid='Navbar']//div[@data-testid='logo']";
const unitTitle: string = "//h1[contains(@class, 'UnitName_name')]";
const searchInputField: string = "//input[@data-testid='searchInput']";

class UnitPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkUnitURL(): Promise<void> {
    await super.doesPageHaveURL(/unit\/$/);
  }

  public async isUnitServiceDisplayed(serviceName: string): Promise<void> {
    await super.filteredDisplay(unitService, serviceName);
  }

  public async isUnitCategoryDisplayed(categoryName: string): Promise<void> {
    await super.isDisplayed(unitCategory);
    await super.toHaveText(unitCategory, categoryName);
  }

  public async clickLogo(): Promise<void> {
    await super.click(logo);
    await super.waitForLoad();
  }

  public async doesUnitTitleHaveText(searchPrompt: string): Promise<void> {
    await super.toContainText(unitTitle, searchPrompt);
  }

  public async clickSearchInputField(): Promise<void> {
    await super.click(searchInputField);
  }

  public async fillSearchInputField(searchPrompt: string): Promise<void> {
    await super.setValue(searchInputField, searchPrompt);
    await super.waitForTimeout(1000);
  }
}

export default UnitPage;
