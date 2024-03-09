import { Page } from "@playwright/test";
import BasePage from "./base-page";
import { DateTime } from "luxon";

const unitService: string =
  "//div[@itemprop='services']/div[contains(@class, 'UnitCharacteristics_service')]";
const unitCategory: string =
  "//div[contains(@class, 'UnitCharacteristics_characteristics_info')]/span";
const unitTitle: string = "//h1[contains(@class, 'UnitName_name')]";
const searchInputField: string = "//input[@data-testid='searchInput']";
const orderBtn: string =
  "//button[contains(@class, 'ImageWithDescription_orderBtn')]";
const datePickers: string = "//div[@class='react-datepicker']";
const nextMonthBtn: string = "//button[@aria-label='Next Month']";
const dateDay: string =
  "//div[contains(@class, 'react-datepicker__day react-datepicker__day--')]";
const rentalPeriodDateField: string =
  "//div[contains(@class, 'OrderPopup_periodBlock')]";
const orderPopup: string = "//div[contains(@class, 'PopupLayout_content')]";
const orderPopupTitle: string = "//div[contains(@class, 'PopupLayout_label')]";
const orderUnitName: string =
  "//div[contains(@class, 'SimpleUnitCard_infoName')]";
const orderFiles: string = "//div[contains(@class, 'OrderPopup_filesBlock')]";
const orderFilesUpload: string = "//input[@type='file']";
const orderComment: string =
  "//div[contains(@class, 'OrderPopup_description')]//textarea";
const submitBtn: string =
  "//button[contains(@class, 'ItemButtons_lightGreenRoundBtn')]";
const orderPopupDescr: string = "//div[contains(@class, 'InfoPopup_addInfo')]";
const closePopupBtn: string = "//div[@data-testid='closeIcon']";

class UnitPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkUnitURL(): Promise<void> {
    await super.doesPageHaveURL(/unit\/$/);
  }

  public async isUnitServiceDisplayed(serviceName: string): Promise<void> {
    await super.filteredDisplay(unitService, serviceName);
  }

  public async isUnitCategoryDisplayed(categoryName: string): Promise<void> {
    await super.isDisplayed(unitCategory);
    await super.toHaveText(unitCategory, categoryName);
  }

  public async doesUnitTitleHaveText(searchPrompt: string): Promise<void> {
    await super.toContainText(unitTitle, searchPrompt);
  }

  public async clickOrderBtn(): Promise<void> {
    await super.click(orderBtn);
  }

  public async isOrderPopupDisplayed(
    title: string,
    unitName: string
  ): Promise<void> {
    await super.isDisplayed(orderPopup);
    await super.toHaveText(orderPopupTitle, title);
    await super.isDisplayed(rentalPeriodDateField);
    await super.toHaveText(orderUnitName, unitName);
    await super.isDisplayed(orderFiles);
    await super.isDisplayed(orderComment);
    await super.isDisplayed(orderBtn);
  }

  public async isSuccessOrderPopupDisplayed(
    title: string,
    descr: string
  ): Promise<void> {
    await super.isDisplayed(orderPopup);
    await super.toHaveText(orderPopupTitle, title);
    await super.toHaveText(orderPopupDescr, descr);
  }

  public async closeSuccessOrderPopup(): Promise<void> {
    await super.click(closePopupBtn);
  }

  public async areCalendarsDisplayed(): Promise<void> {
    await super.areDisplayed(datePickers);
  }

  public async clickNextMonthBtn(): Promise<void> {
    await super.click(nextMonthBtn);
  }

  public async clickRentalPeriodDateField(): Promise<void> {
    await super.click(rentalPeriodDateField);
  }

  public async selectRentalPeriodDate(daysToAdd: number): Promise<void> {
    await super.filteredClickFirst(dateDay, DateTime.now().day.toString());
    await super.filteredClickFirst(
      dateDay,
      DateTime.now().plus({ days: daysToAdd }).day.toString()
    );
  }

  public async uploadAdditionalFiles(path: string): Promise<void> {
    await super.upload(orderFilesUpload, path);
  }

  public async fillCommentTextarea(text: string): Promise<void> {
    await super.setValue(orderComment, text);
  }

  public async clickSubmitBtn(): Promise<void> {
    await super.click(submitBtn);
  }

  public async clickSearchInputField(): Promise<void> {
    await super.click(searchInputField);
  }

  public async fillSearchInputField(searchPrompt: string): Promise<void> {
    await super.setValue(searchInputField, searchPrompt);
    await super.waitForTimeout(1000);
  }
}

export default UnitPage;
