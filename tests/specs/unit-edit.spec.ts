import { test } from "../../fixtures/fixtures";
import path from "path";
import { currentDate } from "../../utils/unit-propose-data";
import messagesData from "../../utils/messages-data.json";
import unitData from "../../utils/unit-data.json";
import editUnitData from "../../utils/edit-unit-data.json";
import {
  paymentMethods,
  timeOptions,
  invalidUnitData,
  validUnitData,
} from "../../utils/unit-data";
import { objectMatch } from "../../utils/object-compare.util";

const data: any = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,

  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
};

const filePath: any = {
  unitImage: path.resolve("data/", "test copy.png"),
};

let unit: { name: string; responseBodyUnit: any };
let newUnitService: string;

test.describe("Unit Edit", () => {
  test.beforeEach(
    async ({ mainPage, headerPage, ownerUnitsPage, apiHelper }) => {
      // Open the «Rentzila» main page
      await mainPage.openMainURL();
      await mainPage.waitForModalAccept();

      // Create the random unit via API
      unit = await apiHelper.createUnit();

      // Check the created unit and approve via API
      await mainPage.toBeTrue(
        await apiHelper.checkUnitResponseResults(unit.responseBodyUnit.id)
      );
      await apiHelper.approveUnit(unit.responseBodyUnit.id);

      // Authorization with user account
      await headerPage.clickHeaderLoginBtn();
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.fillLoginEmailField(data.userEmail);
      await mainPage.fillLoginPasswordField(data.userPassword);
      await mainPage.clickLoginBtn();

      // Check the unit display in "Активні" tab
      await headerPage.clickUserIcon();
      await headerPage.clickMyUnitsLink();
      await ownerUnitsPage.checkOwnerUnitsURL();
      await ownerUnitsPage.isActiveUnitsTabSelected();
      await ownerUnitsPage.fillUnitSearchInput(unit.name);
      await ownerUnitsPage.isActiveUnitDisplayed(unit.name);
    }
  );

  test("C182: Edit Unit without changes", async ({
    ownerUnitsPage,
    editUnitPage,
    apiHelper,
  }) => {
    // Check unit edit cancel
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.clickCancelBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.isActiveUnitsTabSelected();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isActiveUnitDisplayed(unit.name);

    // Check unit edit without changes in "Активні" tab
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.clickSubmitBtn();
    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.resetUnitSearchInput();
    await ownerUnitsPage.checkUnitDisplay(
      unit.name,
      `Оголошення за назвою \"${unit.name}\" не знайдені`,
      messagesData.noActiveUnits
    );

    // Verify unit is not changed and unit is in "Очікуючі" tab
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.checkUnitData(
      unit.name,
      unitData.manufacturer.name,
      unitData.category.name.charAt(0).toUpperCase() +
        unitData.category.name.slice(1),
      currentDate
    );

    // Verify unit is not changed via API
    const userUnit = await apiHelper.getUserUnit(unit.name);
    await ownerUnitsPage.toBeTrue(objectMatch(unitData, userUnit));
  });

  test("C272: Check 'Назва оголошення' input field", async ({
    ownerUnitsPage,
    editUnitPage,
    unitPage,
  }) => {
    // Check 'Назва оголошення' input field
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.clearUnitNameField();
    await editUnitPage.checkUnitNameFieldPlaceholder();
    await editUnitPage.clickSubmitBtn();
    await editUnitPage.isFieldErrorMsgDisplayed(
      messagesData.Errors.emptyRequiredField
    );
    for (const name of invalidUnitData.name[0]) {
      await editUnitPage.fillUnitNameField(name);
      await editUnitPage.checkUnitNameFieldPlaceholder();
    }

    await editUnitPage.fillUnitNameField(invalidUnitData.name[1][0]);
    await editUnitPage.clickSubmitBtn();
    await editUnitPage.isFieldErrorMsgDisplayed(
      messagesData.Errors.Unit.shortName
    );
    await editUnitPage.fillUnitNameField(invalidUnitData.name[1][1]);
    await editUnitPage.clickSubmitBtn();
    await editUnitPage.isFieldErrorMsgDisplayed(
      messagesData.Errors.Unit.longName
    );

    unit.name += validUnitData.name;
    await editUnitPage.fillUnitNameField(unit.name);
    await editUnitPage.isFieldErrorMsgNotDisplayed();
    await editUnitPage.clickSubmitBtn();

    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.resetUnitSearchInput();
    await ownerUnitsPage.checkUnitDisplay(
      unit.name,
      `Оголошення за назвою \"${unit.name}\" не знайдені`,
      messagesData.noActiveUnits
    );

    // Verify unit name is changed and unit is in "Очікуючі" tab
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.clickUnitCard();
    await unitPage.checkUnitURL();
  });

  test("C273: Check 'Виробник транспортного засобу' input field", async ({
    ownerUnitsPage,
    editUnitPage,
    unitPage,
  }) => {
    // Check 'Виробник транспортного засобу' input field
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.clickUnitManufacturerClearBtn();
    await editUnitPage.checkUnitNameFieldPlaceholder();
    await editUnitPage.clickSubmitBtn();
    await editUnitPage.isSelectErrorMsgDisplayed(
      messagesData.Errors.emptyRequiredField
    );

    for (const manufacturer of invalidUnitData.manufacturer[0]) {
      await editUnitPage.fillUnitManufacturerField(manufacturer);
      await editUnitPage.isUnitManufacturerFieldEmpty();
      await editUnitPage.isSelectErrorMsgDisplayed(
        messagesData.Errors.emptyRequiredField
      );
    }

    await editUnitPage.fillUnitManufacturerField(
      invalidUnitData.manufacturer[1][0]
    );
    await editUnitPage.isUnitManufacturerErrorMsgDisplayed(
      messagesData.Errors.Unit.manufacturerNotFound
    );

    await editUnitPage.fillUnitManufacturerField(validUnitData.manufacturer);
    await editUnitPage.selectUnitManufacturer(validUnitData.manufacturer);
    await editUnitPage.isSelectErrorMsgNotDisplayed();
    await editUnitPage.checkUnitManufacturerFieldValue(
      validUnitData.manufacturer
    );
    await editUnitPage.isUnitManufacturerClearBtnDisplayed();
    await editUnitPage.clickSubmitBtn();

    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.resetUnitSearchInput();
    await ownerUnitsPage.checkUnitDisplay(
      unit.name,
      `Оголошення за назвою \"${unit.name}\" не знайдені`,
      messagesData.noActiveUnits
    );

    // Verify unit manufacturer is changed and unit is in "Очікуючі" tab
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.checkUnitManufacturer(validUnitData.manufacturer);
    await ownerUnitsPage.clickUnitCard();
    await unitPage.checkUnitManufacturer(validUnitData.manufacturer);
  });

  test("C532: Check 'Назва моделі' input field", async ({
    ownerUnitsPage,
    editUnitPage,
    unitPage,
  }) => {
    // Check 'Назва моделі' input field
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.clearUnitModelNameField();
    await editUnitPage.checkUnitModelNameFieldPlaceholder();

    for (const modelName of invalidUnitData.modelName[0]) {
      await editUnitPage.fillUnitModelNameField(modelName);
      await editUnitPage.checkUnitModelNameFieldPlaceholder();
    }

    await editUnitPage.fillUnitModelNameField(invalidUnitData.modelName[1][0]);
    await editUnitPage.isFieldErrorMsgDisplayed(
      messagesData.Errors.Unit.longModelName
    );

    await editUnitPage.fillUnitModelNameField(validUnitData.modelName);
    await editUnitPage.clickSubmitBtn();

    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.resetUnitSearchInput();
    await ownerUnitsPage.checkUnitDisplay(
      unit.name,
      `Оголошення за назвою \"${unit.name}\" не знайдені`,
      messagesData.noActiveUnits
    );

    // Verify unit model name is changed and unit is in "Очікуючі" tab
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.clickUnitCard();
    await unitPage.checkUnitModelName(validUnitData.modelName);
  });

  test("C533: Check 'Технічні характеристики' input field", async ({
    ownerUnitsPage,
    editUnitPage,
    unitPage,
  }) => {
    // Check 'Технічні характеристики' input field
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.clearTechCharacteristicsTextarea();
    await editUnitPage.clickSubmitBtn();

    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.resetUnitSearchInput();
    await ownerUnitsPage.checkUnitDisplay(
      unit.name,
      `Оголошення за назвою \"${unit.name}\" не знайдені`,
      messagesData.noActiveUnits
    );
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.clickWaitingEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.isTechCharacteristicsTextareaEmpty();

    for (const techCharacteristics of invalidUnitData.techCharacteristics[0]) {
      await editUnitPage.fillTechCharacteristicsTextarea(techCharacteristics);
      await editUnitPage.isTechCharacteristicsTextareaEmpty();
    }

    await editUnitPage.fillTechCharacteristicsTextarea(
      validUnitData.techCharacteristics
    );
    await editUnitPage.clickSubmitBtn();

    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();

    // Verify unit model name is changed and unit is in "Очікуючі" tab
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.clickUnitCard();
    await unitPage.checkUnitTechCharacteristics(
      validUnitData.techCharacteristics
    );
  });

  test("C534: Check 'Опис' input field", async ({
    ownerUnitsPage,
    editUnitPage,
    unitPage,
  }) => {
    // Check 'Опис' input field
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.clearDetailedDescrTextarea();
    await editUnitPage.clickSubmitBtn();

    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.resetUnitSearchInput();
    await ownerUnitsPage.checkUnitDisplay(
      unit.name,
      `Оголошення за назвою \"${unit.name}\" не знайдені`,
      messagesData.noActiveUnits
    );
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.clickWaitingEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.isDetailedDescrTextareaEmpty();

    for (const detailedDescr of invalidUnitData.detailedDescr[0]) {
      await editUnitPage.fillDetailedDescrTextarea(detailedDescr);
      await editUnitPage.isDetailedDescrTextareaEmpty();
    }

    await editUnitPage.fillDetailedDescrTextarea(validUnitData.detailedDescr);
    await editUnitPage.clickSubmitBtn();

    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();

    // Verify unit description is changed and unit is in "Очікуючі" tab
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.clickUnitCard();
    await unitPage.checkUnitDetailedDescr(validUnitData.detailedDescr);
  });

  test("C535: Check 'Місце розташування технічного засобу' functionality", async ({
    ownerUnitsPage,
    editUnitPage,
    unitPage,
  }) => {
    // Check 'Місце розташування технічного засобу' functionality
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.clickChooseOnMapBtn();
    await editUnitPage.isMapPopupDisplayed();

    await editUnitPage.clickMapZoomInBtn();
    await editUnitPage.clickMapZoomOutBtn();
    await editUnitPage.clickPlaceOnMap();
    await editUnitPage.isAddressDisplayed();
    await editUnitPage.doesAddressChanged();
    await editUnitPage.clickSubmitPlaceBtn();
    await editUnitPage.isEnteredAddressDisplayed();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.isMachineryPlacePopupClosed();
    await editUnitPage.clickSubmitBtn();

    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.resetUnitSearchInput();
    await ownerUnitsPage.checkUnitDisplay(
      unit.name,
      `Оголошення за назвою \"${unit.name}\" не знайдені`,
      messagesData.noActiveUnits
    );

    // Verify unit machinery placement is changed and unit is in "Очікуючі" tab
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.clickUnitCard();
    await unitPage.checkUnitPlace(validUnitData.place);
  });

  test("C274: Image section functionality", async ({
    ownerUnitsPage,
    editUnitPage,
    unitPage,
  }) => {
    // Image section functionality
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();

    await editUnitPage.isMainUnitImageDisplayed();
    await editUnitPage.hoverMainUnitImage();
    await editUnitPage.isDeleteImageIconDisplayed();
    await editUnitPage.clickDeleteImageIcon();
    await editUnitPage.isMainUnitImageChanged(validUnitData.photo);

    await editUnitPage.isMainUnitImageDisplayed();
    await editUnitPage.hoverMainUnitImage();
    await editUnitPage.isDeleteImageIconDisplayed();
    await editUnitPage.clickDeleteImageIcon();
    await editUnitPage.clickSubmitBtn();
    await editUnitPage.isImgErrorMsgDisplayed(
      messagesData.Errors.Unit.emptyPhoto
    );

    await editUnitPage.uploadPhoto(filePath.unitImage);
    await editUnitPage.isMainUnitImageDisplayed();
    await editUnitPage.clickSubmitBtn();

    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.resetUnitSearchInput();
    await ownerUnitsPage.checkUnitDisplay(
      unit.name,
      `Оголошення за назвою \"${unit.name}\" не знайдені`,
      messagesData.noActiveUnits
    );

    // Verify unit machinery placement is changed and unit is in "Очікуючі" tab
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.clickUnitCard();
    await unitPage.checkUnitImage(validUnitData.photo);
  });

  test("C275: Check services functionality", async ({
    ownerUnitsPage,
    editUnitPage,
    unitPage,
    apiHelper,
  }) => {
    // Check services functionality
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.clickDeleteServiceBtn();
    await editUnitPage.isServiceItemNotDisplayed();
    await editUnitPage.clickSubmitBtn();
    await editUnitPage.isServiceErrorMsgDisplayed(
      messagesData.Errors.Unit.emptyService
    );
    await editUnitPage.isServicePlaceholderDisplayed();

    for (const service of invalidUnitData.service[0]) {
      await editUnitPage.fillServiceField(service);
      await editUnitPage.isServiceFieldEmpty();
    }

    await editUnitPage.fillServiceField(invalidUnitData.service[1][0]);
    await editUnitPage.checkServiceFieldValueLength(
      invalidUnitData.service[1][0].length - 1
    );

    newUnitService = unitData.services[0].name + validUnitData.service;
    await editUnitPage.fillServiceField(newUnitService);
    await editUnitPage.isNewServiceErrorMsgDisplayed(
      messagesData.Errors.Unit.serviceNotFound
    );
    await editUnitPage.clickNewServiceBtn();
    await editUnitPage.isNewServiceDisplayed(newUnitService);
    await editUnitPage.isServiceItemDisplayed(newUnitService);
    await editUnitPage.clickSubmitBtn();

    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.resetUnitSearchInput();
    await ownerUnitsPage.checkUnitDisplay(
      unit.name,
      `Оголошення за назвою \"${unit.name}\" не знайдені`,
      messagesData.noActiveUnits
    );

    // Verify unit service is changed and unit is in "Очікуючі" tab
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.clickUnitCard();
    await unitPage.checkUnitService(newUnitService);
  });

  test("C541: Check 'Спосіб оплати' menu", async ({
    ownerUnitsPage,
    editUnitPage,
    unitPage,
  }) => {
    // Check 'Спосіб оплати' menu
    await ownerUnitsPage.clickActiveEditBtn();
    for (let i = 0; i < paymentMethods.length; i++) {
      await editUnitPage.checkEditUnitURL();
      await editUnitPage.clickPaymentMethodSelect();
      await editUnitPage.arePaymentMethodOptionsDisplayed();
      await editUnitPage.clickPaymentMethodOption(i + 1);
      await editUnitPage.isSelectedPaymentMethodDisplayed(paymentMethods[i]);
      await editUnitPage.clickSubmitBtn();

      // await editUnitPage.checkSuccessEditMsgsDisplay(
      //   messagesData.successfulUnitEditToModeration,
      //   messagesData.successfulUnitEdit
      // );
      await editUnitPage.checkSuccessEditMsgDisplay(
        messagesData.successfulUnitEdit
      );
      await editUnitPage.clickSeeMyUnitsBtn();
      await ownerUnitsPage.checkOwnerUnitsURL();
      // await ownerUnitsPage.checkUnitDisplay(
      //   unit.name,
      //   unit.name, messagesData.noActiveUnits
      // );

      // Verify unit payment method is changed and unit is in "Очікуючі" tab
      await ownerUnitsPage.clickWaitingUnitsTab();
      await ownerUnitsPage.fillUnitSearchInput(unit.name);
      await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
      await ownerUnitsPage.clickUnitCard();
      await unitPage.checkUnitPaymentMethod(paymentMethods[i]);

      await unitPage.clickEditBtn();
    }
  });

  test("C276: Check 'Вартість мінімального замовлення' field", async ({
    ownerUnitsPage,
    editUnitPage,
    unitPage,
  }) => {
    // Check 'Вартість мінімального замовлення' field
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.clearMinPriceField();
    await editUnitPage.isMinPriceFieldCleared();
    await editUnitPage.clickSubmitBtn();
    await editUnitPage.isMinPriceErrorMsgDisplayed(
      messagesData.Errors.emptyRequiredField
    );

    for (const price of invalidUnitData.price[0]) {
      await editUnitPage.fillMinPriceField(price);
      await editUnitPage.isMinPriceFieldCleared();
    }

    await editUnitPage.fillMinPriceField(invalidUnitData.price[1][0]);
    await editUnitPage.checkMinPriceFieldValueLength(
      invalidUnitData.price[1][0].length - 1
    );
    await editUnitPage.clickSubmitBtn();

    await editUnitPage.checkSuccessEditMsgsDisplay(
      messagesData.successfulUnitEditToModeration,
      messagesData.successfulUnitEdit
    );
    await editUnitPage.clickSeeMyUnitsBtn();
    await ownerUnitsPage.checkOwnerUnitsURL();
    // await ownerUnitsPage.checkUnitDisplay(
    //   unit.name,
    //   unit.name, messagesData.noActiveUnits
    // );

    // Verify unit minimal price is changed and unit is in "Очікуючі" tab
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.clickUnitCard();
    await unitPage.checkUnitMinPrice(validUnitData.price);
  });

  test("C543: Check 'Вартість мінімального замовлення' drop-down menu", async ({
    ownerUnitsPage,
    editUnitPage,
    unitPage,
  }) => {
    // Check 'Вартість мінімального замовлення' drop-down menu
    await ownerUnitsPage.clickActiveEditBtn();
    await editUnitPage.checkEditUnitURL();
    await editUnitPage.clickSpecificServicePriceAddBtn();
    await editUnitPage.fillSpecificServicePriceField(
      unitData.minimal_price.toString()
    );
    for (let i = 0; i < timeOptions.time.length; i++) {
      await editUnitPage.checkEditUnitURL();
      await editUnitPage.clickSpecificServicePriceTimeSelect();
      await editUnitPage.isSpecificServicePriceTimeOptionsListDisplayed();
      await editUnitPage.isHourOptionSelected();
      await editUnitPage.clickSpecificServicePriceTimeOption(i + 1);
      await editUnitPage.isSpecificServicePriceTimeOptionDisplayed(
        timeOptions.time[i]
      );
      if (i != 1) {
        await editUnitPage.clickSubmitBtn();

        // await editUnitPage.checkSuccessEditNotificationDisplay(
        //   messagesData.successfulUnitEditToModeration
        // );
        await editUnitPage.checkSuccessEditMsgDisplay(
          messagesData.successfulUnitEdit
        );
        await editUnitPage.clickSeeMyUnitsBtn();
        await ownerUnitsPage.checkOwnerUnitsURL();
        // await ownerUnitsPage.checkUnitDisplay(
        //   unit.name,
        //   unit.name, messagesData.noActiveUnits
        // );

        // Verify unit minimal price is changed and unit is in "Очікуючі" tab
        await ownerUnitsPage.clickWaitingUnitsTab();
        await ownerUnitsPage.fillUnitSearchInput(unit.name);
        await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
        await ownerUnitsPage.clickUnitCard();
        await unitPage.refreshPage();
        await unitPage.checkUnitPriceValue(timeOptions.shortTime[i]);

        await unitPage.clickEditBtn();
      } else {
        for (let j = 0; j < timeOptions.shift.length; j++) {
          await editUnitPage.isSpecificServicePriceShiftSelectDisplayed();
          await editUnitPage.clickSpecificServicePriceShiftSelect();
          await editUnitPage.isSpecificServicePriceShiftOptionsListDisplayed();
          await editUnitPage.isShiftOptionSelected();
          await editUnitPage.clickSpecificServicePriceShiftOption(j + 1);
          await editUnitPage.isSpecificServicePriceShiftOptionDisplayed(
            timeOptions.shift[j]
          );
          await editUnitPage.clickSubmitBtn();

          // await editUnitPage.checkSuccessEditNotificationDisplay(
          //   messagesData.successfulUnitEditToModeration
          // );
          await editUnitPage.checkSuccessEditMsgDisplay(
            messagesData.successfulUnitEdit
          );
          await editUnitPage.clickSeeMyUnitsBtn();
          await ownerUnitsPage.checkOwnerUnitsURL();
          // await ownerUnitsPage.checkUnitDisplay(
          //   unit.name,
          //   unit.name, messagesData.noActiveUnits
          // );

          // Verify unit minimal price is changed and unit is in "Очікуючі" tab
          await ownerUnitsPage.clickWaitingUnitsTab();
          await ownerUnitsPage.fillUnitSearchInput(unit.name);
          await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
          await ownerUnitsPage.clickUnitCard();
          await unitPage.checkUnitPriceValue(timeOptions.shift[j]);

          await unitPage.clickEditBtn();
        }
      }
    }
  });

  test("Check Unit Edit via API", async ({
    apiHelper,
    ownerUnitsPage,
    unitPage,
  }) => {
    // Edit the created unit via API
    await apiHelper.editUnit(unit.responseBodyUnit.id, unit.name);
    unit.name += " Edited";

    // Verify unit is changed and unit is in "Очікуючі" tab
    await ownerUnitsPage.refreshPage();
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
    await ownerUnitsPage.checkUnitData(
      unit.name,
      editUnitData.manufacturer.name,
      unitData.category.name.charAt(0).toUpperCase() +
        unitData.category.name.slice(1),
      currentDate
    );

    // Verify unit is changed on unit page
    await ownerUnitsPage.clickUnitCard();
    await unitPage.checkUnitURL();
    await unitPage.checkUnitName(unit.name);
    await unitPage.checkUnitManufacturer(editUnitData.manufacturer.name);
    await unitPage.checkUnitModelName(editUnitData.model_name);
    await unitPage.checkUnitTechCharacteristics(editUnitData.features);
    await unitPage.checkUnitDetailedDescr(editUnitData.description);
    await unitPage.checkUnitPlace("Бровари, Київська область,  Україна");
    await unitPage.checkUnitImage("test_copy_2.png");
    await unitPage.checkUnitService(editUnitData.services[0].name);
    await unitPage.checkUnitPaymentMethod("Безготівковий розрахунок (з ПДВ)");
    await unitPage.checkUnitMinPrice("50 000 грн");
    await unitPage.checkUnitServicePrice("3000");
    await unitPage.checkUnitPriceValue("зміна 8 год.");
  });

  test.afterEach(async ({ apiHelper, mainPage }) => {
    // Delete the created unit via API
    await apiHelper.deleteUnit(unit.responseBodyUnit.id);
    await mainPage.toBeFalse(
      await apiHelper.checkUnitResponseResults(unit.responseBodyUnit.id)
    );

    // Check the created service (then delete)
    if (newUnitService !== "") {
      await mainPage.toBeTrue(
        apiHelper.checkServiceResponseResults(newUnitService)
      );
      await apiHelper.deleteService(newUnitService);
      await mainPage.toBeFalse(
        await apiHelper.checkServiceResponseResults(newUnitService)
      );
    }
  });
});
