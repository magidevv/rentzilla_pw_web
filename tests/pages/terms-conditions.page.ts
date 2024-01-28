import { Page } from "@playwright/test";
import BasePage from "./base-page";

class TermsConditionsPage extends BasePage {
  private readonly termsConditionsTitle: string;

  constructor(page: Page) {
    super(page);

    this.termsConditionsTitle =
      "//h1[contains(@class, 'TermsConditions_title')]";
  }

  public async checkTermsConditionsURL(): Promise<void> {
    await super.doesPageHaveURL(/\/terms-conditions\//);
  }

  public async isTermsConditionsTitleDisplayed(): Promise<void> {
    await this.isDisplayed(this.termsConditionsTitle);
  }
}

export default TermsConditionsPage;
