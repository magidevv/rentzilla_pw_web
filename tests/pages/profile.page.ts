import { Page } from "@playwright/test";
import BasePage from "./base-page";

const closeTelegramPopupBtn: string = "[data-testid='crossButton']";
const mobileUserName: string = "[class*='nameWrapper']";
const mobileProfileBtn: string =
  "[class^='LeftSideOwnCabinetCategory_wrapper']:nth-child(4)";
const phoneNumberVerificationMsg: string =
  "//div[@data-testid='verification_OwnerProfileNumber']";
const logoutLink: string = "//div[@data-testid='logOut']";
const unitsLink: string =
  "//div[contains(@class, 'LeftSideOwnCabinetCategory_wrapper')][1]";
const myUnitsLink: string = "//div[@data-testid='variant'][1]";
const profileTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root MuiTab-textColorPrimary')]";
const baseInfoFormTitle: string =
  "(//div[contains(@class, 'OwnerProfileForm_title')])[1]";
const personTypeSelect: string = "(//div[@data-testid='div_CustomSelect'])[1]";
const personTypeDropdownList: string =
  "//ul[@data-testid='listItems-customSelect']";
const personTypeOption: string = "//li[@data-testid='item-customSelect']";
const ipnField: string = "(//input[@data-testid='custom-input'])[1]";
const ipnFOPField: string = "(//input[@data-testid='custom-input'])[1]";
const legalEntityTypeSelect: string =
  "(//div[@data-testid='div_CustomSelect'])[2]";
const legalEntityEDRPOUField: string =
  "(//input[@data-testid='custom-input'])[1]";
const legalEntityNameField: string =
  "(//input[@data-testid='custom-input'])[2]";
const lastNameField: string = "(//input[@data-testid='custom-input'])";
const firstNameField: string = "(//input[@data-testid='custom-input'])";
const fatherNameField: string = "(//input[@data-testid='custom-input'])";
const cityField: string = "(//input[@data-testid='custom-input'])";
const cityDropdownList: string =
  "//ul[contains(@class, 'CityDropdown_options_container')]";
const cityOption: string = "//li[@data-testid='li_CityDropdown']";
const photo: string = "(//img[@data-testid='photo'])[3]";
const photoUploadBtn: string =
  "//div[contains(@class, 'OwnerProfileForm_choosePhoto')]";
const photoUpload: string = "//input[@type='file']";
const contactsFormTitle: string =
  "(//div[contains(@class, 'OwnerProfileForm_title')])[2]";
const phoneNumberField: string =
  "//input[@data-testid='input_OwnerProfileNumber']";
const telegramBtn: string =
  "//button[@data-testid='telegramButton_OwnerProfileNumber']";
const smsBtn: string = "//button[@data-testid='smsButton_OwnerProfileNumber']";
const changeProfilePhoneNumberPopup: string =
  "//div[@data-testid='OwnerProfileNumber']";
const invalidProfileImagePopupText: string = "//div[@data-testid='errorPopup']";
const changeProfilePopupTitle: string =
  "//div[contains(@class, 'PopupLayout_label')]";
const changeProfilePhoneNumberPopupText: string =
  "//div[contains(@class, 'DialogPopup_text')]";
const changeProfilePhoneNumberPopupQRInstruction: string =
  "//div[contains(@class, 'QrCodeTelegramPopup_content')]";
const changeProfilePhoneNumberPopupTelegramBotLink: string =
  "//a[contains(@class, 'QrCodeTelegramPopup_link')]";
const changeProfilePhoneNumberPopupCancelBtn: string =
  "//button[contains(@class, 'ItemButtons_lightRedBtn')]";
const changeProfilePopupSubmitBtn: string =
  "//button[contains(@class, 'ItemButtons_darkBlueBtn')]";
const profilePopupCloseIcon: string = "//div[@data-testid='closeIcon']";
const viberField: string = "(//input[@id='mobile'])[2]";
const telegramField: string = "(//input[@data-testid='custom-input'])";
const emailField: string = "(//input[@data-testid='custom-input'])";
const submitBtn: string = "//button[@data-testid='nextButton']";
const successNotification: string =
  "//div[contains(@class, 'NotificationLikePopup_description')]";
const successVerificationPhoneNumberMsg: string =
  "//div[@data-testid='verification_OwnerProfileNumber']";
const invalidDataErrorMsg: string = "(//div[@data-testid='descriptionError'])";
const ivalidPhoneNumberErrorMsg: string =
  "//div[@data-testid='phoneError_OwnerProfileNumber']";
const ivalidViberPhoneNumberErrorMsg: string =
  "//div[contains(@class, 'OwnerProfileAdditionalInfo_errorDescr')]";

class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkProfileURL(): Promise<void> {
    await super.doesPageHaveURL(/\/owner-cabinet\//);
  }

  public async closeTelegramPopup(): Promise<void> {
    await super.click(closeTelegramPopupBtn);
  }

  public async checkUserName(name: string): Promise<void> {
    await super.isDisplayed(mobileUserName);
    await super.toHaveText(mobileUserName, name);
  }

  public async isProfileTabSelected(): Promise<void> {
    await super.doesElementAttrHaveValue(profileTab, "aria-selected", "true");
  }

  public async isBaseInfoFormDisplayed(): Promise<void> {
    await super.isDisplayed(baseInfoFormTitle);
    await super.isDisplayed(personTypeSelect);
    await super.isDisplayed(ipnField);
    await super.isDisplayed(lastNameField + "[2]");
    await super.isDisplayed(firstNameField + "[3]");
    await super.isDisplayed(fatherNameField + "[4]");
    await super.isDisplayed(cityField + "[5]");
    await super.isDisplayed(photo);
    await super.isDisplayed(photoUploadBtn);
  }

  public async isContactsFormDisplayed(): Promise<void> {
    await super.isDisplayed(contactsFormTitle);
    await super.isDisplayed(phoneNumberField);
    await super.isDisplayed(viberField);
    await super.isDisplayed(telegramField + "[6]");
    await super.isDisplayed(emailField + "[7]");
    await super.isDisplayed(submitBtn);
  }

  public async isPersonTypeOptionSelected(option: string): Promise<void> {
    await super.toHaveText(personTypeSelect, option);
  }

  public async clickPersonTypeSelect(): Promise<void> {
    await super.click(personTypeSelect);
  }

  public async isPersonTypeDropdownListDisplayed(
    options: string | string[]
  ): Promise<void> {
    await super.isDisplayed(personTypeDropdownList);
    await super.toHaveText(personTypeOption + "[1]", options[0]);
    await super.toHaveText(personTypeOption + "[2]", options[1]);
    await super.toHaveText(personTypeOption + "[3]", options[2]);
  }

  public async selectPersonTypeOption(options: string): Promise<void> {
    await super.filteredClick(personTypeOption, options);
  }

  public async isIpnFOPFieldDisplayed(): Promise<void> {
    await super.isDisplayed(ipnFOPField);
  }

  public async areLegalEntityFieldsDisplayed(): Promise<void> {
    await super.isDisplayed(legalEntityTypeSelect);
    await super.isDisplayed(legalEntityEDRPOUField);
    await super.isDisplayed(legalEntityNameField);
  }

  public async isLegalEntityOptionCleared(): Promise<void> {
    await super.isEmpty(legalEntityTypeSelect);
  }

  public async clickSubmitBtn(): Promise<void> {
    await super.click(submitBtn);
  }

  public async isLegalEntityTypeOptionSelected(option: string): Promise<void> {
    await super.toHaveText(legalEntityTypeSelect, option);
  }

  public async clickLegalEntityTypeSelect(): Promise<void> {
    await super.click(legalEntityTypeSelect);
  }

  public async isLegalEntityTypeDropdownListDisplayed(
    options: string | string[]
  ): Promise<void> {
    await super.isDisplayed(personTypeDropdownList);
    await super.toHaveText(personTypeOption + "[1]", options[0]);
    await super.toHaveText(personTypeOption + "[2]", options[1]);
    await super.toHaveText(personTypeOption + "[3]", options[2]);
  }

  public async selectLegalEntityTypeOption(
    options: string | string[],
    i: number
  ): Promise<void> {
    await super.filteredClick(personTypeOption + `[${i + 1}]`, options[i]);
  }

  public async isLegalEntityTypeSelectCleared(): Promise<void> {
    await super.isEmpty(legalEntityTypeSelect);
  }

  public async clearIpnField(): Promise<void> {
    await super.clearValue(ipnField);
  }

  public async fillIpnField(ipn: string): Promise<void> {
    await super.setValue(ipnField, ipn);
  }

  public async isIpnFieldCleared(): Promise<void> {
    await super.toHaveValue(ipnField, "");
  }

  public async isIpnFieldNotRedHighlighted(): Promise<void> {
    await super.isFieldNotRedHighlighted(ipnField);
  }

  public async isIpnFieldRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(ipnField);
  }

  public async isIpnFieldErrorMsgDisplayed(
    msg: string,
    i: number
  ): Promise<void> {
    await super.isDisplayed(invalidDataErrorMsg + `[${i}]`);
    await super.toHaveText(invalidDataErrorMsg + `[${i}]`, msg);
  }

  public async checkIpnFieldValueLength(length: number): Promise<void> {
    await super.toHaveValueLength(ipnField, length);
  }

  public async fillIpnFOPField(ipn: string): Promise<void> {
    await super.setValue(ipnFOPField, ipn);
  }

  public async fillLegalEntityEDRPOUField(edrpou: string): Promise<void> {
    await super.setValue(legalEntityEDRPOUField, edrpou);
  }

  public async fillKeysLegalEntityEDRPOUField(count: number): Promise<void> {
    for (let i = 0; i < count; i++) {
      await super.press(legalEntityEDRPOUField, "Digit" + i);
    }
  }

  public async clearLegalEntityEDRPOUField(): Promise<void> {
    await super.clearValue(legalEntityEDRPOUField);
  }

  public async isLegalEntityEDRPOUFieldCleared(): Promise<void> {
    await super.toHaveValue(legalEntityEDRPOUField, "");
  }

  public async isLegalEntityEDRPOUFieldNotRedHighlighted(): Promise<void> {
    await super.isFieldNotRedHighlighted(legalEntityEDRPOUField);
  }

  public async isLegalEntityEDRPOUFieldRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(legalEntityEDRPOUField);
  }

  public async isLegalEntityEDRPOUFieldErrorMsgDisplayed(
    msg: string,
    i: number
  ): Promise<void> {
    await super.isDisplayed(invalidDataErrorMsg + `[${i}]`);
    await super.toHaveText(invalidDataErrorMsg + `[${i}]`, msg);
  }

  public async checkLegalEntityEDRPOUFieldValueLength(
    length: number
  ): Promise<void> {
    await super.toHaveValueLength(legalEntityEDRPOUField, length);
  }

  public async fillLegalEntityNameField(name: string): Promise<void> {
    await super.setValue(legalEntityNameField, name);
  }

  public async clearLegalEntityNameField(): Promise<void> {
    await super.clearValue(legalEntityNameField);
  }

  public async isLegalEntityNameFieldCleared(): Promise<void> {
    await super.toHaveValue(legalEntityNameField, "");
  }

  public async isLegalEntityNameFieldNotRedHighlighted(): Promise<void> {
    await super.isFieldNotRedHighlighted(legalEntityNameField);
  }

  public async isLegalEntityNameFieldRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(legalEntityNameField);
  }

  public async isLegalEntityNameFieldErrorMsgDisplayed(
    msg: string,
    i: number
  ): Promise<void> {
    await super.isDisplayed(invalidDataErrorMsg + `[${i}]`);
    await super.toHaveText(invalidDataErrorMsg + `[${i}]`, msg);
  }

  public async fillLastNameField(lastName: string, i: number): Promise<void> {
    await super.setValue(lastNameField + `[${i}]`, lastName);
  }

  public async clearLastNameField(i: number): Promise<void> {
    await super.clearValue(lastNameField + `[${i}]`);
  }

  public async isLastNameFieldCleared(i: number): Promise<void> {
    await super.toHaveValue(lastNameField + `[${i}]`, "");
  }

  public async isLastNameFieldNotRedHighlighted(i: number): Promise<void> {
    await super.isFieldNotRedHighlighted(lastNameField + `[${i}]`);
  }

  public async isLastNameFieldRedHighlighted(i: number): Promise<void> {
    await super.isFieldRedHighlighted(lastNameField + `[${i}]`);
  }

  public async isLastNameFieldErrorMsgDisplayed(
    msg: string,
    i: number
  ): Promise<void> {
    await super.isDisplayed(invalidDataErrorMsg + `[${i}]`);
    await super.toHaveText(invalidDataErrorMsg + `[${i}]`, msg);
  }

  public async checkLastNameFieldValueLength(
    length: number,
    i: number
  ): Promise<void> {
    await super.toHaveValueLength(lastNameField + `[${i}]`, length);
  }

  public async fillFirstNameField(firstName: string, i: number): Promise<void> {
    await super.setValue(firstNameField + `[${i}]`, firstName);
  }

  public async clearFirstNameField(i: number): Promise<void> {
    await super.clearValue(firstNameField + `[${i}]`);
  }

  public async isFirstNameFieldCleared(i: number): Promise<void> {
    await super.toHaveValue(firstNameField + `[${i}]`, "");
  }

  public async isFirstNameFieldNotRedHighlighted(i: number): Promise<void> {
    await super.isFieldNotRedHighlighted(firstNameField + `[${i}]`);
  }

  public async isFirstNameFieldRedHighlighted(i: number): Promise<void> {
    await super.isFieldRedHighlighted(firstNameField + `[${i}]`);
  }

  public async isFirstNameFieldErrorMsgDisplayed(
    msg: string,
    i: number
  ): Promise<void> {
    await super.isDisplayed(invalidDataErrorMsg + `[${i}]`);
    await super.toHaveText(invalidDataErrorMsg + `[${i}]`, msg);
  }

  public async checkFirstNameFieldValueLength(
    length: number,
    i: number
  ): Promise<void> {
    await super.toHaveValueLength(firstNameField + `[${i}]`, length);
  }

  public async fillFatherNameField(
    fatherName: string,
    i: number
  ): Promise<void> {
    await super.setValue(fatherNameField + `[${i}]`, fatherName);
  }

  public async clearFatherNameField(i: number): Promise<void> {
    await super.clearValue(fatherNameField + `[${i}]`);
  }

  public async isFatherNameFieldCleared(i: number): Promise<void> {
    await super.toHaveValue(fatherNameField + `[${i}]`, "");
  }

  public async isFatherNameFieldNotRedHighlighted(i: number): Promise<void> {
    await super.isFieldNotRedHighlighted(fatherNameField + `[${i}]`);
  }

  public async isFatherNameFieldRedHighlighted(i: number): Promise<void> {
    await super.isFieldRedHighlighted(fatherNameField + `[${i}]`);
  }

  public async isFatherNameFieldErrorMsgDisplayed(
    msg: string,
    i: number
  ): Promise<void> {
    await super.isDisplayed(invalidDataErrorMsg + `[${i}]`);
    await super.toHaveText(invalidDataErrorMsg + `[${i}]`, msg);
  }

  public async checkFatherNameFieldValueLength(
    length: number,
    i: number
  ): Promise<void> {
    await super.toHaveValueLength(fatherNameField + `[${i}]`, length);
  }

  public async fillCityField(city: string, i: number): Promise<void> {
    await super.setValue(cityField + `[${i}]`, city);
  }

  public async clearCityField(i: number): Promise<void> {
    await super.clearValue(cityField + `[${i}]`);
  }

  public async isCityFieldCleared(i: number): Promise<void> {
    await super.toHaveValue(cityField + `[${i}]`, "");
  }

  public async isCityFieldNotRedHighlighted(i: number): Promise<void> {
    await super.isFieldNotRedHighlighted(cityField + `[${i}]`);
  }

  public async isCityFieldRedHighlighted(i: number): Promise<void> {
    await super.isFieldRedHighlighted(cityField + `[${i}]`);
  }

  public async isCityFieldErrorMsgDisplayed(
    msg: string,
    i: number
  ): Promise<void> {
    await super.isDisplayed(invalidDataErrorMsg + `[${i}]`);
    await super.toHaveText(invalidDataErrorMsg + `[${i}]`, msg);
  }

  public async checkCityFieldValueLength(
    length: number,
    i: number
  ): Promise<void> {
    await super.toHaveValueLength(cityField + `[${i}]`, length);
  }

  public async isCityDropdownListDisplayed(): Promise<void> {
    await super.isDisplayed(cityDropdownList);
  }

  public async selectCityOption(): Promise<void> {
    await super.clickFirst(cityOption);
  }

  public async fillPhoneNumberField(number: string): Promise<void> {
    await super.setValue(phoneNumberField, number);
  }

  public async clearPhoneNumberField(): Promise<void> {
    await super.clearValue(phoneNumberField);
  }

  public async isPhoneNumberFieldCleared(): Promise<void> {
    await super.toHaveValue(phoneNumberField, "");
  }

  public async isPhoneNumberPlusDisplayed(): Promise<void> {
    await super.toHaveValue(phoneNumberField, "+");
  }

  public async isPhoneNumberFieldGreenHighlighted(): Promise<void> {
    await super.isFieldGreenHighlighted(phoneNumberField);
  }

  public async isPhoneNumberFieldNotRedHighlighted(): Promise<void> {
    await super.isFieldNotRedHighlighted(phoneNumberField);
  }

  public async isPhoneNumberFieldRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(phoneNumberField);
  }

  public async isPhoneNumberFieldErrorMsgDisplayed(msg: string): Promise<void> {
    await super.isDisplayed(ivalidPhoneNumberErrorMsg);
    await super.toHaveText(ivalidPhoneNumberErrorMsg, msg);
  }

  public async checkPhoneNumberFieldValueLength(length: number): Promise<void> {
    await super.toHaveValueLengthWithoutSpaces(phoneNumberField, length);
  }

  public async isPhoneNumberFieldValueDisplayed(phone: string): Promise<void> {
    await super.toHaveValueWithoutSpaces(phoneNumberField, phone);
  }

  public async isPhoneNumberFieldVerificationMsgDisplayed(
    msg: string
  ): Promise<void> {
    await super.isDisplayed(successVerificationPhoneNumberMsg);
    await super.toHaveText(successVerificationPhoneNumberMsg, msg);
  }

  public async areVerificationTypeBtnsDisplayed(): Promise<void> {
    await super.isDisplayed(telegramBtn);
    await super.isDisplayed(smsBtn);
  }

  public async areVerificationTypeBtnsEnabled(): Promise<void> {
    await super.isEnabled(telegramBtn);
    await super.isEnabled(smsBtn);
  }

  public async clickTelegramBtn(): Promise<void> {
    await super.click(telegramBtn);
  }

  public async isPhoneNumberChangePopupDisplayed(
    title: string,
    descr: string
  ): Promise<void> {
    await super.isDisplayed(changeProfilePhoneNumberPopup);
    await super.toHaveText(changeProfilePopupTitle, title);
    await super.toHaveText(changeProfilePhoneNumberPopupText, descr);
    await super.isDisplayed(changeProfilePhoneNumberPopupCancelBtn);
    await super.isDisplayed(changeProfilePopupSubmitBtn);
  }

  public async clickPhoneNumberChangePopupCancelBtn(): Promise<void> {
    await super.click(changeProfilePhoneNumberPopupCancelBtn);
  }

  public async clickPhoneNumberChangePopupSubmitBtn(): Promise<void> {
    await super.click(changeProfilePopupSubmitBtn);
  }

  public async isPhoneNumberChangePopupClosed(): Promise<void> {
    await super.isNotDisplayed(changeProfilePopupTitle);
  }

  public async isRedirectToTelegramBotPopupDisplayed(
    title: string
  ): Promise<void> {
    await super.isDisplayed(changeProfilePhoneNumberPopup);
    await super.toHaveText(changeProfilePopupTitle, title);
    await super.isDisplayed(changeProfilePhoneNumberPopupQRInstruction);
    await super.isDisplayed(changeProfilePhoneNumberPopupTelegramBotLink);
  }

  public async clickRedirectToTelegramBotLink(): Promise<void> {
    await super.click(changeProfilePhoneNumberPopupTelegramBotLink);
  }

  public async fillViberField(number: string): Promise<void> {
    await super.setValue(viberField, number);
  }

  public async clearViberField(): Promise<void> {
    await super.clearValue(viberField);
  }

  public async clickViberField(): Promise<void> {
    await super.click(viberField);
  }

  public async isViberFieldCleared(): Promise<void> {
    await super.toHaveValue(viberField, "");
  }

  public async isViberPrefixDisplayed(): Promise<void> {
    await super.toHaveValue(viberField, "+380");
  }

  public async isViberFieldNotRedHighlighted(): Promise<void> {
    await super.isFieldNotRedHighlighted(viberField);
  }

  public async isViberFieldRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(viberField);
  }

  public async isViberFieldErrorMsgDisplayed(msg: string): Promise<void> {
    await super.isDisplayed(ivalidViberPhoneNumberErrorMsg);
    await super.toHaveText(ivalidViberPhoneNumberErrorMsg, msg);
  }

  public async checkViberFieldValueLength(length: number): Promise<void> {
    await super.toHaveValueLengthWithoutSpaces(viberField, length);
  }

  public async fillTelegramField(telegram: string, i: number): Promise<void> {
    await super.setValue(telegramField + `[${i}]`, telegram);
  }

  public async clearTelegramField(i: number): Promise<void> {
    await super.clearValue(telegramField + `[${i}]`);
  }

  public async isTelegramFieldCleared(i: number): Promise<void> {
    await super.toHaveValue(telegramField + `[${i}]`, "");
  }

  public async isTelegramFieldNotRedHighlighted(i: number): Promise<void> {
    await super.isFieldNotRedHighlighted(telegramField + `[${i}]`);
  }

  public async isTelegramFieldRedHighlighted(i: number): Promise<void> {
    await super.isFieldRedHighlighted(telegramField + `[${i}]`);
  }

  public async isTelegramFieldErrorMsgDisplayed(
    msg: string,
    i: number
  ): Promise<void> {
    await super.isDisplayed(invalidDataErrorMsg + `[${i}]`);
    await super.toHaveText(invalidDataErrorMsg + `[${i}]`, msg);
  }

  public async checkTelegramFieldValueLength(
    length: number,
    i: number
  ): Promise<void> {
    await super.toHaveValueLengthWithoutSpaces(
      telegramField + `[${i}]`,
      length
    );
  }

  public async uploadPhoto(path: string): Promise<void> {
    await super.upload(photoUpload, path);
  }

  public async isInvalidPhotoPopupDisplayed(
    title: string,
    descr: string
  ): Promise<void> {
    await super.toHaveText(changeProfilePopupTitle, title);
    await super.toHaveText(invalidProfileImagePopupText, descr);
  }

  public async submitInvalidPhotoPopup(): Promise<void> {
    await super.click(changeProfilePopupSubmitBtn);
  }

  public async closeInvalidPhotoPopup(): Promise<void> {
    await super.click(profilePopupCloseIcon);
  }

  public async isInvalidPhotoPopupClosed(): Promise<void> {
    await super.isNotDisplayed(changeProfilePopupTitle);
    await super.isNotDisplayed(invalidProfileImagePopupText);
  }

  public async isPhotoNotChanged(fileName: string): Promise<void> {
    const value = await super.getAttributeValue(photo, "src");
    await super.stringsContainEqual(value, fileName);
  }

  public async isPhotoChanged(fileName: string): Promise<void> {
    const value = await super.getAttributeValue(photo, "src");
    await super.stringsContainEqual(value, fileName);
  }

  public async isUserPhoneNumberDisplayed(phone: string): Promise<void> {
    await super.isDisplayed(phoneNumberField);
    await super.toHaveValueWithoutSpaces(phoneNumberField, phone);
  }

  public async isUserPhoneNumberVerificated(msg: string): Promise<void> {
    await super.isDisplayed(phoneNumberVerificationMsg);
    await super.toHaveText(phoneNumberVerificationMsg, msg);
  }

  public async checkEmailField(email: string, i: number): Promise<void> {
    await super.isDisplayed(emailField + `[${i}]`);
    await super.toHaveValue(emailField + `[${i}]`, email);
    await super.isDisabled(emailField + `[${i}]`);
  }

  public async isSuccessProfileEditNotificationDisplayed(
    msg: string
  ): Promise<void> {
    await super.isDisplayed(successNotification);
    await super.toHaveText(successNotification, msg);
  }

  public async clickLogoutLink(): Promise<void> {
    await super.click(logoutLink);
    await super.waitForLoad();
  }

  public async tapLogoutLink(): Promise<void> {
    await super.tap(logoutLink);
    await super.waitForTimeout(1000);
  }

  public async tapProfileLink(): Promise<void> {
    await super.tap(mobileProfileBtn);
    await super.waitForTimeout(500);
  }

  public async clickUnitsLink(): Promise<void> {
    await super.click(unitsLink);
  }

  public async clickMyUnitsLink(): Promise<void> {
    await super.click(myUnitsLink);
    await super.waitForLoad();
  }
}

export default ProfilePage;
