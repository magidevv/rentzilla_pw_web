import { test } from "../../fixtures/fixtures";
import { validTenderData, invalidTenderData } from "../../utils/tender-data";
import messagesData from "../../utils/messages-data.json";
import userData from "../../utils/user-data.json";
import path from "path";

const data: any = {
  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
  userPhone: process.env.USER_PHONE,
};

const filePath: any = {
  tenderImage: path.resolve("data/", "test.png"),
  largeSizeFile: path.resolve("data/", "largeSize.zip"),
  invalidFormatFile: path.resolve("data/", "invalidFormat.gif"),
  tenderImageFirstCopy: path.resolve("data/", "test copy.png"),
  tenderImageSecondCopy: path.resolve("data/", "test copy 2.png"),
  tenderImageThirdCopy: path.resolve("data/", "test copy 3.png"),
  tenderImageFourthCopy: path.resolve("data/", "test copy 4.png"),
  tenderImageFifthCopy: path.resolve("data/", "test copy 5.png"),
};

test.describe("Tender Creation", () => {
  test.beforeEach(async ({ mainPage, headerPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();

    // Click on the "Вхід" button
    await headerPage.clickHeaderLoginBtn();

    // Authorization with user account
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.fillLoginEmailField(data.userEmail);
    await mainPage.fillLoginPasswordField(data.userPassword);
    await mainPage.clickLoginBtn();
  });

  test("Tender creation w/ valid data as an owner", async ({
    headerPage,
    ownerTendersPage,
    createTenderPage,
    apiHelper,
  }) => {
    // Open the Create Tender Page
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.clickCreateTenderBtn();
    await createTenderPage.checkCreateTenderURL();

    // Check the Base Information Tab
    await createTenderPage.isBaseInfoTabSelected();
    await createTenderPage.areBaseInfoFormElementsDisplayed();

    await createTenderPage.getUserPointsBalance();

    await createTenderPage.fillTenderNameField(validTenderData.name);

    await createTenderPage.fillTenderServiceNameField(
      validTenderData.newServiceName
    );
    await createTenderPage.isTenderNewServiceMsgDisplayed(
      messagesData.Errors.Tender.serviceNotFound
    );
    await createTenderPage.clickTenderServiceCreateBtn();
    await createTenderPage.isNewTenderServiceNameEntered(
      validTenderData.newServiceName
    );
    await createTenderPage.isTenderUserCategoryDisplayed();
    await createTenderPage.clickTenderServiceClearBtn();
    await createTenderPage.isTenderServiceNameCleared();

    await createTenderPage.fillTenderServiceNameField(
      validTenderData.serviceName
    );
    await createTenderPage.chooseTenderServiceListItem();
    await createTenderPage.isTenderServiceNameChosen();
    await createTenderPage.isTenderCategoryDisplayed();

    // Check the created service (then delete)
    await ownerTendersPage.toBeTrue(
      await apiHelper.checkServiceResponseResults(
        validTenderData.newServiceName
      )
    );
    await apiHelper.deleteService(validTenderData.newServiceName);
    await ownerTendersPage.toBeFalse(
      await apiHelper.checkServiceResponseResults(
        validTenderData.newServiceName
      )
    );

    await createTenderPage.clickStartDateField();
    await createTenderPage.isCalendarDisplayed();
    await createTenderPage.selectCurrentDay();
    await createTenderPage.selectCurrentTime();

    await createTenderPage.clickEndDateField();
    await createTenderPage.isCalendarDisplayed();
    await createTenderPage.selectNextDay(2);
    await createTenderPage.selectNextTime(1);

    await createTenderPage.clickWorkPeriodDateField();
    await createTenderPage.isCalendarDisplayed();
    await createTenderPage.clickNextMonthBtn();
    await createTenderPage.selectWorkPeriodDate(3, 4);

    await createTenderPage.fillBudgetAmountField(validTenderData.budgetAmount);

    await createTenderPage.clickWorkPlaceField();
    await createTenderPage.isMapPopupDisplayed();
    await createTenderPage.clickCancelBtn();
    await createTenderPage.isMapPopupNotDisplayed();
    await createTenderPage.clickWorkPlaceField();
    await createTenderPage.clickWorkPlacePopupClose();
    await createTenderPage.isMapPopupNotDisplayed();
    await createTenderPage.clickChooseOnMapBtn();
    await createTenderPage.clickMapZoomInBtn();
    await createTenderPage.clickMapZoomOutBtn();
    await createTenderPage.fillWorkCityField(validTenderData.workAddress);
    await createTenderPage.clearWorkCityField();
    await createTenderPage.isWorkCityFieldCleared();
    await createTenderPage.fillWorkCityField(validTenderData.workAddress);
    await createTenderPage.isWorkCityFieldDropdownDisplayed();
    await createTenderPage.clickFirstCityItem();
    await createTenderPage.isAddressDisplayed();
    await createTenderPage.clickSubmitPlaceBtn();
    await createTenderPage.isEnteredAddressDisplayed();

    await createTenderPage.fillAdditionalInfoTextarea(
      validTenderData.additionalInfo
    );
    await createTenderPage.clickNextBtn();

    // Check the Documentation Tab
    await createTenderPage.isDocumentationTabSelected();
    await createTenderPage.areDocumentationFormElementsDisplayed();
    await createTenderPage.uploadDocumentationFile(filePath.tenderImage);
    await createTenderPage.isDocumentationFileDisplayed();
    await createTenderPage.clickNextBtn();

    // Check the Contacts Tab
    await createTenderPage.isContactsTabSelected();
    await createTenderPage.areContactsFormElementsDisplayed();
    await createTenderPage.checkYourContactsCredentialsForm(
      userData.name,
      userData.surname,
      userData.inn,
      data.userPhone,
      data.userEmail
    );

    await createTenderPage.isContactPersonChecked();
    await createTenderPage.clickNextBtn();

    // Check the tender creation message
    await createTenderPage.isTenderCreationSubmitPopupDisplayed();
    await createTenderPage.areTenderCreationSubmitPopupElementsDisplayed();
    await createTenderPage.clickTenderCreationSubmitPopupSubmitBtn();
    await createTenderPage.areTenderCreationMsgDisplayed();
    // await createTenderPage.clickNotificationBtn();
    // await createTenderPage.isNotificationMsgDisplayed(
    //   messagesData.successfulTenderCreation
    // );
    await createTenderPage.isUserPointsBalanceReduced();
    await createTenderPage.clickSeeInMyTendersBtn();

    // Check the created tender display
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.isWaitingTabSelected();
    await ownerTendersPage.fillTenderSearchInput(validTenderData.name);
    await ownerTendersPage.isWaitingTenderDisplayed(validTenderData.name);
  });

  test.afterEach(async ({ apiHelper, ownerTendersPage }) => {
    // Check the created tender (then delete)
    const tenderExists = await apiHelper.checkTenderResponseResults(
      validTenderData.name
    );
    if (tenderExists) {
      await apiHelper.deleteTender(validTenderData.name);
      await ownerTendersPage.toBeFalse(
        await apiHelper.checkTenderResponseResults(validTenderData.name)
      );
    }
  });

  test("Tender creation w/ invalid data", async ({
    headerPage,
    ownerTendersPage,
    createTenderPage,
  }) => {
    // Open the Create Tender Page
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.clickCreateTenderBtn();
    await createTenderPage.checkCreateTenderURL();

    await createTenderPage.fillTenderNameField(invalidTenderData.name[0]);
    await createTenderPage.isTenderNameCleared();

    await createTenderPage.fillTenderNameField(invalidTenderData.name[1]);
    await createTenderPage.verifyTenderNameLength(70);

    await createTenderPage.fillTenderNameField(invalidTenderData.name[2]);

    await createTenderPage.fillTenderServiceNameField(
      invalidTenderData.serviceName[0]
    );
    await createTenderPage.isTenderServiceNameCleared();

    await createTenderPage.fillTenderServiceNameField(
      invalidTenderData.serviceName[1]
    );
    await createTenderPage.verifyTenderServiceNameLength(100);

    await createTenderPage.clickStartDateField();
    await createTenderPage.isCalendarDisplayed();
    await createTenderPage.selectCurrentDay();
    await createTenderPage.selectCurrentTime();

    await createTenderPage.clickEndDateField();
    await createTenderPage.isCalendarDisplayed();
    await createTenderPage.selectNextDay(1);
    await createTenderPage.selectNextTime(1);

    for (let i = 0; i < 4; i++) {
      await createTenderPage.fillBudgetAmountField(
        invalidTenderData.budgetAmount[i]
      );
      await createTenderPage.isBudgetAmountCleared();
    }

    await createTenderPage.fillBudgetAmountField(
      invalidTenderData.budgetAmount[4]
    );
    await createTenderPage.verifyBudgetAmountLength(9);

    await createTenderPage.clickWorkPlaceField();
    await createTenderPage.fillWorkCityField(invalidTenderData.workAddress[0]);
    await createTenderPage.isWorkCityFieldDropdownNotDisplayed();
    await createTenderPage.isAddressDisplayed();
    await createTenderPage.clickSubmitPlaceBtn();
    await createTenderPage.isEnteredAddressDisplayed();

    await createTenderPage.fillAdditionalInfoTextarea(
      invalidTenderData.additionalInfo[0]
    );
    await createTenderPage.isAdditionalInfoTextareaCleared();
    await createTenderPage.fillAdditionalInfoTextarea(
      invalidTenderData.additionalInfo[1]
    );

    await createTenderPage.clickNextBtn();
    await createTenderPage.checkTenderNameErrorMsg(
      messagesData.Errors.Tender.shortName
    );
    await createTenderPage.checkDatePropositionsPeriodErrorMsg(
      messagesData.Errors.Tender.invalidDatePeriod
    );
    await createTenderPage.checkAdditionalInfoErrorMsg(
      messagesData.Errors.Tender.shortAdditionalInfo
    );

    await createTenderPage.clickDocumentationTab();
    await createTenderPage.uploadDocumentationFile(filePath.invalidFormatFile);
    await createTenderPage.isDocumentsPopupDisplayed();
    await createTenderPage.checkDocumentsPopupErrorMsg(
      messagesData.Errors.Tender.invalidFile.title,
      messagesData.Errors.Tender.invalidFile.invalidFormatOrSize
    );
    await createTenderPage.clickDocumentsPopupSubmitBtn();

    await createTenderPage.uploadDocumentationFile(filePath.largeSizeFile);
    await createTenderPage.isDocumentsPopupDisplayed();
    await createTenderPage.checkDocumentsPopupErrorMsg(
      messagesData.Errors.Tender.invalidFile.title,
      messagesData.Errors.Tender.invalidFile.invalidFormatOrSize
    );
    await createTenderPage.clickDocumentsPopupSubmitBtn();

    await createTenderPage.uploadDocumentationFile(filePath.tenderImage);
    await createTenderPage.uploadDocumentationFile(filePath.tenderImage);
    await createTenderPage.isDocumentsPopupDisplayed();
    await createTenderPage.checkDocumentsPopupErrorMsg(
      messagesData.Errors.Tender.invalidFile.title,
      messagesData.Errors.Tender.invalidFile.uploadedTwice
    );
    await createTenderPage.clickDocumentsPopupSubmitBtn();

    await createTenderPage.uploadDocumentationFile(
      filePath.tenderImageFirstCopy
    );
    await createTenderPage.uploadDocumentationFile(
      filePath.tenderImageSecondCopy
    );
    await createTenderPage.uploadDocumentationFile(
      filePath.tenderImageThirdCopy
    );
    await createTenderPage.uploadDocumentationFile(
      filePath.tenderImageFourthCopy
    );
    await createTenderPage.uploadDocumentationFile(
      filePath.tenderImageFifthCopy
    );
    await createTenderPage.isDocumentsPopupDisplayed();
    await createTenderPage.checkDocumentsPopupErrorMsg(
      messagesData.Errors.Tender.invalidFile.title,
      messagesData.Errors.Tender.invalidFile.maxQTY
    );
    await createTenderPage.clickDocumentsPopupSubmitBtn();

    await createTenderPage.clickContactsTab();
    await createTenderPage.clickNextBtn();

    await createTenderPage.isBaseInfoTabSelected();
    await createTenderPage.checkTenderNameErrorMsg(
      messagesData.Errors.Tender.shortName
    );
    await createTenderPage.checkAdditionalInfoErrorMsg(
      messagesData.Errors.Tender.shortAdditionalInfo
    );
  });

  test("Tender creation w/ empty required fields", async ({
    headerPage,
    ownerTendersPage,
    createTenderPage,
  }) => {
    // Open the Create Tender Page
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.clickCreateTenderBtn();
    await createTenderPage.checkCreateTenderURL();

    await createTenderPage.clickNextBtn();
    await createTenderPage.checkTenderNameErrorMsg(
      messagesData.Errors.Tender.shortName
    );
    await createTenderPage.checkTenderServiceNameErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await createTenderPage.checkEndDateErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await createTenderPage.checkBudgetAmountErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await createTenderPage.checkWorkPlaceErrorMsg(
      messagesData.Errors.Tender.invalidMapPlace
    );
    await createTenderPage.checkAdditionalInfoErrorMsg(
      messagesData.Errors.Tender.shortAdditionalInfo
    );

    await createTenderPage.clickEndDateField();
    await createTenderPage.isCalendarDisplayed();
    await createTenderPage.selectNextDay(1);
    await createTenderPage.selectNextTime(0);

    await createTenderPage.checkDatePropositionsPeriodErrorMsg(
      messagesData.Errors.Tender.invalidDatePeriod
    );

    await createTenderPage.checkDateWorkPeriodErrorMsg(
      messagesData.Errors.emptyRequiredField
    );

    await createTenderPage.clickDocumentationTab();
    await createTenderPage.clickNextBtn();
    await createTenderPage.checkDocumentsUploadErrorMsg(
      messagesData.Errors.Tender.emptyDocs
    );

    await createTenderPage.clickContactsTab();
    await createTenderPage.clickContactPersonCheckboxBtn();
    await createTenderPage.checkOwnerSurameErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await createTenderPage.checkOwnerNameErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await createTenderPage.checkOwnerPhoneErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await createTenderPage.clickNextBtn();

    await createTenderPage.isBaseInfoTabSelected();
    await createTenderPage.checkTenderNameErrorMsg(
      messagesData.Errors.Tender.shortName
    );
    await createTenderPage.checkTenderServiceNameErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await createTenderPage.checkBudgetAmountErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await createTenderPage.checkWorkPlaceErrorMsg(
      messagesData.Errors.Tender.invalidMapPlace
    );
    await createTenderPage.checkAdditionalInfoErrorMsg(
      messagesData.Errors.Tender.shortAdditionalInfo
    );
    await createTenderPage.checkDatePropositionsPeriodErrorMsg(
      messagesData.Errors.Tender.invalidDatePeriod
    );
    await createTenderPage.checkDateWorkPeriodErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
  });
});
