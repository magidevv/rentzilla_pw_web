import { Page } from "@playwright/test";
import BasePage from "./base-page";

class MainPage extends BasePage {
  private readonly servicesLabel: string;
  private readonly servicesTypeLabel: string;
  private readonly proposesServicesItems: string;
  private readonly specialMachineryLabel: string;
  private readonly specialMachineryTypeLabel: string;
  private readonly proposesSpecialMachineryItems: string;
  private readonly footer: string;
  private readonly footerLogo: string;
  private readonly aboutUsLabel: string;
  private readonly privacyPolicyLabel: string;
  private readonly cookiePolicyLabel: string;
  private readonly termsConditionsLabel: string;
  private readonly toUsersLabel: string;
  private readonly advertismentLabel: string;
  private readonly tendersLabel: string;
  private readonly requestsForWorkLabel: string;
  private readonly contactsLabel: string;
  private readonly footerEmail: string;
  private readonly copyrightLabel: string;
  private readonly logo: string;
  private readonly mainSearchInput: string;
  private readonly mainSearchDropdown: string;
  private readonly mainSearchHistoryTitle: string;
  private readonly mainSearchHistoryItems: string;
  private readonly mainSearchServicesTitle: string;
  private readonly mainSearchServicesList: string;
  private readonly mainSearchServicesItems: string;
  private readonly mainSearchCategoryTitle: string;
  private readonly mainSearchCategoryList: string;
  private readonly mainSearchCategoryItems: string;
  private readonly mainSearchUnitItemsList: string;
  private readonly mainSearchUnitItems: string;
  private readonly mainSearchClearIcon: string;

  constructor(page: Page) {
    super(page);

    this.servicesLabel =
      "//section[@data-testid='services']/h2[@data-testid='title']";
    this.servicesTypeLabel =
      "//section[@data-testid='services']//div[contains(@class, 'RentzilaProposes_service')]";
    this.proposesServicesItems =
      "//section[@data-testid='services']//div[contains(@class, 'RentzilaProposes_proposes_item')]";
    this.specialMachineryLabel =
      "//section[@data-testid='specialEquipment']/h2[@data-testid='title']";
    this.specialMachineryTypeLabel =
      "//section[@data-testid='specialEquipment']//h3[contains(@class, 'RentzilaProposes_service')]";
    this.proposesSpecialMachineryItems =
      "//section[@data-testid='specialEquipment']//div[contains(@class, 'RentzilaProposes_proposes_item')]";
    this.footer = "//div[contains(@class, 'Footer_footer')]";
    this.footerLogo =
      "//div[contains(@class, 'Footer_footer')]//div[@data-testid='logo']";
    this.aboutUsLabel = "//div[@data-testid='content']";
    this.privacyPolicyLabel =
      "//div[@data-testid='politika-konfidenciinosti']/a";
    this.cookiePolicyLabel =
      "//div[@data-testid='pravila-vikoristannya-failiv-cookie']/a";
    this.termsConditionsLabel =
      "//div[@data-testid='umovi-dostupu-ta-koristuvannya']/a";
    this.toUsersLabel = "//div[contains(@class, 'RentzilaForBuyers_title')]";
    this.advertismentLabel = "//div[@data-testid='ogoloshennya']/a";
    this.tendersLabel = "//div[@data-testid='tenderi']/a";
    this.requestsForWorkLabel = "//div[@data-testid='zapiti-na-robotu']/a";
    this.contactsLabel = "//div[contains(@class, 'RentzilaContacts_title')]";
    this.footerEmail = "//a[contains(@class, 'RentzilaContacts_email')]";
    this.copyrightLabel = "//div[@data-testid='copyright']";
    this.logo = "//div[@data-testid='Navbar']//div[@data-testid='logo']";
    this.mainSearchInput =
      "//div[contains(@class, 'HeroSection_inputSearch')]//input[@data-testid='searchInput']";
    this.mainSearchDropdown = "//div[@data-testid='searchDropdown']";
    this.mainSearchHistoryTitle =
      "//h6[contains(@class, 'LeftsideSearch_title')][1]";
    this.mainSearchServicesTitle =
      "//h6[contains(@class, 'LeftsideSearch_title')][2]";
    this.mainSearchServicesList = "//div[@data-testid='services']";
    this.mainSearchServicesItems =
      "//div[@data-testid='services']/div[@data-testid='resultItem']";
    this.mainSearchCategoryTitle =
      "//h6[contains(@class, 'LeftsideSearch_title')][3]";
    this.mainSearchCategoryList =
      "//div[@data-testid='services']/following-sibling::div";
    this.mainSearchCategoryItems =
      "//div[@data-testid='services']/following-sibling::div/div[@data-testid='resultItem']";
    this.mainSearchHistoryItems =
      "//h6[contains(@class, 'LeftsideSearch_title')][1]/following-sibling::div[1]/div[@data-testid='resultItem']";
    this.mainSearchUnitItemsList = "//div[@data-testid='rightsideUnits']";
    this.mainSearchUnitItems = "//div[@data-testid='cardContainer']";
    this.mainSearchClearIcon =
      "//div[contains(@class, 'HeroSection_inputSearch')]//div[@data-testid='searchClear']";
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
    countType: number,
    countService: number
  ): Promise<void> {
    await this.click(this.servicesTypeLabel + `[${countType + 1}]`);
    await this.click(this.proposesServicesItems + `[${countService + 1}]`);
    await this.waitForLoad();
  }

  public async clickSpecialMachinery(
    countType: number,
    countCategory: number
  ): Promise<void> {
    await this.click(this.specialMachineryTypeLabel + `[${countType + 1}]`);
    await this.click(
      this.proposesSpecialMachineryItems + `[${countCategory + 1}]`
    );
    await this.waitForLoad();
  }

  public async isFooterDisplayed(): Promise<void> {
    await this.isDisplayed(this.footer);
  }

  public async isFooterLogoClickable(): Promise<void> {
    await this.isDisplayed(this.footerLogo);
    await this.isNotClickable(this.footerLogo);
  }

  public async areFootersElementsDisplayed(): Promise<void> {
    await this.isDisplayed(this.aboutUsLabel);
    await this.isDisplayed(this.privacyPolicyLabel);
    await this.isDisplayed(this.cookiePolicyLabel);
    await this.isDisplayed(this.termsConditionsLabel);
    await this.isDisplayed(this.toUsersLabel);
    await this.isDisplayed(this.advertismentLabel);
    await this.isDisplayed(this.tendersLabel);
    await this.isDisplayed(this.requestsForWorkLabel);
    await this.isDisplayed(this.contactsLabel);
    await this.isDisplayed(this.footerEmail);
    await this.isDisplayed(this.copyrightLabel);
  }

  public async clickPrivacyPolicy(): Promise<void> {
    await this.click(this.privacyPolicyLabel);
  }

  public async clickCookiePolicy(): Promise<void> {
    await this.click(this.cookiePolicyLabel);
  }

  public async clickTermsConditions(): Promise<void> {
    await this.click(this.termsConditionsLabel);
  }

  public async clickAdvertisment(): Promise<void> {
    await this.click(this.advertismentLabel);
  }

  public async clickLogo(): Promise<void> {
    await this.click(this.logo);
    await this.waitForLoad();
  }

  public async clickTenders(): Promise<void> {
    await this.click(this.tendersLabel);
  }

  public async isEmailClickable(): Promise<void> {
    await this.isClickable(this.footerEmail);
  }

  public async clickMainSearchInput(): Promise<void> {
    await this.click(this.mainSearchInput);
  }

  public async areSearchDropdownElementsDisplayed(): Promise<void> {
    await this.isDisplayed(this.mainSearchInput);
    await this.isDisplayed(this.mainSearchDropdown);
    await this.isDisplayed(this.mainSearchHistoryTitle);
    await this.isDisplayed(this.mainSearchServicesTitle);
    await this.isDisplayed(this.mainSearchServicesList);
    await this.areDisplayed(this.mainSearchServicesItems);
    await this.isDisplayed(this.mainSearchCategoryTitle);
    await this.isDisplayed(this.mainSearchCategoryList);
    await this.areDisplayed(this.mainSearchCategoryItems);
    await this.isDisplayed(this.mainSearchUnitItemsList);
    await this.areDisplayed(this.mainSearchUnitItems);
  }

  public async pressSearchInputEnter(): Promise<void> {
    await this.press(this.mainSearchInput, "Enter");
  }

  public async fillSearchInput(text: string): Promise<void> {
    await this.setValue(this.mainSearchInput, text);
    await this.waitForTimeout(2000);
  }

  public async isHistoryUnitAdded(searchPrompt: string): Promise<void> {
    await this.filteredDisplay(this.mainSearchHistoryItems, searchPrompt);
  }

  public async areHistoryItemsDisplayed(
    ...searchPrompts: string[]
  ): Promise<void> {
    for (const searchPrompt of searchPrompts) {
      await this.elementsToContainText(
        this.mainSearchHistoryItems,
        searchPrompt
      );
    }
  }

  public async areServicesItemsNotDisplayed(): Promise<void> {
    await this.areNotDisplayed(this.mainSearchServicesItems);
  }

  public async areCategoryItemsNotDisplayed(): Promise<void> {
    await this.areNotDisplayed(this.mainSearchCategoryItems);
  }

  public async areSearchUnitItemsDisplayed(
    searchPrompt: string
  ): Promise<void> {
    await this.areDisplayed(this.mainSearchUnitItems);
    await this.elementsToContainText(this.mainSearchUnitItems, searchPrompt);
  }

  public async clickFirstUnitItem(): Promise<void> {
    await this.clickFirst(this.mainSearchUnitItems);
    await this.waitForLoad();
  }

  public async isUnitItemsListEmpty(): Promise<void> {
    await this.areNotDisplayed(this.mainSearchUnitItemsList);
  }

  public async areSearchUnitItemsGreaterZero(): Promise<boolean> {
    const count = await this.count(this.mainSearchUnitItems);
    return count > 0 ? true : false;
  }

  public async areSearchUnitItemsNotDisplayed(): Promise<void> {
    await this.areNotDisplayed(this.mainSearchUnitItems);
  }

  public async isSearchServiceItemDisplayed(
    searchPrompt: string
  ): Promise<void> {
    await this.filteredDisplay(this.mainSearchServicesItems, searchPrompt);
  }

  public async clickSearchServiceItem(searchPrompt: string): Promise<void> {
    await this.filteredClick(this.mainSearchServicesItems, searchPrompt);
  }

  public async isSearchCategoryItemDisplayed(
    searchPrompt: string
  ): Promise<void> {
    await this.filteredDisplay(this.mainSearchCategoryItems, searchPrompt);
  }

  public async clickSearchCategoryItem(searchPrompt: string): Promise<void> {
    await this.filteredClick(this.mainSearchCategoryItems, searchPrompt);
  }

  public async clickMainSearchClearIcon(): Promise<void> {
    await this.click(this.mainSearchClearIcon);
  }

  public async isMainSearchDropdownDisplayed(): Promise<void> {
    await this.isDisplayed(this.mainSearchDropdown);
  }

  public async isMainSearchDropdownNotDisplayed(): Promise<void> {
    await this.isNotDisplayed(this.mainSearchDropdown);
  }

  public async isSearchInputEmpty(): Promise<void> {
    await this.toHaveValue(this.mainSearchInput, "");
  }

  public async areSearchHistoryItemsDisplayed(
    ...searchPrompts: string[]
  ): Promise<void> {
    for (const searchPrompt of searchPrompts) {
      await this.filteredDisplay(this.mainSearchHistoryItems, searchPrompt);
    }
  }
}

export default MainPage;
