import { Page } from "@playwright/test";
import BasePage from "./base-page";

const servicesLabel: string =
  "//section[@data-testid='services']/h2[@data-testid='title']";
const servicesTypeLabel: string =
  "//section[@data-testid='services']//div[contains(@class, 'RentzilaProposes_service')]";
const proposesServicesItems: string =
  "//section[@data-testid='services']//div[contains(@class, 'RentzilaProposes_proposes_item')]";
const specialMachineryLabel: string =
  "//section[@data-testid='specialEquipment']/h2[@data-testid='title']";
const specialMachineryTypeLabel: string =
  "//section[@data-testid='specialEquipment']//h3[contains(@class, 'RentzilaProposes_service')]";
const proposesSpecialMachineryItems: string =
  "//section[@data-testid='specialEquipment']//div[contains(@class, 'RentzilaProposes_proposes_item')]";
const footer: string = "//div[contains(@class, 'Footer_footer')]";
const footerLogo: string =
  "//div[contains(@class, 'Footer_footer')]//div[@data-testid='logo']";
const aboutUsLabel: string = "//div[@data-testid='content']";
const privacyPolicyLabel: string =
  "//div[@data-testid='politika-konfidenciinosti']/a";
const cookiePolicyLabel: string =
  "//div[@data-testid='pravila-vikoristannya-failiv-cookie']/a";
const termsConditionsLabel: string =
  "//div[@data-testid='umovi-dostupu-ta-koristuvannya']/a";
const toUsersLabel: string =
  "//div[contains(@class, 'RentzilaForBuyers_title')]";
const advertismentLabel: string = "//div[@data-testid='ogoloshennya']/a";
const tendersLabel: string = "//div[@data-testid='tenderi']/a";
const requestsForWorkLabel: string = "//div[@data-testid='zapiti-na-robotu']/a";
const contactsLabel: string =
  "//div[contains(@class, 'RentzilaContacts_title')]";
const footerEmail: string = "//a[contains(@class, 'RentzilaContacts_email')]";
const copyrightLabel: string = "//div[@data-testid='copyright']";
const logo: string = "//div[@data-testid='Navbar']//div[@data-testid='logo']";
const mainSearchInput: string =
  "//div[contains(@class, 'HeroSection_inputSearch')]//input[@data-testid='searchInput']";
const mainSearchDropdown: string = "//div[@data-testid='searchDropdown']";
const mainSearchHistoryTitle: string =
  "//h6[contains(@class, 'LeftsideSearch_title')][1]";
const mainSearchServicesTitle: string =
  "//h6[contains(@class, 'LeftsideSearch_title')][2]";
const mainSearchServicesList: string = "//div[@data-testid='services']";
const mainSearchServicesItems: string =
  "//div[@data-testid='services']/div[@data-testid='resultItem']";
const mainSearchCategoryTitle: string =
  "//h6[contains(@class, 'LeftsideSearch_title')][3]";
const mainSearchCategoryList: string =
  "//div[@data-testid='services']/following-sibling::div";
const mainSearchCategoryItems: string =
  "//div[@data-testid='services']/following-sibling::div/div[@data-testid='resultItem']";
const mainSearchHistoryItems: string =
  "//h6[contains(@class, 'LeftsideSearch_title')][1]/following-sibling::div[1]/div[@data-testid='resultItem']";
const mainSearchUnitItemsList: string = "//div[@data-testid='rightsideUnits']";
const mainSearchUnitItems: string = "//div[@data-testid='cardContainer']";
const mainSearchClearIcon: string =
  "//div[contains(@class, 'HeroSection_inputSearch')]//div[@data-testid='searchClear']";
const catalogBtn: string = "//div[contains(@class, 'NavbarCatalog_wrapper')]";
const catalogDropdown: string = "//div[contains(@class, 'Catalog_container')]";
const catalogSpecialMachinery: string =
  "//div[contains(@class, 'Catalog_container')]/div/div[contains(@class, 'Catalog_parent')][1]";
const catalogServices: string =
  "//div[contains(@class, 'Catalog_container')]/div/div[contains(@class, 'Catalog_parent')][2]";
const catalogItems: string =
  "//div[contains(@class, 'Catalog_container')]/div/div[contains(@class, 'CatalogItem_item')]";
const catalogSecondItems: string =
  "//div[contains(@class, 'Catalog_container')]/div[contains(@class, 'Catalog_listSecond')][1]/div[contains(@class, 'CatalogItem_item')]";
const footerQuestionForm: string =
  "//div[contains(@class, 'ConsultationForm_container')]";
const footerQuestionFormTitle: string =
  "//div[contains(@class, 'ConsultationForm_container')]/h2[contains(@class, 'ConsultationForm_title')]";
const footerQuestionFormNameField: string =
  "//div[contains(@class, 'ConsultationForm_container')]//input[@name='name']";
const footerQuestionFormPhoneField: string =
  "//div[contains(@class, 'ConsultationForm_container')]//input[@type='tel']";
const footerQuestionFormSubmitBtn: string =
  "//div[contains(@class, 'ConsultationForm_container')]//button[@type='submit']";
const footerQuestionFormErrorLabels: string =
  "//div[contains(@class, 'ConsultationForm_container')]//p[contains(@class, 'ConsultationForm_error_message')]";
const headerLoginBtn: string =
  "//div[contains(@class, 'NavbarAuthBlock_buttonEnter')]";
const authorizationPopup: string =
  "//div[@data-testid='authorizationContainer']";
const forgotPasswordLink: string =
  "//div/div[contains(@class, 'LoginForm_link')][2]";
const restorePasswordPopup: string =
  "//div[@data-testid='restorePasswordPopup']";
const recaptchaCheckbox: string = "//iframe[@title='reCAPTCHA']";
const submitRestorePasswordBtn: string =
  "//form[contains(@class, 'RestorePasswordPopup_form')]//button[@type='submit']";
const fieldErrorMsg: string =
  "//p[contains(@class, 'CustomReactHookInput_error_message')]";
const restorePasswordEmailField: string =
  "//form[contains(@class, 'RestorePasswordPopup_form')]//input[@data-testid='reactHookInput']";
const restorePasswordCrossIcon: string =
  "//div[@data-testid='restorePasswordCross']";
const restoreErrorMsg: string = "//div[@data-testid='restoreError']";
const loginBtn: string =
  "//div[@data-testid='authorizationContainer']//button[@type='submit']";
const loginEmailField: string = "#email";
const loginPasswordField: string = "#password";

class MainPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async openMainURL(): Promise<void> {
    await super.openURL("");
  }

  public async isServicesLabelDisplayed(): Promise<void> {
    await super.isDisplayed(servicesLabel);
  }

  public async isSpecialMachineryLabelDisplayed(): Promise<void> {
    await super.isDisplayed(specialMachineryLabel);
  }

  public async areServiceTypeLabelsDisplayed(): Promise<void> {
    await super.areDisplayed(servicesTypeLabel);
  }

  public async areSpecialMachineryTypeLabelsDisplayed(): Promise<void> {
    await super.areDisplayed(specialMachineryTypeLabel);
  }

  public async areProposesServicesItemsDisplayed(): Promise<void> {
    await super.toHaveCount(proposesServicesItems, 7);
    await super.areDisplayed(proposesServicesItems);
  }

  public async areProposesSpecialMachineryItemsDisplayed(): Promise<void> {
    await super.toHaveCount(proposesSpecialMachineryItems, 7);
    await super.areDisplayed(proposesSpecialMachineryItems);
  }

  public async clickService(
    countType: number,
    countService: number
  ): Promise<void> {
    await super.click(servicesTypeLabel + `[${countType + 1}]`);
    await super.click(proposesServicesItems + `[${countService + 1}]`);
    await super.waitForLoad();
  }

  public async clickSpecialMachinery(
    countType: number,
    countCategory: number
  ): Promise<void> {
    await super.click(specialMachineryTypeLabel + `[${countType + 1}]`);
    await super.click(proposesSpecialMachineryItems + `[${countCategory + 1}]`);
    await super.waitForLoad();
  }

  public async isFooterDisplayed(): Promise<void> {
    await super.isDisplayed(footer);
  }

  public async isFooterLogoClickable(): Promise<void> {
    await super.isDisplayed(footerLogo);
    await super.isNotClickable(footerLogo);
  }

  public async areFootersElementsDisplayed(): Promise<void> {
    await super.isDisplayed(aboutUsLabel);
    await super.isDisplayed(privacyPolicyLabel);
    await super.isDisplayed(cookiePolicyLabel);
    await super.isDisplayed(termsConditionsLabel);
    await super.isDisplayed(toUsersLabel);
    await super.isDisplayed(advertismentLabel);
    await super.isDisplayed(tendersLabel);
    await super.isDisplayed(requestsForWorkLabel);
    await super.isDisplayed(contactsLabel);
    await super.isDisplayed(footerEmail);
    await super.isDisplayed(copyrightLabel);
  }

  public async clickPrivacyPolicy(): Promise<void> {
    await super.click(privacyPolicyLabel);
  }

  public async clickCookiePolicy(): Promise<void> {
    await super.click(cookiePolicyLabel);
  }

  public async clickTermsConditions(): Promise<void> {
    await super.click(termsConditionsLabel);
  }

  public async clickAdvertisment(): Promise<void> {
    await super.click(advertismentLabel);
  }

  public async clickLogo(): Promise<void> {
    await super.click(logo);
    await super.waitForLoad();
  }

  public async clickTenders(): Promise<void> {
    await super.click(tendersLabel);
  }

  public async isEmailClickable(): Promise<void> {
    await super.isClickable(footerEmail);
  }

  public async clickMainSearchInput(): Promise<void> {
    await super.click(mainSearchInput);
  }

  public async areSearchDropdownElementsDisplayed(): Promise<void> {
    await super.isDisplayed(mainSearchInput);
    await super.isDisplayed(mainSearchDropdown);
    await super.isDisplayed(mainSearchHistoryTitle);
    await super.isDisplayed(mainSearchServicesTitle);
    await super.isDisplayed(mainSearchServicesList);
    await super.areDisplayed(mainSearchServicesItems);
    await super.isDisplayed(mainSearchCategoryTitle);
    await super.isDisplayed(mainSearchCategoryList);
    await super.areDisplayed(mainSearchCategoryItems);
    await super.isDisplayed(mainSearchUnitItemsList);
    await super.areDisplayed(mainSearchUnitItems);
  }

  public async pressSearchInputEnter(): Promise<void> {
    await super.press(mainSearchInput, "Enter");
  }

  public async fillSearchInput(text: string): Promise<void> {
    await super.setValue(mainSearchInput, text);
    await super.waitForTimeout(2000);
  }

  public async isHistoryUnitAdded(searchPrompt: string): Promise<void> {
    await super.filteredDisplay(mainSearchHistoryItems, searchPrompt);
  }

  public async areHistoryItemsDisplayed(
    ...searchPrompts: string[]
  ): Promise<void> {
    for (const searchPrompt of searchPrompts) {
      await super.elementsToContainText(mainSearchHistoryItems, searchPrompt);
    }
  }

  public async areServicesItemsNotDisplayed(): Promise<void> {
    await super.areNotDisplayed(mainSearchServicesItems);
  }

  public async areCategoryItemsNotDisplayed(): Promise<void> {
    await super.areNotDisplayed(mainSearchCategoryItems);
  }

  public async areSearchUnitItemsDisplayed(
    searchPrompt: string
  ): Promise<void> {
    await super.areDisplayed(mainSearchUnitItems);
    await super.elementsToContainText(mainSearchUnitItems, searchPrompt);
  }

  public async clickFirstUnitItem(): Promise<void> {
    await super.clickFirst(mainSearchUnitItems);
    await super.waitForLoad();
  }

  public async isUnitItemsListEmpty(): Promise<void> {
    await super.areNotDisplayed(mainSearchUnitItemsList);
  }

  public async areSearchUnitItemsGreaterZero(): Promise<boolean> {
    const count = await super.count(mainSearchUnitItems);
    return count > 0 ? true : false;
  }

  public async areSearchUnitItemsNotDisplayed(): Promise<void> {
    await super.areNotDisplayed(mainSearchUnitItems);
  }

  public async isSearchServiceItemDisplayed(
    searchPrompt: string
  ): Promise<void> {
    await super.filteredDisplay(mainSearchServicesItems, searchPrompt);
  }

  public async clickSearchServiceItem(searchPrompt: string): Promise<void> {
    await super.filteredClick(mainSearchServicesItems, searchPrompt);
  }

  public async isSearchCategoryItemDisplayed(
    searchPrompt: string
  ): Promise<void> {
    await super.filteredDisplay(mainSearchCategoryItems, searchPrompt);
  }

  public async clickSearchCategoryItem(searchPrompt: string): Promise<void> {
    await super.filteredClick(mainSearchCategoryItems, searchPrompt);
  }

  public async clickMainSearchClearIcon(): Promise<void> {
    await super.click(mainSearchClearIcon);
  }

  public async isMainSearchDropdownDisplayed(): Promise<void> {
    await super.isDisplayed(mainSearchDropdown);
  }

  public async isMainSearchDropdownNotDisplayed(): Promise<void> {
    await super.isNotDisplayed(mainSearchDropdown);
  }

  public async isSearchInputEmpty(): Promise<void> {
    await super.toHaveValue(mainSearchInput, "");
  }

  public async areSearchHistoryItemsDisplayed(
    ...searchPrompts: string[]
  ): Promise<void> {
    for (const searchPrompt of searchPrompts) {
      await super.filteredDisplay(mainSearchHistoryItems, searchPrompt);
    }
  }

  public async isCatalogBtnDisplayed(): Promise<void> {
    await super.isDisplayed(catalogBtn);
  }

  public async clickCatalogBtn(): Promise<void> {
    await super.click(catalogBtn);
  }

  public async areCatalogElementsDisplayed(
    specialMachineryLabel: string,
    servicesLabel: string
  ): Promise<void> {
    await super.isDisplayed(catalogDropdown);
    await super.isDisplayed(catalogSpecialMachinery);
    await super.toHaveText(catalogSpecialMachinery, specialMachineryLabel);
    await super.isDisplayed(catalogServices);
    await super.toHaveText(catalogServices, servicesLabel);
  }

  public async hoverCatalogSpecialMachinery(): Promise<void> {
    await super.hover(catalogSpecialMachinery);
  }

  public async areCatalogSpecialMachineryItemsDisplayed(
    ...items: string[]
  ): Promise<void> {
    await this.areDisplayed(catalogItems);
    for (const catalogItem of items) {
      await this.filteredDisplay(catalogItems, catalogItem);
    }
  }

  public async areCatalogSpecialMachinerySecondItemsDisplayed(
    ...items: string[]
  ): Promise<void> {
    await this.areDisplayed(catalogSecondItems);
    for (const catalogSecondItem of items) {
      await this.filteredDisplay(catalogSecondItems, catalogSecondItem);
    }
  }

  public async clickCatalogSpecialMachineryItem(
    countItem: number
  ): Promise<void> {
    await super.click(catalogItems + `[${countItem + 1}]`);
    await super.waitForLoad();
  }

  public async hoverCatalogSpecialMachineryItem(
    countItem: number
  ): Promise<void> {
    await super.hover(catalogItems + `[${countItem + 1}]`);
    await super.waitForLoad();
  }

  public async clickCatalogSpecialMachinerySecondItem(
    countItem: number
  ): Promise<void> {
    await super.click(catalogSecondItems + `[${countItem + 1}]`);
    await super.waitForLoad();
  }

  public async hoverCatalogServices(): Promise<void> {
    await super.hover(catalogServices);
  }

  public async areCatalogServicesItemsDisplayed(
    ...items: string[]
  ): Promise<void> {
    await this.areDisplayed(catalogItems);
    for (const catalogItem of items) {
      await this.filteredDisplay(catalogItems, catalogItem);
    }
  }

  public async hoverCatalogServicesItem(countItem: number): Promise<void> {
    await super.hover(catalogItems + `[${countItem + 1}]`);
    await super.waitForLoad();
  }

  public async areCatalogServicesSecondItemsDisplayed(): Promise<void> {
    await super.areDisplayed(catalogSecondItems);
  }

  public async areFooterQuestionFormElementsDisplayed(): Promise<void> {
    await super.isDisplayed(footerQuestionForm);
    await super.isDisplayed(footerQuestionFormTitle);
    await super.isDisplayed(footerQuestionFormNameField);
    await super.isDisplayed(footerQuestionFormPhoneField);
    await super.isDisplayed(footerQuestionFormSubmitBtn);
  }

  public async clickFooterQuestionFormSubmitBtn(): Promise<void> {
    await super.click(footerQuestionFormSubmitBtn);
  }

  public async areFooterQuestionFormFieldsRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(footerQuestionFormNameField);
    await super.isFieldRedHighlighted(footerQuestionFormPhoneField);
  }

  public async areFooterQuestionFormErrorLabelsDisplayed(
    errorMsg: string
  ): Promise<void> {
    await super.filteredDisplay(footerQuestionFormErrorLabels, errorMsg);
  }

  public async fillFooterQuestionFormNameField(name: string): Promise<void> {
    await super.setValue(footerQuestionFormNameField, name);
  }

  public async fillFooterQuestionFormPhoneField(phone: string): Promise<void> {
    await super.setValue(footerQuestionFormPhoneField, phone);
  }

  public async isFooterQuestionFormNameFieldNotRedHighlighted(): Promise<void> {
    await super.isFieldNotRedHighlighted(footerQuestionFormNameField);
  }

  public async isFooterQuestionFormPhoneFieldRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(footerQuestionFormPhoneField);
  }

  public async clickFooterQuestionFormPhoneField(): Promise<void> {
    await super.click(footerQuestionFormPhoneField);
  }

  public async doesFooterQuestionFormPhoneHavePrefilledPart(
    prefilledPart: string
  ): Promise<void> {
    await super.toHaveValue(footerQuestionFormPhoneField, prefilledPart);
  }

  public async clearFooterQuestionFormNameField(): Promise<void> {
    await super.clearValue(footerQuestionFormNameField);
  }

  public async isFooterQuestionFormNameFieldRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(footerQuestionFormNameField);
  }

  public async isFooterQuestionFormPhoneFieldNotRedHighlighted(): Promise<void> {
    await super.isFieldNotRedHighlighted(footerQuestionFormPhoneField);
  }

  public async isFooterQuestionFormPhoneErrorLabelDisplayed(
    errorMsg: string
  ): Promise<void> {
    await super.toHaveText(footerQuestionFormErrorLabels, errorMsg);
  }

  public async isFoundFeedbackPresent(
    feedbackList: any,
    name: string,
    phone: string
  ): Promise<void> {
    let foundFeedback = null;
    // Iterate over feedbackList to find the first matching feedback
    for (const feedback of feedbackList) {
      if (feedback.name === name && feedback.phone === phone) {
        foundFeedback = feedback;
        break; // Exit the loop once a match is found
      }
    }
    // Assert that the feedback item is found
    await super.isNotNull(foundFeedback);
  }

  public async clickHeaderLoginBtn(): Promise<void> {
    await super.click(headerLoginBtn);
  }

  public async isAuthorizationPopupDisplayed(): Promise<void> {
    await super.isDisplayed(authorizationPopup);
  }

  public async clickForgotPasswordLink(): Promise<void> {
    await super.click(forgotPasswordLink);
    await super.waitForTimeout(1000);
  }

  public async isRestorePasswordPopupDisplayed(): Promise<void> {
    await super.isDisplayed(restorePasswordPopup);
  }

  public async clickRecaptchaCheckbox(): Promise<void> {
    await super.clickByCoordinates(recaptchaCheckbox);
  }

  public async clickSubmitRestorePasswordBtn(): Promise<void> {
    await super.click(submitRestorePasswordBtn);
  }

  public async isFieldErrorMsgDisplayed(errorMsg: string): Promise<void> {
    await super.isDisplayed(fieldErrorMsg);
    await super.toHaveText(fieldErrorMsg, errorMsg);
  }

  public async areFieldErrorMsgsDisplayed(errorMsg: string): Promise<void> {
    await super.areDisplayed(fieldErrorMsg);
    await super.elementsToHaveText(fieldErrorMsg, errorMsg);
  }

  public async fillRestorePasswordEmailField(email: string): Promise<void> {
    await super.setValue(restorePasswordEmailField, email);
  }

  public async clickRestorePasswordCrossIcon(): Promise<void> {
    await super.click(restorePasswordCrossIcon);
  }

  public async isRestorePasswordPopupNotDisplayed(): Promise<void> {
    await super.isNotDisplayed(restorePasswordPopup);
  }

  public async isRestoreErrorMsgDisplayed(errorMsg: string): Promise<void> {
    await super.isDisplayed(restoreErrorMsg);
    await super.toHaveText(restoreErrorMsg, errorMsg);
  }

  public async pressRestorePasswordEmailFieldEnter(): Promise<void> {
    await super.press(restorePasswordEmailField, "Enter");
  }

  public async clickLoginBtn(): Promise<void> {
    await super.click(loginBtn);
  }

  public async fillLoginEmailField(email: string): Promise<void> {
    await super.setValue(loginEmailField, email);
  }

  public async fillLoginPasswordField(password: string): Promise<void> {
    await super.setValue(loginPasswordField, password);
  }

  public async isEmailFieldRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(loginEmailField);
  }

  public async isEmailFieldNotRedHighlighted(): Promise<void> {
    await super.isFieldNotRedHighlighted(loginEmailField);
  }

  public async isPasswordFieldRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(loginPasswordField);
  }

  public async isPasswordFieldNotRedHighlighted(): Promise<void> {
    await super.isFieldNotRedHighlighted(loginPasswordField);
  }

  public async clearLoginEmailField(): Promise<void> {
    await super.clearValue(loginEmailField);
  }
}

export default MainPage;
