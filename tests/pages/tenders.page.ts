import { Page } from "@playwright/test";
import BasePage from "./base-page";

class TendersPage extends BasePage {
  private readonly searchInputPlaceholder: string;

  constructor(page: Page) {
    super(page);

    this.searchInputPlaceholder = "//input[@data-testid='search']";
  }

  public async checkTendersURL(): Promise<void> {
    await super.doesPageHaveURL(/\/tenders-map\//);
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
}

export default TendersPage;
