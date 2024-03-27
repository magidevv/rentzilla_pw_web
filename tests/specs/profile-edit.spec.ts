import { test } from "../../fixtures/fixtures";
import { validProfileData, invalidProfileData } from "../../utils/profile-data";
import messagesData from "../../utils/messages-data.json";
import path from "path";
import TelegramPage from "../pages/telegram-bot.page";

const data: any = {
  userEmail: process.env.TESTUSER_EMAIL,
  userPassword: process.env.TESTUSER_PASSWORD,
  userPhone: process.env.TESTUSER_PHONE,
};

const filePath: any = {
  profileImage: path.resolve("data/", "test.png"),
  largeSizeFile: path.resolve("data/", "largeSize.zip"),
  invalidFormatFile: path.resolve("data/", "invalidFormat.gif"),
};

test.describe("Profile Edit", () => {
  test.beforeEach(async ({ mainPage, headerPage, profilePage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();

    // Click on the "Вхід" button
    await headerPage.clickHeaderLoginBtn();

    // Authorization with user account
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.fillLoginEmailField(data.userEmail);
    await mainPage.fillLoginPasswordField(data.userPassword);
    await mainPage.clickLoginBtn();

    // Open the My Profile Page
    await headerPage.clickUserIcon();
    await headerPage.clickProfileLink();
    await profilePage.checkProfileURL();
  });

  test("Verify the 'Тип особи, до якої належите' field", async ({
    profilePage,
  }) => {
    // Verify the 'Тип особи, до якої належите' field w/ invalid data
    await profilePage.isBaseInfoFormDisplayed();
    await profilePage.isContactsFormDisplayed();
    await profilePage.isPersonTypeOptionSelected(
      validProfileData.personTypes[1]
    );
    await profilePage.clickPersonTypeSelect();
    await profilePage.isPersonTypeDropdownListDisplayed(
      validProfileData.personTypes
    );
    await profilePage.selectPersonTypeOption(validProfileData.personTypes[0]);
    await profilePage.isPersonTypeOptionSelected(
      validProfileData.personTypes[0]
    );
    await profilePage.isIpnFOPFieldDisplayed();
    await profilePage.clickPersonTypeSelect();
    await profilePage.isPersonTypeDropdownListDisplayed(
      validProfileData.personTypes
    );
    await profilePage.selectPersonTypeOption(validProfileData.personTypes[2]);
    await profilePage.isPersonTypeOptionSelected(
      validProfileData.personTypes[2]
    );
    await profilePage.areLegalEntityFieldsDisplayed();

    // Verify the 'Тип юридичної особи' field w/ invalid data
    await profilePage.fillLegalEntityEDRPOUField(
      validProfileData.legalEntityEDRPOU[0]
    );
    await profilePage.fillLegalEntityNameField(
      validProfileData.legalEntityName[0]
    );
    await profilePage.clickSubmitBtn();
    await profilePage.isLegalEntityTypeSelectCleared();
    for (let i = 0; i < validProfileData.legalEntityTypes.length; i++) {
      await profilePage.clickLegalEntityTypeSelect();
      await profilePage.isLegalEntityTypeDropdownListDisplayed(
        validProfileData.legalEntityTypes
      );
      await profilePage.selectLegalEntityTypeOption(
        validProfileData.legalEntityTypes,
        i
      );
      await profilePage.isLegalEntityTypeOptionSelected(
        validProfileData.legalEntityTypes[i]
      );
    }
  });

  test("Verify the 'РНОКПП (ІПН)' field", async ({ profilePage }) => {
    await profilePage.clickPersonTypeSelect();
    await profilePage.isPersonTypeDropdownListDisplayed(
      validProfileData.personTypes
    );
    await profilePage.selectPersonTypeOption(validProfileData.personTypes[1]);
    await profilePage.isPersonTypeOptionSelected(
      validProfileData.personTypes[1]
    );

    await profilePage.clearIpnField();
    for (const ipn of invalidProfileData.ipn[0]) {
      await profilePage.fillIpnField(ipn);
      await profilePage.isIpnFieldCleared();
    }
    await profilePage.clickSubmitBtn();
    await profilePage.isSuccessProfileEditNotificationDisplayed(
      messagesData.successfulProfileEdit
    );
    await profilePage.isIpnFieldNotRedHighlighted();
    await profilePage.fillIpnField(invalidProfileData.ipn[1][0]);
    await profilePage.clickSubmitBtn();
    await profilePage.isIpnFieldRedHighlighted();
    await profilePage.isIpnFieldErrorMsgDisplayed(
      messagesData.Errors.Profile.shortIpn,
      1
    );
    await profilePage.fillIpnField(invalidProfileData.ipn[1][1]);
    await profilePage.checkIpnFieldValueLength(
      invalidProfileData.ipn[1][1].length - 1
    );
  });

  test("Verify the 'РНОКПП (ІПН) для ФОП' field", async ({ profilePage }) => {
    await profilePage.clickPersonTypeSelect();
    await profilePage.isPersonTypeDropdownListDisplayed(
      validProfileData.personTypes
    );
    await profilePage.selectPersonTypeOption(validProfileData.personTypes[0]);
    await profilePage.isPersonTypeOptionSelected(
      validProfileData.personTypes[0]
    );
    await profilePage.isIpnFOPFieldDisplayed();

    await profilePage.clearIpnField();
    for (const ipn of invalidProfileData.ipn[0]) {
      await profilePage.fillIpnFOPField(ipn);
      await profilePage.isIpnFieldCleared();
    }
    await profilePage.clickSubmitBtn();
    await profilePage.isIpnFieldRedHighlighted();
    await profilePage.isIpnFieldErrorMsgDisplayed(
      messagesData.Errors.emptyRequiredField,
      1
    );
    await profilePage.fillIpnFOPField(invalidProfileData.ipn[1][0]);
    await profilePage.clickSubmitBtn();
    await profilePage.isIpnFieldRedHighlighted();
    await profilePage.isIpnFieldErrorMsgDisplayed(
      messagesData.Errors.Profile.shortIpn,
      1
    );
    await profilePage.fillIpnFOPField(invalidProfileData.ipn[1][1]);
    await profilePage.checkIpnFieldValueLength(
      invalidProfileData.ipn[1][1].length - 1
    );
  });

  test("Verify the 'ЄДРПОУ для юридичних осіб' field", async ({
    profilePage,
  }) => {
    await profilePage.clickPersonTypeSelect();
    await profilePage.isPersonTypeDropdownListDisplayed(
      validProfileData.personTypes
    );
    await profilePage.selectPersonTypeOption(validProfileData.personTypes[2]);
    await profilePage.isPersonTypeOptionSelected(
      validProfileData.personTypes[2]
    );
    await profilePage.areLegalEntityFieldsDisplayed();
    await profilePage.fillLegalEntityNameField(
      validProfileData.legalEntityName[0]
    );
    await profilePage.clickLegalEntityTypeSelect();
    await profilePage.isLegalEntityTypeDropdownListDisplayed(
      validProfileData.legalEntityTypes
    );
    await profilePage.selectLegalEntityTypeOption(
      validProfileData.legalEntityTypes,
      0
    );

    await profilePage.clearLegalEntityEDRPOUField();
    for (const edrpou of invalidProfileData.legalEntityEDRPOU[0]) {
      await profilePage.fillLegalEntityEDRPOUField(edrpou);
      await profilePage.isLegalEntityEDRPOUFieldCleared();
    }
    await profilePage.clickSubmitBtn();
    await profilePage.isLegalEntityEDRPOUFieldRedHighlighted();
    await profilePage.isLegalEntityEDRPOUFieldErrorMsgDisplayed(
      messagesData.Errors.emptyRequiredField,
      1
    );
    await profilePage.fillLegalEntityEDRPOUField(
      invalidProfileData.legalEntityEDRPOU[1][0]
    );
    await profilePage.clickSubmitBtn();
    await profilePage.isLegalEntityEDRPOUFieldRedHighlighted();
    await profilePage.isLegalEntityEDRPOUFieldErrorMsgDisplayed(
      messagesData.Errors.Profile.shortEDRPOU,
      1
    );
    await profilePage.clearLegalEntityEDRPOUField();
    await profilePage.fillKeysLegalEntityEDRPOUField(
      invalidProfileData.legalEntityEDRPOU[1][1].length
    );
    await profilePage.checkLegalEntityEDRPOUFieldValueLength(
      invalidProfileData.legalEntityEDRPOU[1][1].length - 1
    );
  });

  test("Verify the 'Назва юридичної особи' field", async ({ profilePage }) => {
    await profilePage.clickPersonTypeSelect();
    await profilePage.isPersonTypeDropdownListDisplayed(
      validProfileData.personTypes
    );
    await profilePage.selectPersonTypeOption(validProfileData.personTypes[2]);
    await profilePage.isPersonTypeOptionSelected(
      validProfileData.personTypes[2]
    );
    await profilePage.areLegalEntityFieldsDisplayed();
    await profilePage.fillLegalEntityEDRPOUField(
      validProfileData.legalEntityEDRPOU[0]
    );
    await profilePage.clickLegalEntityTypeSelect();
    await profilePage.isLegalEntityTypeDropdownListDisplayed(
      validProfileData.legalEntityTypes
    );
    await profilePage.selectLegalEntityTypeOption(
      validProfileData.legalEntityTypes,
      0
    );

    await profilePage.clearLegalEntityNameField();
    await profilePage.fillLegalEntityNameField(
      invalidProfileData.legalEntityName[0][0]
    );
    await profilePage.isLegalEntityNameFieldCleared();

    await profilePage.clickSubmitBtn();
    await profilePage.isLegalEntityNameFieldRedHighlighted();
    await profilePage.isLegalEntityNameFieldErrorMsgDisplayed(
      messagesData.Errors.emptyRequiredField,
      1
    );
  });

  test("Verify the 'Прізвище' field", async ({ profilePage }) => {
    await profilePage.clearLastNameField(2);
    for (const lastName of invalidProfileData.lastName[0]) {
      await profilePage.fillLastNameField(lastName, 2);
      await profilePage.clickSubmitBtn();
      await profilePage.isLastNameFieldRedHighlighted(2);
      await profilePage.isLastNameFieldErrorMsgDisplayed(
        messagesData.Errors.Profile.invalidSurname,
        1
      );
    }

    for (const lastName of invalidProfileData.lastName[1]) {
      await profilePage.fillLastNameField(lastName, 2);
      await profilePage.isLastNameFieldCleared(2);
      await profilePage.clickSubmitBtn();
      await profilePage.isLastNameFieldErrorMsgDisplayed(
        messagesData.Errors.emptyRequiredField,
        1
      );
      await profilePage.isLastNameFieldRedHighlighted(2);
    }

    await profilePage.fillLastNameField(invalidProfileData.lastName[2][0], 2);
    await profilePage.clickSubmitBtn();
    await profilePage.isLastNameFieldRedHighlighted(2);
    await profilePage.isLastNameFieldErrorMsgDisplayed(
      messagesData.Errors.Profile.shortSurname,
      1
    );
    await profilePage.fillLastNameField(invalidProfileData.lastName[2][1], 2);
    await profilePage.checkLastNameFieldValueLength(
      invalidProfileData.lastName[2][1].length - 1,
      2
    );
  });

  test("Verify the 'Ім'я' field", async ({ profilePage }) => {
    await profilePage.clearFirstNameField(3);
    for (const firstName of invalidProfileData.firstName[0]) {
      await profilePage.fillFirstNameField(firstName, 3);
      await profilePage.clickSubmitBtn();
      await profilePage.isFirstNameFieldRedHighlighted(3);
      await profilePage.isFirstNameFieldErrorMsgDisplayed(
        messagesData.Errors.Profile.invalidName,
        1
      );
    }

    for (const firstName of invalidProfileData.firstName[1]) {
      await profilePage.fillFirstNameField(firstName, 3);
      await profilePage.isFirstNameFieldCleared(3);
      await profilePage.clickSubmitBtn();
      await profilePage.isFirstNameFieldErrorMsgDisplayed(
        messagesData.Errors.emptyRequiredField,
        1
      );
      await profilePage.isFirstNameFieldRedHighlighted(3);
    }

    await profilePage.fillFirstNameField(invalidProfileData.firstName[2][0], 3);
    await profilePage.clickSubmitBtn();
    await profilePage.isFirstNameFieldRedHighlighted(3);
    await profilePage.isFirstNameFieldErrorMsgDisplayed(
      messagesData.Errors.Profile.shortName,
      1
    );
    await profilePage.fillFirstNameField(invalidProfileData.firstName[2][1], 3);
    await profilePage.checkFirstNameFieldValueLength(
      invalidProfileData.firstName[2][1].length - 1,
      3
    );
  });

  test("Verify the 'По-батькові' field", async ({ profilePage }) => {
    await profilePage.clearFatherNameField(4);
    for (const fatherName of invalidProfileData.fatherName[0]) {
      await profilePage.fillFatherNameField(fatherName, 4);
      await profilePage.clickSubmitBtn();
      await profilePage.isFatherNameFieldRedHighlighted(4);
      await profilePage.isFatherNameFieldErrorMsgDisplayed(
        messagesData.Errors.Profile.invalidFathername,
        1
      );
    }

    for (const fatherName of invalidProfileData.fatherName[1]) {
      await profilePage.fillFatherNameField(fatherName, 4);
      await profilePage.isFatherNameFieldCleared(4);
      await profilePage.clickSubmitBtn();
      await profilePage.isSuccessProfileEditNotificationDisplayed(
        messagesData.successfulProfileEdit
      );
      await profilePage.isFatherNameFieldNotRedHighlighted(4);
    }

    await profilePage.fillFatherNameField(
      invalidProfileData.fatherName[2][0],
      4
    );
    await profilePage.clickSubmitBtn();
    await profilePage.isFatherNameFieldRedHighlighted(4);
    await profilePage.isFatherNameFieldErrorMsgDisplayed(
      messagesData.Errors.Profile.shortFathername,
      1
    );
    await profilePage.fillFatherNameField(
      invalidProfileData.fatherName[2][1],
      4
    );
    await profilePage.checkFatherNameFieldValueLength(
      invalidProfileData.fatherName[2][1].length - 1,
      4
    );
  });

  test("Verify the 'Місто' field", async ({ profilePage }) => {
    await profilePage.clearCityField(5);
    for (const city of invalidProfileData.city[0]) {
      await profilePage.fillCityField(city, 5);
      await profilePage.clickSubmitBtn();
      await profilePage.isCityFieldRedHighlighted(5);
      await profilePage.isCityFieldErrorMsgDisplayed(
        messagesData.Errors.Profile.invalidCity,
        1
      );
    }

    for (const city of invalidProfileData.city[1]) {
      await profilePage.fillCityField(city, 5);
      await profilePage.isCityFieldCleared(5);
      await profilePage.clickSubmitBtn();
      await profilePage.isSuccessProfileEditNotificationDisplayed(
        messagesData.successfulProfileEdit
      );
      await profilePage.isCityFieldNotRedHighlighted(5);
    }

    await profilePage.fillCityField(invalidProfileData.city[2][0], 5);
    await profilePage.checkCityFieldValueLength(
      invalidProfileData.city[2][0].length - 1,
      5
    );
  });

  test("Verify the 'Номер телефону' field", async ({ profilePage }) => {
    await profilePage.clearPhoneNumberField();
    for (const phoneNumber of invalidProfileData.phoneNumber[0]) {
      await profilePage.fillPhoneNumberField(phoneNumber);
      await profilePage.isPhoneNumberFieldCleared();
    }

    await profilePage.clickSubmitBtn();
    await profilePage.isSuccessProfileEditNotificationDisplayed(
      messagesData.successfulProfileEdit
    );
    await profilePage.isPhoneNumberFieldGreenHighlighted();

    await profilePage.fillPhoneNumberField(
      invalidProfileData.phoneNumber[1][0]
    );
    await profilePage.isPhoneNumberPlusDisplayed();

    for (const phoneNumber of invalidProfileData.phoneNumber[2]) {
      await profilePage.fillPhoneNumberField(phoneNumber);
      await profilePage.isPhoneNumberFieldErrorMsgDisplayed(
        messagesData.Errors.Profile.invalidPhoneNumber
      );
      await profilePage.isPhoneNumberFieldRedHighlighted();
      await profilePage.clickSubmitBtn();
      await profilePage.isPhoneNumberFieldErrorMsgDisplayed(
        messagesData.Errors.Profile.nonverifiedPhoneNumber
      );
      await profilePage.isPhoneNumberFieldRedHighlighted();
    }

    await profilePage.fillPhoneNumberField(
      invalidProfileData.phoneNumber[3][0]
    );
    await profilePage.checkPhoneNumberFieldValueLength(
      invalidProfileData.phoneNumber[3][0].length - 1
    );
  });

  test("Verify the 'Viber' field", async ({ profilePage }) => {
    await profilePage.clearViberField();
    await profilePage.clickSubmitBtn();
    await profilePage.clickViberField();
    await profilePage.isViberPrefixDisplayed();

    for (const viber of invalidProfileData.viber[0]) {
      await profilePage.fillViberField(viber);
      await profilePage.isViberFieldCleared();
    }

    await profilePage.clickSubmitBtn();
    await profilePage.isSuccessProfileEditNotificationDisplayed(
      messagesData.successfulProfileEdit
    );
    await profilePage.isViberFieldNotRedHighlighted();

    await profilePage.fillViberField(invalidProfileData.viber[1][0]);
    await profilePage.isViberPrefixDisplayed();

    for (const viber of invalidProfileData.viber[2]) {
      await profilePage.clearViberField();
      await profilePage.fillViberField(viber);
      await profilePage.isViberFieldErrorMsgDisplayed(
        messagesData.Errors.Profile.invalidPhoneNumber
      );
      await profilePage.isViberFieldRedHighlighted();
      await profilePage.clickSubmitBtn();
      await profilePage.isViberFieldErrorMsgDisplayed(
        messagesData.Errors.Profile.invalidPhoneNumber
      );
      await profilePage.isViberFieldRedHighlighted();
    }

    await profilePage.clearViberField();
    await profilePage.fillViberField(invalidProfileData.viber[3][0]);
    await profilePage.checkViberFieldValueLength(
      invalidProfileData.viber[3][0].length - 1
    );
  });

  test("Verify the 'Telegram' field", async ({ profilePage }) => {
    await profilePage.clearTelegramField(6);
    for (const telegram of invalidProfileData.telegram[0]) {
      await profilePage.fillTelegramField(telegram, 6);
      await profilePage.isTelegramFieldCleared(6);
    }

    await profilePage.clickSubmitBtn();
    await profilePage.isSuccessProfileEditNotificationDisplayed(
      messagesData.successfulProfileEdit
    );
    await profilePage.isTelegramFieldNotRedHighlighted(6);

    for (const telegram of invalidProfileData.telegram[1]) {
      await profilePage.fillTelegramField(telegram, 6);
      await profilePage.clickSubmitBtn();
      await profilePage.isTelegramFieldErrorMsgDisplayed(
        messagesData.Errors.Profile.invalidTelegram,
        1
      );
      await profilePage.isTelegramFieldRedHighlighted(6);
    }

    for (const telegram of invalidProfileData.telegram[2]) {
      await profilePage.fillTelegramField(telegram, 6);
      await profilePage.clickSubmitBtn();
      await profilePage.isTelegramFieldErrorMsgDisplayed(
        messagesData.Errors.Profile.invalidTelegramUsername,
        1
      );
      await profilePage.isTelegramFieldRedHighlighted(6);
    }

    for (const telegram of invalidProfileData.telegram[3]) {
      await profilePage.fillTelegramField(telegram, 6);
      await profilePage.clickSubmitBtn();
      await profilePage.isTelegramFieldErrorMsgDisplayed(
        messagesData.Errors.Profile.invalidPhoneNumber,
        1
      );
      await profilePage.isTelegramFieldRedHighlighted(6);
    }

    await profilePage.fillTelegramField(invalidProfileData.telegram[4][0], 6);
    await profilePage.clickSubmitBtn();
    await profilePage.isTelegramFieldRedHighlighted(6);
    await profilePage.isTelegramFieldErrorMsgDisplayed(
      messagesData.Errors.Profile.shortTelegram,
      1
    );

    await profilePage.fillTelegramField(invalidProfileData.telegram[4][1], 6);
    await profilePage.checkTelegramFieldValueLength(
      invalidProfileData.telegram[4][1].length - 1,
      6
    );
  });

  test("Verify the Photo Upload", async ({ profilePage }) => {
    await profilePage.uploadPhoto(filePath.invalidFormatFile);
    await profilePage.isInvalidPhotoPopupDisplayed(
      messagesData.Errors.Profile.invalidPhoto.title,
      messagesData.Errors.Profile.invalidPhoto.invalidFormat
    );
    await profilePage.submitInvalidPhotoPopup();
    await profilePage.isInvalidPhotoPopupClosed();
    await profilePage.isPhotoNotChanged(invalidProfileData.photo[0][0]);
    await profilePage.uploadPhoto(filePath.largeSizeFile);
    await profilePage.isInvalidPhotoPopupDisplayed(
      messagesData.Errors.Profile.invalidPhoto.title,
      messagesData.Errors.Profile.invalidPhoto.largeSize
    );
    await profilePage.closeInvalidPhotoPopup();
    await profilePage.isInvalidPhotoPopupClosed();
    await profilePage.isPhotoNotChanged(invalidProfileData.photo[0][1]);
  });

  test("Edit the My Profile Information w/ new valid phone number", async ({
    profilePage,
    context,
  }) => {
    await profilePage.isPhoneNumberFieldValueDisplayed(data.userPhone);
    await profilePage.isPhoneNumberFieldGreenHighlighted();
    await profilePage.isPhoneNumberFieldVerificationMsgDisplayed(
      messagesData.verification
    );

    await profilePage.fillPhoneNumberField(validProfileData.phoneNumber[0]);
    await profilePage.isPhoneNumberFieldErrorMsgDisplayed(
      messagesData.Errors.Profile.nonverifiedPhoneNumber
    );
    await profilePage.isPhoneNumberFieldRedHighlighted();
    await profilePage.areVerificationTypeBtnsDisplayed();
    await profilePage.areVerificationTypeBtnsEnabled();

    await profilePage.clickTelegramBtn();
    await profilePage.isPhoneNumberChangePopupDisplayed(
      messagesData.Errors.Profile.changeNumber.title[0],
      messagesData.Errors.Profile.changeNumber.changeSubmit
    );
    await profilePage.clickPhoneNumberChangePopupCancelBtn();
    await profilePage.isPhoneNumberChangePopupClosed();

    // await profilePage.clickTelegramBtn();
    // await profilePage.isPhoneNumberChangePopupDisplayed(
    //   messagesData.Errors.Profile.changeNumber.title[0],
    //   messagesData.Errors.Profile.changeNumber.changeSubmit
    // );
    // await profilePage.clickPhoneNumberChangePopupSubmitBtn();
    // await profilePage.isRedirectToTelegramBotPopupDisplayed(
    //   messagesData.Errors.Profile.changeNumber.title[1]
    // );
    // const [newPage] = await Promise.all([
    //   context.waitForEvent("page"),
    //   profilePage.clickRedirectToTelegramBotLink(),
    // ]);
    // const telegramPage = new TelegramPage(newPage);
    // await telegramPage.checkTelegramBotURL();
    // await telegramPage.checkSendMsgBtn();
    // newPage.on("dialog", async (dialog) => {
    //   console.log(dialog.message());
    //   await dialog.dismiss();
    // });
    // await newPage.keyboard.press("Enter");
    // await newPage.close();
  });

  test("Edit the My Profile Information w/ valid data as 'ФОП'", async ({
    profilePage,
  }) => {
    await profilePage.clickPersonTypeSelect();
    await profilePage.selectPersonTypeOption(validProfileData.personTypes[0]);
    await profilePage.isPersonTypeOptionSelected(
      validProfileData.personTypes[0]
    );
    await profilePage.isIpnFOPFieldDisplayed();
    await profilePage.fillIpnFOPField(validProfileData.ipn[0]);
    await profilePage.fillCityField(validProfileData.city[0], 5);
    await profilePage.selectCityOption();
    await profilePage.isUserPhoneNumberDisplayed(data.userPhone);
    await profilePage.isUserPhoneNumberVerificated(messagesData.verification);
    await profilePage.isPhoneNumberFieldGreenHighlighted();
    await profilePage.clearViberField();
    await profilePage.fillViberField(validProfileData.viber[0]);
    await profilePage.checkEmailField(data.userEmail, 7);
    await profilePage.uploadPhoto(filePath.profileImage);
    await profilePage.isPhotoChanged(validProfileData.photo[0]);
    for (let i = 0; i < 2; i++) {
      await profilePage.fillLastNameField(validProfileData.lastName[i], 2);
      await profilePage.fillFirstNameField(validProfileData.firstName[i], 3);
      await profilePage.fillFatherNameField(validProfileData.fatherName[i], 4);
      await profilePage.fillTelegramField(validProfileData.telegram[i], 6);
      await profilePage.clickSubmitBtn();
      await profilePage.isSuccessProfileEditNotificationDisplayed(
        messagesData.successfulProfileEdit
      );
    }
  });

  test("Edit the My Profile Information w/ valid data as 'Юридична особа'", async ({
    profilePage,
  }) => {
    await profilePage.clickPersonTypeSelect();
    await profilePage.selectPersonTypeOption(validProfileData.personTypes[2]);
    await profilePage.isPersonTypeOptionSelected(
      validProfileData.personTypes[2]
    );
    await profilePage.areLegalEntityFieldsDisplayed();
    await profilePage.clickLegalEntityTypeSelect();
    await profilePage.isLegalEntityTypeDropdownListDisplayed(
      validProfileData.legalEntityTypes
    );
    await profilePage.selectLegalEntityTypeOption(
      validProfileData.legalEntityTypes,
      0
    );
    await profilePage.fillLegalEntityEDRPOUField(
      validProfileData.legalEntityEDRPOU[0]
    );
    await profilePage.fillCityField(validProfileData.city[0], 6);
    await profilePage.selectCityOption();
    await profilePage.isUserPhoneNumberDisplayed(data.userPhone);
    await profilePage.isUserPhoneNumberVerificated(messagesData.verification);
    await profilePage.isPhoneNumberFieldGreenHighlighted();
    await profilePage.clearViberField();
    await profilePage.fillViberField(validProfileData.viber[0]);
    await profilePage.checkEmailField(data.userEmail, 8);
    await profilePage.uploadPhoto(filePath.profileImage);
    await profilePage.isPhotoChanged(validProfileData.photo[0]);
    for (let i = 0; i < 2; i++) {
      await profilePage.fillLegalEntityNameField(
        validProfileData.legalEntityName[i]
      );
      await profilePage.fillLastNameField(validProfileData.lastName[i], 3);
      await profilePage.fillFirstNameField(validProfileData.firstName[i], 4);
      await profilePage.fillFatherNameField(validProfileData.fatherName[i], 5);
      await profilePage.fillTelegramField(validProfileData.telegram[i], 7);
      await profilePage.clickSubmitBtn();
      await profilePage.isSuccessProfileEditNotificationDisplayed(
        messagesData.successfulProfileEdit
      );
    }
  });

  test("Edit the My Profile Information w/ valid data as 'Приватна особа'", async ({
    profilePage,
  }) => {
    await profilePage.clickPersonTypeSelect();
    await profilePage.selectPersonTypeOption(validProfileData.personTypes[1]);
    await profilePage.isPersonTypeOptionSelected(
      validProfileData.personTypes[1]
    );
    await profilePage.fillIpnField(validProfileData.ipn[0]);
    await profilePage.fillCityField(validProfileData.city[0], 5);
    await profilePage.selectCityOption();
    await profilePage.isUserPhoneNumberDisplayed(data.userPhone);
    await profilePage.isUserPhoneNumberVerificated(messagesData.verification);
    await profilePage.isPhoneNumberFieldGreenHighlighted();
    await profilePage.clearViberField();
    await profilePage.fillViberField(validProfileData.viber[0]);
    await profilePage.checkEmailField(data.userEmail, 7);
    await profilePage.uploadPhoto(filePath.profileImage);
    await profilePage.isPhotoChanged(validProfileData.photo[0]);
    for (let i = 0; i < 2; i++) {
      await profilePage.fillLastNameField(validProfileData.lastName[i], 2);
      await profilePage.fillFirstNameField(validProfileData.firstName[i], 3);
      await profilePage.fillFatherNameField(validProfileData.fatherName[i], 4);
      await profilePage.fillTelegramField(validProfileData.telegram[i], 6);
      await profilePage.clickSubmitBtn();
      await profilePage.isSuccessProfileEditNotificationDisplayed(
        messagesData.successfulProfileEdit
      );
    }
  });
});
