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
const hiddenPasswordBtn: string = "//div[@data-testid='reactHookButton']";
const loginErrorMsg: string = "//div[@data-testid='errorMessage']";

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

  public async clickHiddenPasswordBtn(): Promise<void> {
    await super.click(hiddenPasswordBtn);
  }

  public async isPasswordHidden(): Promise<void> {
    await super.doesElementAttrHaveText(loginPasswordField, "type", "password");
  }

  public async isPasswordNotHidden(): Promise<void> {
    await super.doesElementAttrHaveText(loginPasswordField, "type", "text");
  }

  public async pressPasswordFieldEnter(): Promise<void> {
    await super.press(loginPasswordField, "Enter");
  }

  public async isLoginErrorMsgDisplayed(errorMsg: string): Promise<void> {
    await super.isDisplayed(loginErrorMsg);
    await super.toHaveText(loginErrorMsg, errorMsg);
  }
}

export default MainPage;
