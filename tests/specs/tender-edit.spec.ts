import { test } from "../../fixtures/fixtures";
import path from "path";
import messagesData from "../../utils/messages-data.json";
import editTenderData from "../../utils/edit-tender-data.json";
import { restrictedSymbols } from "../../utils/tender-data";
import { invalidTenderData, validTenderData } from "../../utils/tender-data";
import { datePeriod } from "../../utils/tender-data";
import { objectMatch } from "../../utils/object-compare.util";

const data: any = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,

  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
};

const filePath: any = {
  tenderImage: path.resolve("data/", "test copy.png"),
};

let tenderName: string;

test.describe("Tender Edit", () => {
  test.beforeEach(
    async ({ mainPage, headerPage, apiHelper }) => {
      // Open the «Rentzila» main page
      await mainPage.openMainURL();
      await mainPage.waitForModalAccept();

      // Create the random tender via API
      tenderName = await apiHelper.createTender();

      // Check the created tender via API
      await mainPage.toBeTrue(
        await apiHelper.checkTenderResponseResults(tenderName)
      );

      // Authorization with user account
      await headerPage.clickHeaderLoginBtn();
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.fillLoginEmailField(data.userEmail);
      await mainPage.fillLoginPasswordField(data.userPassword);
      await mainPage.clickLoginBtn();
    }
  );

  test("C240: Edit the tender with empty/invalid input fields (another contact person)", async ({
    ownerTendersPage,
    editTenderPage,
    apiHelper,
    headerPage,
  }) => {
    // Approve the created tender via API
    await apiHelper.approveTender(tenderName);

    // Check the tender display in "Активні" tab
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.isActiveTendersTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tenderName);
    await ownerTendersPage.isActiveTenderDisplayed(tenderName);

    // Check "Назва тендеру" field
    await ownerTendersPage.clickEditBtn();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.areBaseInfoFormElementsDisplayed();
    await editTenderPage.clearTenderNameField();
    await editTenderPage.clickNextBtn();
    await editTenderPage.isTenderNameEmpty();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkTenderNameErrorMsg(
      messagesData.Errors.Tender.shortName
    );
    await editTenderPage.fillTenderNameField(invalidTenderData.name[2]);
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkTenderNameErrorMsg(
      messagesData.Errors.Tender.shortName
    );
    for (const symbol of restrictedSymbols) {
      await editTenderPage.fillTenderNameField(symbol);
      await editTenderPage.isTenderNameEmpty();
    }
    await editTenderPage.fillTenderNameField(invalidTenderData.name[1]);
    await editTenderPage.verifyTenderNameLength(
      invalidTenderData.name[1].length - 1
    );
    await editTenderPage.fillTenderNameField(validTenderData.name);

    await editTenderPage.clickTenderServiceClearBtn();
    await editTenderPage.isTenderServiceNameCleared();
    await editTenderPage.checkTenderServiceNameErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await editTenderPage.fillTenderServiceNameField(
      validTenderData.serviceName
    );
    await editTenderPage.chooseTenderServiceListItem();
    await editTenderPage.isTenderServiceNameChosen();
    await editTenderPage.clickTenderServiceClearBtn();
    await editTenderPage.fillTenderServiceNameField(
      editTenderData.services[0].name
    );
    await editTenderPage.chooseTenderServiceListItem();
    await editTenderPage.isTenderServiceNameChosen();

    await editTenderPage.isStartDateFieldDisabled();
    await editTenderPage.isEndDateFieldDisabled();
    await editTenderPage.isWorkPeriodDateFieldDisabled();

    await editTenderPage.clearBudgetAmountField();
    await editTenderPage.clickNextBtn();
    await editTenderPage.isBudgetAmountCleared();
    await editTenderPage.checkBudgetAmountErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await editTenderPage.fillBudgetAmountField(
      invalidTenderData.budgetAmount[1]
    );
    await editTenderPage.isBudgetAmountCleared();
    await editTenderPage.checkBudgetAmountErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    for (const symbol of restrictedSymbols) {
      await editTenderPage.fillBudgetAmountField(symbol);
      await editTenderPage.isBudgetAmountCleared();
    }
    await editTenderPage.fillBudgetAmountField(
      invalidTenderData.budgetAmount[4]
    );
    await editTenderPage.verifyBudgetAmountLength(
      invalidTenderData.budgetAmount[4].length - 1
    );
    await editTenderPage.fillBudgetAmountField(
      editTenderData.start_price.toString()
    );

    await editTenderPage.clearAdditionalInfoTextarea();
    await editTenderPage.clickNextBtn();
    await editTenderPage.isAdditionalInfoTextareaCleared();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkAdditionalInfoErrorMsg(
      messagesData.Errors.Tender.shortAdditionalInfo
    );
    await editTenderPage.fillAdditionalInfoTextarea(
      invalidTenderData.additionalInfo[1]
    );
    await editTenderPage.clickNextBtn();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkAdditionalInfoErrorMsg(
      messagesData.Errors.Tender.shortAdditionalInfo
    );
    for (const symbol of restrictedSymbols) {
      await editTenderPage.fillAdditionalInfoTextarea(symbol);
      await editTenderPage.isAdditionalInfoTextareaCleared();
    }
    await editTenderPage.fillAdditionalInfoTextarea(editTenderData.description);

    await editTenderPage.deleteDocumentationFile();
    await editTenderPage.isDocumentationFileNotDisplayed();
    await editTenderPage.checkDocumentsUploadErrorMsg(
      messagesData.Errors.Tender.emptyDocs
    );
    await editTenderPage.uploadDocumentationFile(filePath.tenderImage);

    await editTenderPage.clickNextBtn();
    tenderName = validTenderData.name;
    await editTenderPage.areTenderCreationMsgDisplayed();
    await editTenderPage.clickSeeInMyTendersBtn();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.isWaitingTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tenderName);
    await ownerTendersPage.isWaitingTenderDisplayed(tenderName);
    await ownerTendersPage.checkTenderData(
      tenderName,
      editTenderData.services[0].name,
      datePeriod(),
      "Київ, Київська область, Україна",
      editTenderData.start_price.toString()
    );
  });

  test("C237: Edit the pending tender with valid values (default contact person)", async ({
    ownerTendersPage,
    editTenderPage,
    headerPage,
  }) => {
    // Check the tender display in "Очікуючі" tab
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.clickWaitingTab();
    await ownerTendersPage.isWaitingTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tenderName);
    await ownerTendersPage.isWaitingTenderDisplayed(tenderName);

    // Check "Назва тендеру" field
    await ownerTendersPage.clickEditBtn();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.areBaseInfoFormElementsDisplayed();
    await editTenderPage.clearTenderNameField();
    await editTenderPage.clickNextBtn();
    await editTenderPage.isTenderNameEmpty();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkTenderNameErrorMsg(
      messagesData.Errors.Tender.shortName
    );
    await editTenderPage.fillTenderNameField(invalidTenderData.name[2]);
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkTenderNameErrorMsg(
      messagesData.Errors.Tender.shortName
    );
    for (const symbol of restrictedSymbols) {
      await editTenderPage.fillTenderNameField(symbol);
      await editTenderPage.isTenderNameEmpty();
    }
    await editTenderPage.fillTenderNameField(invalidTenderData.name[1]);
    await editTenderPage.verifyTenderNameLength(
      invalidTenderData.name[1].length - 1
    );
    await editTenderPage.fillTenderNameField(validTenderData.name);

    await editTenderPage.clickTenderServiceClearBtn();
    await editTenderPage.isTenderServiceNameCleared();
    await editTenderPage.checkTenderServiceNameErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await editTenderPage.fillTenderServiceNameField(
      validTenderData.serviceName
    );
    await editTenderPage.chooseTenderServiceListItem();
    await editTenderPage.isTenderServiceNameChosen();
    await editTenderPage.clickTenderServiceClearBtn();
    await editTenderPage.fillTenderServiceNameField(
      editTenderData.services[0].name
    );
    await editTenderPage.chooseTenderServiceListItem();
    await editTenderPage.isTenderServiceNameChosen();

    await editTenderPage.isStartDateFieldDisabled();
    await editTenderPage.isEndDateFieldDisabled();
    await editTenderPage.isWorkPeriodDateFieldDisabled();

    await editTenderPage.clearBudgetAmountField();
    await editTenderPage.clickNextBtn();
    await editTenderPage.isBudgetAmountCleared();
    await editTenderPage.checkBudgetAmountErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await editTenderPage.fillBudgetAmountField(
      invalidTenderData.budgetAmount[1]
    );
    await editTenderPage.isBudgetAmountCleared();
    await editTenderPage.checkBudgetAmountErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    for (const symbol of restrictedSymbols) {
      await editTenderPage.fillBudgetAmountField(symbol);
      await editTenderPage.isBudgetAmountCleared();
    }
    await editTenderPage.fillBudgetAmountField(
      invalidTenderData.budgetAmount[4]
    );
    await editTenderPage.verifyBudgetAmountLength(
      invalidTenderData.budgetAmount[4].length - 1
    );
    await editTenderPage.fillBudgetAmountField(
      editTenderData.start_price.toString()
    );

    await editTenderPage.clearAdditionalInfoTextarea();
    await editTenderPage.clickNextBtn();
    await editTenderPage.isAdditionalInfoTextareaCleared();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkAdditionalInfoErrorMsg(
      messagesData.Errors.Tender.shortAdditionalInfo
    );
    await editTenderPage.fillAdditionalInfoTextarea(
      invalidTenderData.additionalInfo[1]
    );
    await editTenderPage.clickNextBtn();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkAdditionalInfoErrorMsg(
      messagesData.Errors.Tender.shortAdditionalInfo
    );
    for (const symbol of restrictedSymbols) {
      await editTenderPage.fillAdditionalInfoTextarea(symbol);
      await editTenderPage.isAdditionalInfoTextareaCleared();
    }
    await editTenderPage.fillAdditionalInfoTextarea(editTenderData.description);

    await editTenderPage.deleteDocumentationFile();
    await editTenderPage.isDocumentationFileNotDisplayed();
    await editTenderPage.checkDocumentsUploadErrorMsg(
      messagesData.Errors.Tender.emptyDocs
    );
    await editTenderPage.uploadDocumentationFile(filePath.tenderImage);

    await editTenderPage.clickNextBtn();
    tenderName = validTenderData.name;
    await editTenderPage.areTenderCreationMsgDisplayed();
    await editTenderPage.clickSeeInMyTendersBtn();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.isWaitingTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tenderName);
    await ownerTendersPage.isWaitingTenderDisplayed(tenderName);
    await ownerTendersPage.checkTenderData(
      tenderName,
      editTenderData.services[0].name,
      datePeriod(),
      "Київ, Київська область, Україна",
      editTenderData.start_price.toString()
    );
  });

  test("C238: Edit the rejected tender with valid values (default contact person)", async ({
    ownerTendersPage,
    editTenderPage,
    headerPage,
    apiHelper,
  }) => {
    // Reject the created tender via API
    await apiHelper.rejectTender(tenderName);

    // Check the tender display in "Відхилені" tab
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.clickRejectedTab();
    await ownerTendersPage.isRejectedTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tenderName);
    await ownerTendersPage.isRejectedTenderDisplayed(tenderName);

    // Check "Назва тендеру" field
    await ownerTendersPage.clickEditBtn();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.areBaseInfoFormElementsDisplayed();
    await editTenderPage.clearTenderNameField();
    await editTenderPage.clickNextBtn();
    await editTenderPage.isTenderNameEmpty();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkTenderNameErrorMsg(
      messagesData.Errors.Tender.shortName
    );
    await editTenderPage.fillTenderNameField(invalidTenderData.name[2]);
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkTenderNameErrorMsg(
      messagesData.Errors.Tender.shortName
    );
    for (const symbol of restrictedSymbols) {
      await editTenderPage.fillTenderNameField(symbol);
      await editTenderPage.isTenderNameEmpty();
    }
    await editTenderPage.fillTenderNameField(invalidTenderData.name[1]);
    await editTenderPage.verifyTenderNameLength(
      invalidTenderData.name[1].length - 1
    );
    await editTenderPage.fillTenderNameField(validTenderData.name);

    await editTenderPage.clickTenderServiceClearBtn();
    await editTenderPage.isTenderServiceNameCleared();
    await editTenderPage.checkTenderServiceNameErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await editTenderPage.fillTenderServiceNameField(
      validTenderData.serviceName
    );
    await editTenderPage.chooseTenderServiceListItem();
    await editTenderPage.isTenderServiceNameChosen();
    await editTenderPage.clickTenderServiceClearBtn();
    await editTenderPage.fillTenderServiceNameField(
      editTenderData.services[0].name
    );
    await editTenderPage.chooseTenderServiceListItem();
    await editTenderPage.isTenderServiceNameChosen();

    await editTenderPage.isStartDateFieldDisabled();
    await editTenderPage.isEndDateFieldDisabled();
    await editTenderPage.isWorkPeriodDateFieldDisabled();

    await editTenderPage.clearBudgetAmountField();
    await editTenderPage.clickNextBtn();
    await editTenderPage.isBudgetAmountCleared();
    await editTenderPage.checkBudgetAmountErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    await editTenderPage.fillBudgetAmountField(
      invalidTenderData.budgetAmount[1]
    );
    await editTenderPage.isBudgetAmountCleared();
    await editTenderPage.checkBudgetAmountErrorMsg(
      messagesData.Errors.emptyRequiredField
    );
    for (const symbol of restrictedSymbols) {
      await editTenderPage.fillBudgetAmountField(symbol);
      await editTenderPage.isBudgetAmountCleared();
    }
    await editTenderPage.fillBudgetAmountField(
      invalidTenderData.budgetAmount[4]
    );
    await editTenderPage.verifyBudgetAmountLength(
      invalidTenderData.budgetAmount[4].length - 1
    );
    await editTenderPage.fillBudgetAmountField(
      editTenderData.start_price.toString()
    );

    await editTenderPage.clearAdditionalInfoTextarea();
    await editTenderPage.clickNextBtn();
    await editTenderPage.isAdditionalInfoTextareaCleared();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkAdditionalInfoErrorMsg(
      messagesData.Errors.Tender.shortAdditionalInfo
    );
    await editTenderPage.fillAdditionalInfoTextarea(
      invalidTenderData.additionalInfo[1]
    );
    await editTenderPage.clickNextBtn();
    await editTenderPage.checkEditTenderURL();
    await editTenderPage.checkAdditionalInfoErrorMsg(
      messagesData.Errors.Tender.shortAdditionalInfo
    );
    for (const symbol of restrictedSymbols) {
      await editTenderPage.fillAdditionalInfoTextarea(symbol);
      await editTenderPage.isAdditionalInfoTextareaCleared();
    }
    await editTenderPage.fillAdditionalInfoTextarea(editTenderData.description);

    await editTenderPage.deleteDocumentationFile();
    await editTenderPage.isDocumentationFileNotDisplayed();
    await editTenderPage.checkDocumentsUploadErrorMsg(
      messagesData.Errors.Tender.emptyDocs
    );
    await editTenderPage.uploadDocumentationFile(filePath.tenderImage);

    await editTenderPage.clickNextBtn();
    tenderName = validTenderData.name;
    await editTenderPage.areTenderCreationMsgDisplayed();
    await editTenderPage.clickSeeInMyTendersBtn();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.isWaitingTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tenderName);
    await ownerTendersPage.isWaitingTenderDisplayed(tenderName);
    await ownerTendersPage.checkTenderData(
      tenderName,
      editTenderData.services[0].name,
      datePeriod(),
      "Київ, Київська область, Україна",
      editTenderData.start_price.toString()
    );
  });

  test.afterEach(async ({ apiHelper, mainPage }) => {
    // Delete the created tender via API
    await apiHelper.deleteTender(tenderName);
    await mainPage.toBeFalse(
      await apiHelper.checkTenderResponseResults(tenderName)
    );
  });
});
