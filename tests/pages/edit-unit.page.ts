import { Page } from "@playwright/test";
import BasePage from "./base-page";

const unitCategorySelect: string =
  "//div[contains(@class, 'CategorySelect_button')]";
const unitNameField: string = "(//input[@data-testid='custom-input'])[1]";
const unitManufacturerField: string =
  "//input[@data-testid='input-customSelectWithSearch']";
const unitManufacturerClearBtn: string = "//button[@data-testid='closeButton']";
const unitManufactorerErrorMsg: string =
  "//p[@data-testid='p2-notFound-addNewItem']";
const unitManufacturerListItem: string =
  "//div[@data-testid='item-customSelectWithSearch']";
const unitManufacturerFieldText: string =
  "//div[contains(@class, 'CustomSelectWithSearch_serviceText')]";
const unitModelNameField: string = "(//input[@data-testid='custom-input'])[2]";
const techCharacteristicsTextarea: string =
  "(//textarea[@data-testid='textarea-customTextAriaDescription'])[1]";
const detailedDescrTextarea: string =
  "(//textarea[@data-testid='textarea-customTextAriaDescription'])[2]";
const machineryPlaceField: string = "//label[@data-testid='mapLabel']";
const machineryPlacePopup: string = "//div[contains(@class, 'MapPopup_title')]";
const cityField: string = "//input[@data-testid='cityInput']";
const cityFieldClear: string = "//div[@data-testid='clearSearch']";
const cityFieldDropdown: string = "//ul[@data-testid='places']";
const cityItem: string = "//ul[@data-testid='places']/li";
const machineryPlaceAddress: string = "//div[@data-testid='address']";
const map: string = "#map";
const cancelPlaceBtn: string =
  "//button[contains(@class, 'undefined ItemButtons')]";
const submitPlaceBtn: string =
  "//button[contains(@class, 'ItemButtons_darkBlueBtn')]";
const machineryPlacePopupClose: string =
  "//span[contains(@class, 'MapPopup_icon')]";
const chooseOnMapBtn: string =
  "//button[contains(@class, 'AddressSelectionBlock_locationBtn')]";
const mapZoomInBtn: string = "//a[contains(@class, 'leaflet-control-zoom-in')]";
const mapZoomOutBtn: string =
  "//a[contains(@class, 'leaflet-control-zoom-out')]";
const mainUnitImage: string = "(//img[@data-testid='unitImage'])[1]";
const deleteImageIcon: string = "(//img[@data-testid='unitImage'])[1]";
const photoUpload: string = "//input[@data-testid='input_ImagesUnitFlow']";
const serviceItem: string = "//div[@data-testid='item-servicesUnitFlow']";
const serviceListItem: string =
  "//div[@data-testid='searchItem-servicesUnitFlow']";
const deleteServiceBtn: string =
  "//button[@data-testid='remove-servicesUnitFlow']";
const servicesField: string =
  "//div[contains(@class, 'ServicesUnitFlow')]//input";
const newServiceBtn: string = "//button[@data-testid='btn-addNewItem']";
const paymentMethodSelect: string = "//div[@data-testid='div_CustomSelect']";
const paymentMethodOptions: string = "//li[@data-testid='item-customSelect']";
const paymentMethodOption: string =
  "//div[@data-testid='div_CustomSelect']/span[contains(@class, 'CustomSelect_value')]";
const minPriceField: string =
  "(//input[@data-testid='priceInput_RowUnitPrice'])[1]";
const specificServicePriceAddBtn: string =
  "//button[@data-testid='addPriceButton_ServicePrice']";
const specificServicePriceField: string =
  "(//input[@data-testid='priceInput_RowUnitPrice'])[3]";
const specificServicePriceTimeSelect: string =
  "(//div[@data-testid='div_CustomSelect'])[2]";
const specificServicePriceTimeOptionsList: string =
  "//ul[@data-testid='listItems-customSelect']";
const specificServicePriceTimeOption: string =
  "//li[@data-testid='item-customSelect']";
const specificServicePriceShiftSelect: string =
  "(//div[@data-testid='div_CustomSelect'])[3]";
const specificServicePriceShiftOptionsList: string =
  "//ul[@data-testid='listItems-customSelect']";
const specificServicePriceShiftOption: string =
  "//li[@data-testid='item-customSelect']";
const specificServicePriceDeleteBtn: string =
  "//input[@data-testid='custom-input']";
const fieldErrorMsg: string = "//div[@data-testid='descriptionError']";
const selectErrorMsg: string =
  "//div[contains(@class, 'CustomSelectWithSearch_errorTextVisible')]";
const imgErrorMsg: string = "//div[@data-testid='description']";
const serviceErrorMsg: string = "//div[@data-testid='add-info']";
const newServiceErrorMsg: string = "//p[@data-testid='p2-notFound-addNewItem']";
const minPriceErrorMsg: string =
  "//div[@data-testid='div_required_RowUnitPrice']";
const submitBtn: string = "//button[@data-testid='nextButton']";
const cancelBtn: string = "//button[@data-testid='prevButton']";
const successEditPopupNotification: string =
  "//div[contains(@class, 'NotificationLikePopup_description')]";
const successEditMsg: string =
  "//div[contains(@class, 'SuccessfullyCreatedPage_finishTitle')]";
const seeMyUnitsBtn: string =
  "//button[contains(@class, 'ItemButtons_darkBlueBtn')]";

let fullAddressName: string;

class EditUnitPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkEditUnitURL(): Promise<void> {
    await super.doesPageHaveURL(/\/edit-unit\//);
  }

  public async isUnitCategoryDisplayed(categoryName: string): Promise<void> {
    await super.isDisplayed(unitCategorySelect);
    await super.toHaveText(unitCategorySelect, categoryName);
  }

  public async doesUnitNameHaveText(searchPrompt: string): Promise<void> {
    await super.toContainText(unitNameField, searchPrompt);
  }

  public async clickCancelBtn(): Promise<void> {
    await super.click(cancelBtn);
  }

  public async clickSubmitBtn(): Promise<void> {
    await super.click(submitBtn);
  }

  public async checkSuccessEditMsgsDisplay(
    notification: string,
    msg: string
  ): Promise<void> {
    await super.toHaveText(successEditPopupNotification, notification);
    await super.toHaveText(successEditMsg, msg);
    await super.isDisplayed(seeMyUnitsBtn);
  }

  public async clickSeeMyUnitsBtn(): Promise<void> {
    await super.click(seeMyUnitsBtn);
  }

  public async clearUnitNameField(): Promise<void> {
    await super.clearValue(unitNameField);
  }

  public async checkUnitNameFieldPlaceholder(): Promise<void> {
    await super.doesElementAttrHaveValue(
      unitNameField,
      "placeholder",
      "Введіть назву оголошення"
    );
  }

  public async isFieldErrorMsgDisplayed(error: string): Promise<void> {
    await super.toHaveText(fieldErrorMsg, error);
  }

  public async isFieldErrorMsgNotDisplayed(): Promise<void> {
    await super.isNotDisplayed(fieldErrorMsg);
  }

  public async isSelectErrorMsgDisplayed(error: string): Promise<void> {
    await super.toHaveText(selectErrorMsg, error);
  }

  public async isSelectErrorMsgNotDisplayed(): Promise<void> {
    await super.isNotDisplayed(selectErrorMsg);
  }

  public async fillUnitNameField(name: string): Promise<void> {
    await super.setValue(unitNameField, name);
  }

  public async clickUnitManufacturerClearBtn(): Promise<void> {
    await super.click(unitManufacturerClearBtn);
  }

  public async checkUnitManufacturerFieldPlaceholder(): Promise<void> {
    await super.doesElementAttrHaveValue(
      unitManufacturerField,
      "placeholder",
      "Виберіть виробника транспортного засобу"
    );
  }

  public async fillUnitManufacturerField(name: string): Promise<void> {
    await super.setValue(unitManufacturerField, name);
  }

  public async isUnitManufacturerFieldEmpty(): Promise<void> {
    await super.isEmpty(unitManufacturerField);
  }

  public async isUnitManufacturerErrorMsgDisplayed(
    error: string
  ): Promise<void> {
    await super.toHaveText(unitManufactorerErrorMsg, error);
  }

  public async selectUnitManufacturer(manufacturer: string): Promise<void> {
    await super.filteredClick(unitManufacturerListItem, manufacturer);
  }

  public async checkUnitManufacturerFieldValue(
    manufacturer: string
  ): Promise<void> {
    await super.toHaveText(unitManufacturerFieldText, manufacturer);
  }

  public async isUnitManufacturerClearBtnDisplayed(): Promise<void> {
    await super.isDisplayed(unitManufacturerClearBtn);
  }

  public async clearUnitModelNameField(): Promise<void> {
    await super.clearValue(unitModelNameField);
  }

  public async checkUnitModelNameFieldPlaceholder(): Promise<void> {
    await super.doesElementAttrHaveValue(
      unitModelNameField,
      "placeholder",
      "Введіть назву моделі"
    );
  }

  public async fillUnitModelNameField(name: string): Promise<void> {
    await super.setValue(unitModelNameField, name);
  }

  public async clearTechCharacteristicsTextarea(): Promise<void> {
    await super.clearValue(techCharacteristicsTextarea);
  }

  public async isTechCharacteristicsTextareaEmpty(): Promise<void> {
    await super.isEmpty(techCharacteristicsTextarea);
  }

  public async fillTechCharacteristicsTextarea(name: string): Promise<void> {
    await super.setValue(techCharacteristicsTextarea, name);
  }

  public async clearDetailedDescrTextarea(): Promise<void> {
    await super.clearValue(detailedDescrTextarea);
  }

  public async isDetailedDescrTextareaEmpty(): Promise<void> {
    await super.isEmpty(detailedDescrTextarea);
  }

  public async fillDetailedDescrTextarea(name: string): Promise<void> {
    await super.setValue(detailedDescrTextarea, name);
  }

  public async clickMachineryPlaceField(): Promise<void> {
    await super.click(machineryPlaceField);
  }

  public async isMapPopupDisplayed(): Promise<void> {
    await super.isDisplayed(machineryPlacePopup);
    await super.isDisplayed(cityField);
    await super.isDisplayed(map);
    await super.isDisplayed(machineryPlaceAddress);
    await super.isDisplayed(cancelBtn);
    await super.isDisplayed(submitPlaceBtn);
    await super.isDisplayed(machineryPlacePopupClose);
  }

  public async isMapPopupNotDisplayed(): Promise<void> {
    await super.isNotDisplayed(machineryPlacePopup);
  }

  public async clickCancelPlaceBtn(): Promise<void> {
    await super.click(cancelPlaceBtn);
  }

  public async clickMachineryPlacePopupClose(): Promise<void> {
    await super.click(machineryPlacePopupClose);
  }

  public async isMachineryPlacePopupClosed(): Promise<void> {
    await super.isNotDisplayed(machineryPlacePopup);
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

  public async clickPlaceOnMap(): Promise<void> {
    await super.clickByCoordinates(map, 2.1, 2);
    await super.waitForTimeout(500);
  }

  public async fillCityField(address: string): Promise<void> {
    await super.setValue(cityField, address);
  }

  public async clickSubmitPlaceBtn(): Promise<void> {
    await super.click(submitPlaceBtn);
  }

  public async clearCityField(): Promise<void> {
    await super.waitForTimeout(1000);
    await super.click(cityFieldClear);
  }

  public async isCityFieldCleared(): Promise<void> {
    await super.doesElementAttrHaveValue(cityField, "value", "");
  }

  public async isCityFieldDropdownDisplayed(): Promise<void> {
    await super.waitForTimeout(1000);
    await super.isDisplayed(cityFieldDropdown);
  }

  public async isCityFieldDropdownNotDisplayed(): Promise<void> {
    await super.waitForTimeout(1000);
    await super.isNotDisplayed(cityFieldDropdown);
  }

  public async clickFirstCityItem(): Promise<void> {
    await super.waitForTimeout(1000);
    await super.clickFirst(cityItem);
  }

  public async doesAddressChanged(): Promise<void> {
    await super.notToHaveText(
      machineryPlaceAddress,
      "Київ, вулиця Володимирська 21/20 Україна, Київська область"
    );
  }

  public async isAddressDisplayed(): Promise<void> {
    await super.toContainText(machineryPlaceAddress, "Україна");
    fullAddressName = await super.getText(machineryPlaceAddress);
  }

  public async isEnteredAddressDisplayed(): Promise<void> {
    await super.toHaveText(machineryPlaceField, fullAddressName);
  }

  public async hoverMainUnitImage(): Promise<void> {
    await super.forceHover(deleteImageIcon);
  }

  public async isDeleteImageIconDisplayed(): Promise<void> {
    await super.isDisplayed(deleteImageIcon);
  }

  public async clickDeleteImageIcon(): Promise<void> {
    await super.forceClick(deleteImageIcon);
  }

  public async isMainUnitImageDisplayed(): Promise<void> {
    await super.isDisplayed(mainUnitImage);
  }

  public async isMainUnitImageChanged(fileName: string): Promise<void> {
    const value = await super.getAttributeValue(mainUnitImage, "src");
    await super.stringsContainEqual(value, fileName);
  }

  public async isImgErrorMsgDisplayed(error: string): Promise<void> {
    await super.toHaveText(imgErrorMsg, error);
  }

  public async uploadPhoto(path: string): Promise<void> {
    await super.upload(photoUpload, path);
  }

  public async isServiceItemDisplayed(service: string): Promise<void> {
    await super.toHaveText(serviceItem, service);
  }

  public async clickDeleteServiceBtn(): Promise<void> {
    await super.click(deleteServiceBtn);
  }

  public async isServiceItemNotDisplayed(): Promise<void> {
    await super.isNotDisplayed(serviceItem);
  }

  public async isServiceErrorMsgDisplayed(error: string): Promise<void> {
    await super.toHaveText(serviceErrorMsg, error);
  }

  public async isServicePlaceholderDisplayed(): Promise<void> {
    await super.doesElementAttrHaveValue(
      servicesField,
      "placeholder",
      "Наприклад: Рихлення грунту, буріння"
    );
  }

  public async fillServiceField(service: string): Promise<void> {
    await super.setValue(servicesField, service);
  }

  public async isServiceFieldEmpty(): Promise<void> {
    await super.isEmpty(servicesField);
  }

  public async checkServiceFieldValueLength(length: number): Promise<void> {
    await super.toHaveValueLength(servicesField, length);
  }

  public async isNewServiceErrorMsgDisplayed(error: string): Promise<void> {
    await super.toContainText(newServiceErrorMsg, error);
    await super.isDisplayed(newServiceBtn);
  }

  public async clickNewServiceBtn(): Promise<void> {
    await super.click(newServiceBtn);
  }

  public async isNewServiceDisplayed(service: string): Promise<void> {
    await super.toHaveText(serviceListItem, service);
  }

  public async clickPaymentMethodSelect(): Promise<void> {
    await super.click(paymentMethodSelect);
  }

  public async arePaymentMethodOptionsDisplayed(): Promise<void> {
    await super.toHaveText(
      paymentMethodOptions + "[1]",
      "Готівкою / на картку"
    );
    await super.toHaveText(
      paymentMethodOptions + "[2]",
      "Безготівковий розрахунок (без ПДВ)"
    );
    await super.toHaveText(
      paymentMethodOptions + "[3]",
      "Безготівковий розрахунок (з ПДВ)"
    );
  }

  public async clickPaymentMethodOption(i: number): Promise<void> {
    await super.click(paymentMethodOptions + `[${i}]`);
  }

  public async isSelectedPaymentMethodDisplayed(method: string): Promise<void> {
    await super.toHaveText(paymentMethodOption, method);
  }

  public async clearMinPriceField(): Promise<void> {
    await super.clearValue(minPriceField);
  }

  public async isMinPriceFieldCleared(): Promise<void> {
    await super.doesElementAttrHaveValue(
      minPriceField,
      "placeholder",
      "Наприклад, 1000"
    );
  }

  public async isMinPriceErrorMsgDisplayed(error: string): Promise<void> {
    await super.toHaveText(minPriceErrorMsg, error);
  }

  public async fillMinPriceField(minPrice: string): Promise<void> {
    await super.setValue(minPriceField, minPrice);
  }

  public async checkMinPriceFieldValueLength(length: number): Promise<void> {
    await super.toHaveValueLength(minPriceField, length);
  }

  public async clickSpecificServicePriceAddBtn(): Promise<void> {
    await super.click(specificServicePriceAddBtn);
  }

  public async fillSpecificServicePriceField(price: string): Promise<void> {
    await super.setValue(specificServicePriceField, price);
  }

  public async clickSpecificServicePriceTimeSelect(): Promise<void> {
    await super.click(specificServicePriceTimeSelect);
  }

  public async isSpecificServicePriceTimeOptionsListDisplayed(): Promise<void> {
    await super.isDisplayed(specificServicePriceTimeOptionsList);
  }

  public async isHourOptionSelected(): Promise<void> {
    await super.hover(specificServicePriceTimeOption + "[1]");
    await super.doesElementAttrHaveValue(
      specificServicePriceTimeOption + "[1]",
      "style",
      "background-color: rgba(219, 237, 243, 0.3);"
    );
  }

  public async clickSpecificServicePriceTimeOption(i: number): Promise<void> {
    await super.click(specificServicePriceTimeOption + `[${i}]`);
  }

  public async isSpecificServicePriceTimeOptionDisplayed(
    time: string
  ): Promise<void> {
    await super.toHaveText(specificServicePriceTimeSelect, time);
  }

  public async isSpecificServicePriceShiftSelectDisplayed(): Promise<void> {
    await super.isDisplayed(specificServicePriceShiftSelect);
  }

  public async clickSpecificServicePriceShiftSelect(): Promise<void> {
    await super.click(specificServicePriceShiftSelect);
  }

  public async isSpecificServicePriceShiftOptionsListDisplayed(): Promise<void> {
    await super.isDisplayed(specificServicePriceShiftOptionsList);
  }

  public async isShiftOptionSelected(): Promise<void> {
    await super.hover(specificServicePriceShiftOption + "[1]");
    await super.doesElementAttrHaveValue(
      specificServicePriceShiftOption + "[1]",
      "style",
      "background-color: rgba(219, 237, 243, 0.3);"
    );
  }

  public async clickSpecificServicePriceShiftOption(i: number): Promise<void> {
    await super.click(specificServicePriceShiftOption + `[${i}]`);
  }

  public async isSpecificServicePriceShiftOptionDisplayed(
    shift: string
  ): Promise<void> {
    await super.toHaveText(specificServicePriceShiftSelect, shift);
  }
}

export default EditUnitPage;
