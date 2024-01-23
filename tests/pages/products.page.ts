import { Locator, Page } from "@playwright/test";
import BasePage from "./base-page";

class ProductsPage extends BasePage {
  private readonly unitListItems: Locator;

  constructor(page: Page) {
    super(page);

    this.unitListItems = page.locator("//div[@data-testid='cardWrapper']");
  }

  public async openProductsURL(): Promise<void> {
    await super.openURL("products");
  }

  public async checkProductsURL(): Promise<void> {
    await super.doesPageHaveURL(/products\/$/);
  }

  public async checkRelevantCheckbox(serviceName: string): Promise<void> {
    let serviceFilter = this.page.locator(
      `//div[contains(@class, 'ResetFilters_selectedCategory')]/p[contains(text(), '${serviceName}')]`
    );

    await this.isDisplayed(serviceFilter);
  }

  public async areUnitListItemsDisplayed(): Promise<void> {
    await this.areDisplayed(this.unitListItems);
  }

  public async clickFirstUnitItem(): Promise<void> {
    await this.click(this.unitListItems.first());
    await this.waitForLoad();
  }
}

export default ProductsPage;
