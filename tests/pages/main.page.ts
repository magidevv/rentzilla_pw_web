import { Locator, Page } from "@playwright/test";
import BasePage from "./base-page";

class MainPage extends BasePage {
  private readonly servicesLabel: Locator;
  private readonly specialMachineryLabel: Locator;
  private readonly servicesTypeLabel: Locator;
  private readonly specialMachineryTypeLabel: Locator;
  private readonly proposesServicesItems: Locator;
  private readonly proposesSpecialMachineryItems: Locator;

  constructor(page: Page) {
    super(page);

    this.servicesLabel = page.locator(
      "//h2[@data-testid='title' and contains(text(), 'Послуги')]"
    );
    this.servicesTypeLabel = this.page.locator(
      "//h2[@data-testid='title' and contains(text(), 'Послуги')]/following-sibling::div/div[contains(@class, 'RentzilaProposes_service')]"
    );
    this.proposesServicesItems = this.page.locator(
      "//h2[@data-testid='title' and contains(text(), 'Послуги')]/following-sibling::div/div[contains(@class, 'RentzilaProposes_proposes_item')]"
    );
    this.specialMachineryLabel = page.locator(
      "//h2[@data-testid='title' and contains(text(), 'Спецтехніка')]"
    );
    this.specialMachineryTypeLabel = this.page.locator(
      "//h2[@data-testid='title' and contains(text(), 'Спецтехніка')]/following-sibling::div/h3[contains(@class, 'RentzilaProposes_service')]"
    );
    this.proposesSpecialMachineryItems = this.page.locator(
      "//h2[@data-testid='title' and contains(text(), 'Спецтехніка')]/following-sibling::div/div[contains(@class, 'RentzilaProposes_proposes_item')]"
    );
  }

  public async openMainURL(): Promise<void> {
    await super.openURL("");
  }

  public async isServicesLabelDisplayed(): Promise<void> {
    await this.isDisplayed(this.servicesLabel);
  }

  public async isSpecialMachineryLabelDisplayed(): Promise<void> {
    await this.isDisplayed(this.specialMachineryLabel);
  }

  public async areServiceTypeLabelsDisplayed(): Promise<void> {
    await this.areDisplayed(this.servicesTypeLabel);
  }

  public async areSpecialMachineryTypeLabelsDisplayed(): Promise<void> {
    await this.areDisplayed(this.specialMachineryTypeLabel);
  }

  public async areProposesServicesItemsDisplayed(): Promise<void> {
    await this.toHaveCount(this.proposesServicesItems, 7);
    await this.areDisplayed(this.proposesServicesItems);
  }

  public async areProposesSpecialMachineryItemsDisplayed(): Promise<void> {
    await this.toHaveCount(this.proposesSpecialMachineryItems, 7);
    await this.areDisplayed(this.proposesSpecialMachineryItems);
  }

  public async clickService(
    serviceType: string,
    serviceName: string
  ): Promise<void> {
    let servicesTypeLabel = this.page.locator(
      `//div[contains(@class, 'RentzilaProposes_service') and contains(text(), '${serviceType}')]`
    );
    let proposesServicesItems = this.page.locator(
      `//div[contains(@class, 'RentzilaProposes_name') and contains(text(), '${serviceName}')]`
    );
    await this.click(servicesTypeLabel);
    await this.click(proposesServicesItems);
    await this.waitForLoad();
  }

  public async clickSpecialMachinery(
    specialMachineryType: string,
    specialMachineryName: string
  ): Promise<void> {
    let specialMachineryTypeLabel = this.page.locator(
      `//h3[contains(@class, 'RentzilaProposes_service') and contains(text(), '${specialMachineryType}')]`
    );
    let proposesSpecialMachineryItems = this.page.locator(
      `//div[contains(@class, 'RentzilaProposes_name') and contains(text(), '${specialMachineryName}')]`
    );
    await this.click(specialMachineryTypeLabel);
    await this.click(proposesSpecialMachineryItems);
    await this.waitForLoad();
  }
}

export default MainPage;
