import { Page } from "@playwright/test";
import BasePage from "./base-page";

class PrivacyPolicyPage extends BasePage {
  private readonly privacyPolicyTitle: string;

  constructor(page: Page) {
    super(page);

    this.privacyPolicyTitle = "//h1[contains(@class, 'PrivacyPolicy_title')]";
  }

  public async checkPrivacyPolicyURL(): Promise<void> {
    await super.doesPageHaveURL(/\/privacy-policy\//);
  }

  public async isPrivacyPolicyTitleDisplayed(): Promise<void> {
    await this.isDisplayed(this.privacyPolicyTitle);
  }
}

export default PrivacyPolicyPage;
