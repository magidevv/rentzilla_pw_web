import { Page } from "@playwright/test";
import BasePage from "./base-page";

const termsConditionsTitle: string =
  "//h1[contains(@class, 'TermsConditions_title')]";
class TermsConditionsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkTermsConditionsURL(): Promise<void> {
    await super.doesPageHaveURL(/\/terms-conditions\//);
  }

  public async isTermsConditionsTitleDisplayed(): Promise<void> {
    await super.isDisplayed(termsConditionsTitle);
  }
}

export default TermsConditionsPage;
