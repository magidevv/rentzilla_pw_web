import { Page } from "@playwright/test";
import BasePage from "./base-page";
import { DateTime } from "luxon";

const unitService: string =
  "//div[@itemprop='services']/div[contains(@class, 'UnitCharacteristics_service')]";
const unitCategory: string =
  "//div[contains(@class, 'UnitCharacteristics_characteristics_info')]/span";
const unitTitle: string = "//h1[contains(@class, 'UnitName_name')]";
const unitManufacturer: string =
  "(//div[contains(@class, 'UnitCharacteristics_characteristics_info')])[2]";
const unitModelName: string =
  "(//div[contains(@class, 'UnitCharacteristics_characteristics_info')])[3]";
const unitTechCharacteristics: string =
  "(//div[contains(@class, 'UnitCharacteristics_characteristics_info')])[4]";
const unitDetailedDescr: string =
  "//div[contains(@class, 'UnitDescription_content')]/p";
const unitPlace: string =
  "//div[contains(@class, 'UnitPlace_currentPlace')]/span";
const unitImage: string = "//img[@data-testid='mainImage']";
const unitPaymentMethod: string =
  "//div[contains(@class, 'ImageWithDescription_paymentMethod')]";
const unitMinPrice: string =
  "(//div[contains(@class, 'ImageWithDescription_price')])[2]";
  const unitServicePrice: string =
    "//div[contains(@class, 'Terms_service_cost')]/span[1]";
const unitPriceValue: string = "//span[@data-testid='servicePriceValue']";
const searchInputField: string = "//input[@data-testid='searchInput']";
const editBtn: string =
  "//button[contains(@class, 'CurrentUnitButtons_emptyBtn')]";
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

  public async clickEditBtn(): Promise<void> {
    await super.click(editBtn);
  }

  public async clickSearchInputField(): Promise<void> {
    await super.click(searchInputField);
  }

  public async fillSearchInputField(searchPrompt: string): Promise<void> {
    await super.setValue(searchInputField, searchPrompt);
    await super.waitForTimeout(1000);
  }

  public async checkUnitName(name: string): Promise<void> {
    await super.toHaveText(unitTitle, name);
  }

  public async checkUnitManufacturer(manufacturer: string): Promise<void> {
    await super.toHaveText(unitManufacturer, manufacturer);
  }

  public async checkUnitModelName(modelName: string): Promise<void> {
    await super.toHaveText(unitModelName, modelName);
  }

  public async checkUnitTechCharacteristics(
    techCharacteristics: string
  ): Promise<void> {
    await super.toHaveText(unitTechCharacteristics, techCharacteristics);
  }

  public async checkUnitDetailedDescr(detailedDescr: string): Promise<void> {
    await super.toHaveText(unitDetailedDescr, detailedDescr);
  }

  public async checkUnitPlace(place: string): Promise<void> {
    await super.toHaveText(unitPlace, place);
  }

  public async checkUnitImage(fileName: string): Promise<void> {
    const value = await super.getAttributeValue(unitImage, "src");
    await super.stringsContainEqual(value, fileName);
  }

  public async checkUnitService(service: string): Promise<void> {
    await super.toHaveText(unitService, service);
  }

  public async checkUnitPaymentMethod(method: string): Promise<void> {
    await super.toHaveText(unitPaymentMethod, method);
  }

  public async checkUnitMinPrice(price: string): Promise<void> {
    await super.toHaveText(unitMinPrice, price);
  }

  public async checkUnitServicePrice(price: string): Promise<void> {
    await super.toHaveText(unitServicePrice, price);
  }

  public async checkUnitPriceValue(value: string): Promise<void> {
    await super.toContainText(unitPriceValue, value);
  }
}

export default UnitPage;
