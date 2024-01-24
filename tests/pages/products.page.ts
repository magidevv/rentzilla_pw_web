import { Locator, Page } from "@playwright/test";
import BasePage from "./base-page";

class ProductsPage extends BasePage {
  private readonly unitItems: Locator;

  constructor(page: Page) {
    super(page);

    this.unitItems = page.locator("//div[@data-testid='cardWrapper']");
  }

  public async openProductsURL(): Promise<void> {
    await super.openURL("products");
  }

  public async checkProductsURL(): Promise<void> {
    await super.doesPageHaveURL(/\/products\//);
  }

  public async checkRelevantFilter(serviceName: string): Promise<void> {
    let serviceFilter = this.page.locator(
      `//div[contains(@class, 'ResetFilters_selectedCategory')]/p[contains(text(), '${serviceName}')]`
    );

    await this.isDisplayed(serviceFilter);
  }

  public async isUnitCountGreaterZero(): Promise<boolean> {
    let unitCount = this.page.locator(
      "//h1[contains(@class, 'MapPagination_count')]"
    );
    const sentence = await this.getText(unitCount);
    const match = sentence.match(/(\d+)/);
    const count = match ? parseInt(match[1], 10) : 0;
    return count > 0 ? true : false;
  }

  public async areUnitItemsDisplayed(): Promise<void> {
    await this.areDisplayed(this.unitItems);
  }

  public async clickFirstUnitItem(): Promise<void> {
    await this.click(this.unitItems.first());
    await this.waitForLoad();
  }
}

export default ProductsPage;
