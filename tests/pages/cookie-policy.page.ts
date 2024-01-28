import { Page } from "@playwright/test";
import BasePage from "./base-page";

class CookiePolicyPage extends BasePage {
  private readonly cookiePolicyTitle: string;

  constructor(page: Page) {
    super(page);

    this.cookiePolicyTitle = "//h1[contains(@class, 'Cookies_title')]";
  }

  public async checkCookiePolicyURL(): Promise<void> {
    await super.doesPageHaveURL(/\/cookie-policy\//);
  }

  public async isCookiePolicyTitleDisplayed(): Promise<void> {
    await this.isDisplayed(this.cookiePolicyTitle);
  }
}

export default CookiePolicyPage;
