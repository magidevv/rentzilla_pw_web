import { Locator, Page } from "@playwright/test";
import BasePage from "./base-page";

class UnitPage extends BasePage {
  private unitService: Locator;
  private readonly logo: Locator;

  constructor(page: Page) {
    super(page);

    this.logo = this.page.locator(
      "//div[@data-testid='Navbar']//div[@data-testid='logo']"
    );
  }

  public async checkUnitURL(): Promise<void> {
    await super.doesPageHaveURL(/unit\/$/);
  }

  public async isUnitServiceDisplayed(serviceName: string): Promise<void> {
    let unitService = this.page.locator(
      `//div[contains(@class, 'UnitCharacteristics_service') and contains(text(), '${serviceName}')]`
    );

    await this.isDisplayed(unitService);
  }

  public async isUnitCategoryDisplayed(categoryName: string): Promise<void> {
    let unitCategory = this.page.locator(
      `//div[contains(@class, 'UnitCharacteristics_characteristics_info')]/span[contains(text(), '${categoryName}')]`
    );

    await this.isDisplayed(unitCategory);
  }

  public async clickLogo(): Promise<void> {
    await this.click(this.logo);
    await this.waitForLoad();
  }
}

export default UnitPage;
