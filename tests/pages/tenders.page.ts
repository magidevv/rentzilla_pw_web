import { Page } from "@playwright/test";
import BasePage from "./base-page";

const searchInputPlaceholder: string = "//input[@data-testid='search']";

class TendersPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkTendersURL(): Promise<void> {
    await super.doesPageHaveURL(/\/tenders-map\//);
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
}

export default TendersPage;
