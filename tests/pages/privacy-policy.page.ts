import { Page } from "@playwright/test";
import BasePage from "./base-page";

const privacyPolicyTitle: string =
  "//h1[contains(@class, 'PrivacyPolicy_title')]";
  
class PrivacyPolicyPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkPrivacyPolicyURL(): Promise<void> {
    await super.doesPageHaveURL(/\/privacy-policy\//);
  }

  public async isPrivacyPolicyTitleDisplayed(): Promise<void> {
    await super.isDisplayed(privacyPolicyTitle);
  }
}

export default PrivacyPolicyPage;
