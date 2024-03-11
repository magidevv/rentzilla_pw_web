import { Page } from "@playwright/test";
import BasePage from "./base-page";

const cookiePolicyTitle: string = "//h1[contains(@class, 'Cookies_title')]";

class CookiePolicyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkCookiePolicyURL(): Promise<void> {
    await super.doesPageHaveURL(/\/cookie-policy\//);
  }

  public async isCookiePolicyTitleDisplayed(): Promise<void> {
    await super.isDisplayed(cookiePolicyTitle);
  }
}

export default CookiePolicyPage;
