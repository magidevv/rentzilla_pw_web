import { test } from "../../fixtures/fixtures";
import authorizationData from "../../utils/authorization-data.json";
import messagesData from "../../utils/messages-data.json";

test.describe("Authorization w/ valid credentials (Mobile)", () => {
  test.beforeEach(async ({ mainPage, profilePage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();

    await profilePage.closeTelegramPopup();
  });

  test("C200: Authorization with empty fields", async ({
    mainPage,
    footerPage,
  }) => {
    // Click on the "Вхід" button
    await footerPage.tapMobileProfileBtn();

    // Check the authorization with empty required fields
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.tapLoginBtn();
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.areFieldErrorMsgsDisplayed(messagesData.Errors.emptyField);
    await mainPage.isLoginErrorMsgNotExist();
    await mainPage.isEmailFieldRedHighlighted();
    await mainPage.isPasswordFieldRedHighlighted();

    // Check the authorization with empty password field
    await mainPage.fillLoginEmailField(authorizationData.Existent.emails[0]);
    await mainPage.tapLoginBtn();
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.isEmailFieldNotRedHighlighted();
    await mainPage.isPasswordFieldRedHighlighted();
    await mainPage.isFieldErrorMsgDisplayed(messagesData.Errors.emptyField);
    await mainPage.isLoginErrorMsgNotExist();

    // Check the authorization after clearing the field
    await mainPage.clearLoginEmailField();
    await mainPage.isEmailFieldRedHighlighted();
    await mainPage.areFieldErrorMsgsDisplayed(messagesData.Errors.emptyField);
    await mainPage.isLoginErrorMsgNotExist();

    // Check the authorization with empty email field
    await mainPage.fillLoginPasswordField(authorizationData.Valid.password);
    await mainPage.tapLoginBtn();
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.isPasswordFieldNotRedHighlighted();
    await mainPage.isEmailFieldRedHighlighted();
    await mainPage.isFieldErrorMsgDisplayed(messagesData.Errors.emptyField);
    await mainPage.isLoginErrorMsgNotExist();
  });

  test("C201: Authorization with valid email and password", async ({
    mainPage,
    footerPage,
    profilePage,
  }) => {
    for (let i = 0; i < authorizationData.Existent.emails.length; i++) {
      // Click on the "Вхід" button
      await footerPage.tapMobileProfileBtn();
      await mainPage.isAuthorizationPopupDisplayed();

      // Check the authorization with valid email and password
      await mainPage.fillLoginEmailField(authorizationData.Existent.emails[0]);
      await mainPage.fillLoginPasswordField(authorizationData.Valid.password);
      await mainPage.clickHiddenPasswordBtn();
      await mainPage.isPasswordNotHidden();
      await mainPage.clickHiddenPasswordBtn();
      await mainPage.isPasswordHidden();
      if (i === 0) {
        await mainPage.tapLoginBtn();
      } else if (i === 1) {
        await mainPage.pressPasswordFieldEnter();
      }
      await footerPage.tapMobileProfileBtn();
      await profilePage.checkUserName(authorizationData.Existent.name);

      // Check logout
      await profilePage.tapLogoutLink();
    }
  });

  test("C202: Authorization with valid phone and password", async ({
    mainPage,
    profilePage,
    footerPage,
  }) => {
    for (let i = 0; i < authorizationData.Valid.phones.length; i++) {
      // Click on the "Вхід" button
      await footerPage.tapMobileProfileBtn();

      // Check the authorization with valid phone and password
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.fillLoginEmailField(authorizationData.Valid.phones[i]);
      await mainPage.isEmailFieldNotRedHighlighted();
      await mainPage.fillLoginPasswordField(authorizationData.Valid.password);
      await mainPage.isPasswordFieldNotRedHighlighted();
      await mainPage.tapLoginBtn();
      await footerPage.tapMobileProfileBtn();
      await profilePage.checkUserName(authorizationData.Existent.name);
      await profilePage.tapProfileLink();
      await profilePage.checkProfileURL();
      await profilePage.isUserPhoneNumberDisplayed(
        authorizationData.Existent.phone
      );
      await profilePage.isUserPhoneNumberVerificated(messagesData.verification);

      await footerPage.tapMobileProfileBtn();
      await profilePage.tapLogoutLink();
    }
  });
});
