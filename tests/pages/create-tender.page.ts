import { Page } from "@playwright/test";
import BasePage from "./base-page";
import { DateTime } from "luxon";

const baseInfoTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][1]";
const baseInfoTitle: string =
  "//div[contains(@class, 'CreateTenderInfo_title')]";
const tenderNameField: string = "(//input[@data-testid='custom-input'])[1]";
const tenderServiceNameField: string =
  "//input[@data-testid='input-customSelectWithSearch']";
const tenderServiceNameFieldBorder: string =
  "//div[contains(@class, 'CustomSelectWithSearch_searchResultError')]";
const tenderServiceListItem: string =
  "//div[@data-testid='item-customSelectWithSearch']";
const tenderServiceNameFieldValue: string =
  "//div[contains(@class, 'CustomSelectWithSearch_serviceText')]";
const tenderCategory: string = "//div[@data-testid='categoryWrapper']";
const tenderServiceClearBtn: string = "//button[@data-testid='closeButton']";
const serviceNotFoundMsg: string = "//p[@data-testid='p2-notFound-addNewItem']";
const createServiceBtn: string = "//button[@data-testid='btn-addNewItem']";
const startDateField: string = "(//div[@data-testid='datePicker'])[1]";
const startDateFieldBorder: string =
  "(//div[contains(@class, 'DateContainer_errorDateWrapper')])[1]";
const datePicker: string = "//div[@class='react-datepicker']";
const endDateField: string = "(//div[@data-testid='datePicker'])[2]";
const endDateFieldBorder: string =
  "//div[contains(@class, 'DateContainer_errorDateWrapper')]";
const nextMonthBtn: string = "//button[@aria-label='Next Month']";
const dateDay: string =
  "//div[contains(@class, 'react-datepicker__day react-datepicker__day--')]";
const dateTime: string =
  "//li[contains(@class, 'react-datepicker__time-list-item ')]";
const workPeriodDateField: string = "(//div[@data-testid='datePicker'])[3]";
const workPeriodDateFieldBorder: string =
  "(//div[contains(@class, 'DateContainer_errorDateWrapper')])[3]";
const budgetAmountField: string = "(//input[@data-testid='custom-input'])[2]";
const workPlaceField: string = "//label[@data-testid='mapLabel']";
const workPlacePopup: string = "//div[contains(@class, 'MapPopup_title')]";
const workCityField: string = "//input[@data-testid='cityInput']";
const workCityFieldClear: string = "//div[@data-testid='clearSearch']";
const workCityFieldDropdown: string = "//ul[@data-testid='places']";
const workCityItem: string = "//ul[@data-testid='places']/li";
const workAddress: string = "//div[@data-testid='address']";
const map: string = "#map";
const cancelBtn: string = "//button[contains(@class, 'undefined ItemButtons')]";
const submitPlaceBtn: string =
  "//button[contains(@class, 'ItemButtons_darkBlueBtn')]";
const workPlacePopupClose: string = "//span[contains(@class, 'MapPopup_icon')]";
const chooseOnMapBtn: string =
  "//button[contains(@class, 'AddressSelectionBlock_locationBtn')]";
const mapZoomInBtn: string = "//a[contains(@class, 'leaflet-control-zoom-in')]";
const mapZoomOutBtn: string =
  "//a[contains(@class, 'leaflet-control-zoom-out')]";
const additionalInfoTextarea: string =
  "//textarea[@data-testid='textAreaInput']";
const additionalInfoTextareaBorder: string =
  "//div[@data-testid='textAreaDiv']";
const prevBtn: string = "//button[@data-testid='prevButton']";
const nextBtn: string = "//button[@data-testid='nextButton']";
const documentationTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][2]";
const documentationTitle: string =
  "//div[contains(@class, 'DocumentsChoosing_title')]";
const documentsUpload: string = "//div[@data-testid='dropDiv']/input";
const documentItem: string =
  "//div[contains(@class, 'DocumentsChoosing_documentsWrapper')]";
const documentItemDeleteBtn: string = "//div[@data-testid='deleteFile']";
const contactsTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][3]";
const userContactsTitle: string =
  "//div[contains(@class, 'AuthContactCard_title')]";
const userName: string = "//div[@data-testid='userName']";
const userInn: string = "//div[@data-testid='inn']";
const userPhoneNumber: string = "//div[@data-testid='paragraphWithIcon'][1]";
const userEmail: string = "//div[@data-testid='paragraphWithIcon'][2]";
const contactPersonTitle: string =
  "//div[contains(@class, 'OperatorCheckbox_title')]";
const contactPersonCheckbox: string =
  "//input[@data-testid='operatorCheckbox']";
const surnameField: string = "//input[@name='fNameOperator']";
const nameField: string = "//input[@name='lNameOperator']";
const phoneNumberField: string = "//input[@data-testid='phone']";
const tenderCreationSubmitPopup: string =
  "//div[contains(@class, 'PopupLayout_content')]";
const tenderCreationSubmitPopupTitle: string =
  "//div[contains(@class, 'PopupLayout_label')]";
const tenderCreationSubmitPopupMsg: string =
  "//div[contains(@class, 'FreezePointsPopup_content')]";
const tenderCreationSubmitPopupCloseBtn: string =
  "//div[@data-testid='closeIcon']";
const tenderCreationSubmitPopupCancelBtn: string =
  "//button[contains(@class, 'ItemButtons_lightRedBtn')]";
const tenderCreationSubmitPopupSubmitBtn: string =
  "//button[contains(@class, 'ItemButtons_darkBlueBtn')]";
const tenderCreationSubmitMsg: string =
  "//div[contains(@class, 'SuccessfullyCreatedPage_finishTitle')]";
const seeInMyTendersBtn: string =
  "//button[contains(@class, 'ItemButtons_darkBlueBtn')]";
const notificationBtn: string = "//div[@data-testid='notificationMenu']";
const notificationItem: string = "//div[@data-testid='contentContent']";
const userPointsBalance: string =
  "//span[contains(@class, 'OwnerBalance_greenText')]";
const tenderNameErrorMsg: string =
  "(//div[@data-testid='descriptionError'])[1]";
const tenderServiceNameErrorMsg: string =
  "//div[contains(@class, 'CustomSelectWithSearch_errorTextVisible')]";
const endDateErrorMsg: string = "(//div[@data-testid='errorMessage'])[2]";
const datePropositionsPeriodErrorMsg: string =
  "(//div[@data-testid='errorMessage'])[3]";
const dateWorkPeriodErrorMsg: string =
  "(//div[@data-testid='errorMessage'])[4]";
const budgetAmountErrorMsg: string =
  "(//div[@data-testid='descriptionError'])[2]";
const workPlaceErrorMsg: string =
  "//div[contains(@class, 'AddressSelectionBlock_errorTextVisible')]";
const additionalInfoErrorMsg: string = "//div[@data-testid='textAreaError']";
const documentsUploadField: string = "//div[@data-testid='dropDiv']";
const documentsUploadErrorMsg: string = "//div[@data-testid='getFileDiv']";
const documentsPopupTitleErrorMsg: string =
  "//div[contains(@class, 'PopupLayout_label')]";
const documentsPopupInfoErrorMsg: string = "//div[@data-testid='errorPopup']";
const documentsPopupSubmitBtn: string =
  "//button[contains(@class, 'ItemButtons_darkBlueBtn')]";
const ownerSurameErrorMsg: string = "(//div[@data-testid='errorDescr'])[1]";
const ownerNameErrorMsg: string = "(//div[@data-testid='errorDescr'])[2]";
const ownerPhoneErrorMsg: string = "//p[@data-testid='errorMessage']";

let firstServiceItemName: string;
let nextDay: number;
let fullAddressName: string;
let currentUserPointsBalance: string;

class CreateTenderPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkCreateTenderURL(): Promise<void> {
    await super.doesPageHaveURL(/create-tender\/$/);
  }

  public async getUserPointsBalance(): Promise<void> {
    currentUserPointsBalance = await super.getText(userPointsBalance);
  }

  public async isBaseInfoTabSelected(): Promise<void> {
    await super.doesElementAttrHaveValue(baseInfoTab, "aria-selected", "true");
  }

  public async areBaseInfoFormElementsDisplayed(): Promise<void> {
    await super.isDisplayed(baseInfoTitle);
    await super.isDisplayed(tenderNameField);
    await super.isDisplayed(tenderServiceNameField);
    await super.isDisplayed(startDateField);
    await super.isDisplayed(endDateField);
    await super.isDisplayed(budgetAmountField);
    await super.isDisplayed(workPlaceField);
    await super.isDisplayed(chooseOnMapBtn);
    await super.isDisplayed(additionalInfoTextarea);
    await super.isDisplayed(prevBtn);
    await super.isDisplayed(nextBtn);
  }

  public async fillTenderNameField(name: string): Promise<void> {
    await super.setValue(tenderNameField, name);
  }

  public async isTenderNameCleared(): Promise<void> {
    await super.doesElementAttrHaveValue(tenderNameField, "value", "");
  }

  public async verifyTenderNameLength(length: number): Promise<void> {
    const value = await super.getInputValue(tenderNameField);
    await super.valuesEqual(value.length, length);
  }

  public async fillTenderServiceNameField(name: string): Promise<void> {
    await super.setValue(tenderServiceNameField, name);
  }

  public async chooseTenderServiceListItem(): Promise<void> {
    await super.areDisplayed(tenderServiceListItem);
    firstServiceItemName = await super.getFirstElText(tenderServiceListItem);
    await super.clickFirst(tenderServiceListItem);
  }

  public async isTenderServiceNameChosen(): Promise<void> {
    await super.toHaveText(tenderServiceNameFieldValue, firstServiceItemName);
  }

  public async isTenderCategoryDisplayed(): Promise<void> {
    await super.isDisplayed(tenderCategory);
  }

  public async clickTenderServiceClearBtn(): Promise<void> {
    await super.click(tenderServiceClearBtn);
  }

  public async isTenderServiceNameCleared(): Promise<void> {
    await super.doesElementAttrHaveValue(tenderServiceNameField, "value", "");
  }

  public async verifyTenderServiceNameLength(length: number): Promise<void> {
    const value = await super.getInputValue(tenderServiceNameField);
    await super.valuesEqual(value.length, length);
  }

  public async isTenderNewServiceMsgDisplayed(msg: string): Promise<void> {
    await super.isDisplayed(serviceNotFoundMsg);
    await super.toContainText(serviceNotFoundMsg, msg);
    await super.isDisplayed(createServiceBtn);
  }

  public async clickTenderServiceCreateBtn(): Promise<void> {
    await super.click(createServiceBtn);
  }

  public async isNewTenderServiceNameEntered(name: string): Promise<void> {
    await super.toHaveText(tenderServiceNameFieldValue, name);
  }

  public async isTenderUserCategoryDisplayed(): Promise<void> {
    await super.isDisplayed(tenderCategory);
    await super.toHaveText(tenderCategory, "Користувацькі");
  }

  public async clickStartDateField(): Promise<void> {
    await super.click(startDateField);
  }

  public async isCalendarDisplayed(): Promise<void> {
    await super.isDisplayed(datePicker);
  }

  public async clickNextMonthBtn(): Promise<void> {
    await super.click(nextMonthBtn);
  }

  public async selectCurrentDay(): Promise<void> {
    await super.filteredClickFirst(dateDay, DateTime.now().day.toString());
  }

  public async selectCurrentTime(): Promise<void> {
    await super.filteredClick(
      dateTime,
      DateTime.now().hour.toString() + ":" + "00"
    );
  }

  public async selectNextDay(daysToAdd: number): Promise<void> {
    nextDay = daysToAdd;
    await super.filteredClickFirst(
      dateDay,
      DateTime.now().plus({ days: daysToAdd }).day.toString()
    );
  }

  public async selectNextTime(hoursToAdd: number): Promise<void> {
    await super.filteredClickLast(
      dateTime,
      DateTime.now().plus({ hours: hoursToAdd }).hour.toString() + ":" + "00"
    );
  }

  public async clickEndDateField(): Promise<void> {
    await super.click(endDateField);
  }

  public async isWorkPeriodDateFieldDisplayed(): Promise<void> {
    await super.isDisplayed(workPeriodDateField);
  }

  public async clickWorkPeriodDateField(): Promise<void> {
    await super.click(workPeriodDateField);
  }

  public async selectWorkPeriodDate(
    daysToAddAfterPropositions: number,
    daysToAddAfterStartWork: number
  ): Promise<void> {
    let startDay = nextDay + daysToAddAfterPropositions;
    await super.filteredClickFirst(
      dateDay,
      DateTime.now().plus({ days: startDay }).day.toString()
    );
    let endDay = startDay + daysToAddAfterStartWork;
    await super.filteredClickFirst(
      dateDay,
      DateTime.now().plus({ days: endDay }).day.toString()
    );
  }

  public async fillBudgetAmountField(amount: string): Promise<void> {
    await super.setValue(budgetAmountField, amount);
  }

  public async isBudgetAmountCleared(): Promise<void> {
    await super.doesElementAttrHaveValue(budgetAmountField, "value", "");
  }

  public async verifyBudgetAmountLength(length: number): Promise<void> {
    const value = await super.getInputValue(budgetAmountField);
    await super.valuesEqual(value.length, length);
  }

  public async clickWorkPlaceField(): Promise<void> {
    await super.click(workPlaceField);
  }

  public async isMapPopupDisplayed(): Promise<void> {
    await super.isDisplayed(workPlacePopup);
    await super.isDisplayed(workCityField);
    await super.isDisplayed(map);
    await super.isDisplayed(workAddress);
    await super.isDisplayed(cancelBtn);
    await super.isDisplayed(submitPlaceBtn);
    await super.isDisplayed(workPlacePopupClose);
  }

  public async isMapPopupNotDisplayed(): Promise<void> {
    await super.isNotDisplayed(workPlacePopup);
  }

  public async clickCancelBtn(): Promise<void> {
    await super.click(cancelBtn);
  }

  public async clickWorkPlacePopupClose(): Promise<void> {
    await super.click(workPlacePopupClose);
  }

  public async clickChooseOnMapBtn(): Promise<void> {
    await super.click(chooseOnMapBtn);
  }

  public async clickMapZoomInBtn(): Promise<void> {
    while (true) {
      const isDisabled = await super.getAttributeValue(
        mapZoomInBtn,
        "aria-disabled"
      );
      if (isDisabled === "true") {
        break;
      }
      await super.click(mapZoomInBtn);
      await super.waitForTimeout(500);
    }
    await super.doesElementAttrHaveValue(mapZoomInBtn, "aria-disabled", "true");
  }

  public async clickMapZoomOutBtn(): Promise<void> {
    while (true) {
      const isDisabled = await super.getAttributeValue(
        mapZoomOutBtn,
        "aria-disabled"
      );
      if (isDisabled === "true") {
        break;
      }
      await super.click(mapZoomOutBtn);
      await super.waitForTimeout(500);
    }
    await super.doesElementAttrHaveValue(
      mapZoomOutBtn,
      "aria-disabled",
      "true"
    );
  }

  public async fillWorkCityField(address: string): Promise<void> {
    await super.setValue(workCityField, address);
  }

  public async clickSubmitPlaceBtn(): Promise<void> {
    await super.click(submitPlaceBtn);
  }

  public async clearWorkCityField(): Promise<void> {
    await super.waitForTimeout(1000);
    await super.click(workCityFieldClear);
  }

  public async isWorkCityFieldCleared(): Promise<void> {
    await super.doesElementAttrHaveValue(workCityField, "value", "");
  }

  public async isWorkCityFieldDropdownDisplayed(): Promise<void> {
    await super.waitForTimeout(1000);
    await super.isDisplayed(workCityFieldDropdown);
  }

  public async isWorkCityFieldDropdownNotDisplayed(): Promise<void> {
    await super.waitForTimeout(1000);
    await super.isNotDisplayed(workCityFieldDropdown);
  }

  public async clickFirstCityItem(): Promise<void> {
    await super.waitForTimeout(1000);
    await super.clickFirst(workCityItem);
  }

  public async isAddressDisplayed(): Promise<void> {
    await super.toContainText(workAddress, "Україна");
    fullAddressName = await super.getText(workAddress);
  }

  public async isEnteredAddressDisplayed(): Promise<void> {
    await super.toHaveText(workPlaceField, fullAddressName);
  }

  public async fillAdditionalInfoTextarea(text: string): Promise<void> {
    await super.setValue(additionalInfoTextarea, text);
  }

  public async isAdditionalInfoTextareaCleared(): Promise<void> {
    await super.isEmpty(additionalInfoTextarea);
  }

  public async clickNextBtn(): Promise<void> {
    await super.click(nextBtn);
  }

  public async isDocumentationTabSelected(): Promise<void> {
    await super.doesElementAttrHaveValue(
      documentationTab,
      "aria-selected",
      "true"
    );
  }

  public async areDocumentationFormElementsDisplayed(): Promise<void> {
    await super.isDisplayed(documentationTitle);
    await super.isDisplayed(prevBtn);
    await super.isDisplayed(nextBtn);
  }

  public async uploadDocumentationFile(path: string): Promise<void> {
    await super.upload(documentsUpload, path);
  }

  public async isDocumentationFileDisplayed(): Promise<void> {
    await super.isDisplayed(documentItem);
    await super.isDisplayed(documentItemDeleteBtn);
  }

  public async isContactsTabSelected(): Promise<void> {
    await super.doesElementAttrHaveValue(contactsTab, "aria-selected", "true");
  }

  public async areContactsFormElementsDisplayed(): Promise<void> {
    await super.isDisplayed(userContactsTitle);
    await super.isDisplayed(userName);
    await super.isDisplayed(userInn);
    await super.isDisplayed(userPhoneNumber);
    await super.isDisplayed(userEmail);
    await super.isDisplayed(contactPersonTitle);
    await super.isDisplayed(contactPersonCheckbox);
    await super.isDisplayed(prevBtn);
    await super.isDisplayed(nextBtn);
  }

  public async checkYourContactsCredentialsForm(
    name: string,
    surname: string,
    inn: string,
    phone: string,
    email: string
  ): Promise<void> {
    await super.toContainText(userName, name);
    await super.toContainText(userName, surname);
    await super.toContainText(userInn, inn);
    await super.toContainText(userPhoneNumber, phone);
    await super.toContainText(userEmail, email);
  }

  public async isContactPersonChecked(): Promise<void> {
    await super.isChecked(contactPersonCheckbox);
  }

  public async isTenderCreationSubmitPopupDisplayed(): Promise<void> {
    await super.isDisplayed(tenderCreationSubmitPopup);
  }

  public async areTenderCreationSubmitPopupElementsDisplayed(): Promise<void> {
    await super.isDisplayed(tenderCreationSubmitPopupTitle);
    await super.isDisplayed(tenderCreationSubmitPopupMsg);
    await super.isDisplayed(tenderCreationSubmitPopupCloseBtn);
    await super.isDisplayed(tenderCreationSubmitPopupCancelBtn);
    await super.isDisplayed(tenderCreationSubmitPopupSubmitBtn);
  }

  public async clickTenderCreationSubmitPopupSubmitBtn(): Promise<void> {
    await super.click(tenderCreationSubmitPopupSubmitBtn);
  }

  public async areTenderCreationMsgDisplayed(): Promise<void> {
    await super.isDisplayed(tenderCreationSubmitMsg);
    await super.isDisplayed(seeInMyTendersBtn);
  }

  public async clickNotificationBtn(): Promise<void> {
    await super.click(notificationBtn);
  }

  public async isNotificationMsgDisplayed(msg: string): Promise<void> {
    await super.isFirstDisplayed(notificationItem);
    await super.doesFirstElHaveText(notificationItem, msg);
  }

  public async isUserPointsBalanceReduced(): Promise<void> {
    await super.toContainText(
      userPointsBalance,
      (parseInt(currentUserPointsBalance) - 10).toString()
    );
  }

  public async clickSeeInMyTendersBtn(): Promise<void> {
    await super.click(seeInMyTendersBtn);
  }

  public async clickDocumentationTab(): Promise<void> {
    await super.click(documentationTab);
  }

  public async clickContactsTab(): Promise<void> {
    await super.click(contactsTab);
  }

  public async checkTenderNameErrorMsg(error: string): Promise<void> {
    await super.toHaveText(tenderNameErrorMsg, error);
    await super.isFieldRedHighlighted(tenderNameField);
  }

  public async checkTenderServiceNameErrorMsg(error: string): Promise<void> {
    await super.toHaveText(tenderServiceNameErrorMsg, error);
    await super.isFieldRedHighlighted(tenderServiceNameFieldBorder);
  }

  public async checkEndDateErrorMsg(error: string): Promise<void> {
    await super.toHaveText(endDateErrorMsg, error);
    await super.isFieldRedHighlighted("(" + endDateFieldBorder + ")[1]");
  }

  public async checkDatePropositionsPeriodErrorMsg(
    error: string
  ): Promise<void> {
    await super.toHaveText(datePropositionsPeriodErrorMsg, error);
    await super.isFieldRedHighlighted(startDateFieldBorder);
    await super.isFieldRedHighlighted("(" + endDateFieldBorder + ")[2]");
  }

  public async checkDateWorkPeriodErrorMsg(error: string): Promise<void> {
    await super.toHaveText(dateWorkPeriodErrorMsg, error);
    await super.isFieldRedHighlighted(workPeriodDateFieldBorder);
  }

  public async checkBudgetAmountErrorMsg(error: string): Promise<void> {
    await super.toHaveText(budgetAmountErrorMsg, error);
    await super.isFieldRedHighlighted(budgetAmountField);
  }

  public async checkWorkPlaceErrorMsg(error: string): Promise<void> {
    await super.toHaveText(workPlaceErrorMsg, error);
    await super.isFieldRedHighlighted(workPlaceField);
  }

  public async checkAdditionalInfoErrorMsg(error: string): Promise<void> {
    let symbolsAmount = await super.getText(additionalInfoTextarea);
    await super.toHaveText(
      additionalInfoErrorMsg,
      error + `(${symbolsAmount.length})`
    );
    await super.isFieldRedHighlighted(additionalInfoTextareaBorder);
  }

  public async checkDocumentsUploadErrorMsg(error: string): Promise<void> {
    await super.toHaveText(documentsUploadErrorMsg, error);
    await super.isFieldRedHighlighted(documentsUploadField);
  }

  public async isDocumentsPopupDisplayed(): Promise<void> {
    await super.isDisplayed(documentsPopupTitleErrorMsg);
    await super.isDisplayed(documentsPopupInfoErrorMsg);
    await super.isDisplayed(documentsPopupSubmitBtn);
  }

  public async checkDocumentsPopupErrorMsg(
    errorTitle: string,
    errorInfo: string
  ): Promise<void> {
    await super.toHaveText(documentsPopupTitleErrorMsg, errorTitle);
    await super.toHaveText(documentsPopupInfoErrorMsg, errorInfo);
  }

  public async clickDocumentsPopupSubmitBtn(): Promise<void> {
    await super.click(documentsPopupSubmitBtn);
  }

  public async clickContactPersonCheckboxBtn(): Promise<void> {
    await super.click(contactPersonCheckbox);
  }

  public async checkOwnerSurameErrorMsg(error: string): Promise<void> {
    await super.toHaveText(ownerSurameErrorMsg, error);
    await super.isFieldRedHighlighted(surnameField);
  }

  public async checkOwnerNameErrorMsg(error: string): Promise<void> {
    await super.toHaveText(ownerNameErrorMsg, error);
    await super.isFieldRedHighlighted(nameField);
  }

  public async checkOwnerPhoneErrorMsg(error: string): Promise<void> {
    await super.toHaveText(ownerPhoneErrorMsg, error);
    await super.isFieldRedHighlighted(phoneNumberField);
  }
}

export default CreateTenderPage;
