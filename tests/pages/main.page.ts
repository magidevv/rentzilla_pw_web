import { Locator, Page } from "@playwright/test";
import BasePage from "./base-page";

class MainPage extends BasePage {
  private readonly servicesLabel: Locator;
  private readonly servicesTypeLabel: Locator;
  private readonly proposesListItems: Locator;

  constructor(page: Page) {
    super(page);

    this.servicesLabel = page.locator(
      "//h2[@data-testid='title' and contains(text(), 'Послуги')]"
    );
    this.servicesTypeLabel = this.page.locator(
      "//h2[@data-testid='title' and contains(text(), 'Послуги')]/following-sibling::div/div[contains(@class, 'RentzilaProposes_service')]"
    );
    this.proposesListItems = this.page.locator(
      "//h2[@data-testid='title' and contains(text(), 'Послуги')]/following-sibling::div/div[contains(@class, 'RentzilaProposes_proposes_item')]"
    );
  }

  public async openMainURL(): Promise<void> {
    await super.openURL("");
  }

  public async isServicesLabelDisplayed(): Promise<void> {
    await this.isDisplayed(this.servicesLabel);
  }

  public async areServiceTypeLabelsDisplayed(): Promise<void> {
    await this.areDisplayed(this.servicesTypeLabel);
  }

  public async areProposesListItemsDisplayed(): Promise<void> {
    await this.toHaveCount(this.proposesListItems, 7);
    await this.areDisplayed(this.proposesListItems);
  }

  public async clickService(
    serviceType: string,
    serviceName: string
  ): Promise<void> {
    let servicesTypeLabel = this.page.locator(
      `//div[contains(@class, 'RentzilaProposes_service') and contains(text(), '${serviceType}')]`
    );
    let proposesListItems = this.page.locator(
      `//div[contains(@class, 'RentzilaProposes_name') and contains(text(), '${serviceName}')]`
    );
    await this.click(servicesTypeLabel);
    await this.click(proposesListItems);
    await this.waitForLoad();
  }
}

export default MainPage;
