import { test } from "../../fixtures/fixtures";
import authorizationData from "../../utils/authorization-data.json";
import messagesData from "../../utils/messages-data.json";

test.describe("Authorization w/ valid credentials and password recovery w/ invalid email", () => {
  test.beforeEach(async ({ mainPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
  });

  test.skip("C199: Reset the password with invalid email", async ({
    mainPage,
    headerPage,
  }) => {
    // Click on the "Вхід" button
    await headerPage.clickHeaderLoginBtn();

    // Check the password reset with empty email field
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.clickForgotPasswordLink();
    await mainPage.isRestorePasswordPopupDisplayed();
    await mainPage.clickRecaptchaCheckbox();
    await mainPage.clickSubmitRestorePasswordBtn();
    await mainPage.isFieldErrorMsgDisplayed(messagesData.Errors.emptyField);
    await mainPage.isLoginErrorMsgNotExist();

    // Check the password reset closing
    await mainPage.fillRestorePasswordEmailField(
      authorizationData.Existent.emails[0]
    );
    await mainPage.clickRestorePasswordCrossIcon();
    await mainPage.isRestorePasswordPopupNotDisplayed();

    // Check the password reset with invalid email
    await mainPage.clickForgotPasswordLink();
    for (const invalidEmail of authorizationData.Invalid.emails) {
      await mainPage.fillRestorePasswordEmailField(invalidEmail);
      await mainPage.clickRecaptchaCheckbox();
      await mainPage.clickSubmitRestorePasswordBtn();
      await mainPage.isFieldErrorMsgDisplayed(messagesData.Errors.invalidEmail);
      await mainPage.isLoginErrorMsgNotExist();
      await mainPage.isRestorePasswordPopupDisplayed();
    }

    // Check the password reset with non-existing email
    await mainPage.fillRestorePasswordEmailField(
      authorizationData.NonExistent.email
    );
    await mainPage.clickRecaptchaCheckbox();
    await mainPage.pressRestorePasswordEmailFieldEnter();
    await mainPage.isRestoreErrorMsgDisplayed(
      messagesData.Errors.nonExistingEmail
    );
  });

  test("C200: Authorization with empty fields", async ({
    mainPage,
    headerPage,
  }) => {
    // Click on the "Вхід" button
    await headerPage.clickHeaderLoginBtn();

    // Check the authorization with empty required fields
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.clickLoginBtn();
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.areFieldErrorMsgsDisplayed(messagesData.Errors.emptyField);
    await mainPage.isLoginErrorMsgNotExist();
    await mainPage.isEmailFieldRedHighlighted();
    await mainPage.isPasswordFieldRedHighlighted();

    // Check the authorization with empty password field
    await mainPage.fillLoginEmailField(authorizationData.Existent.emails[0]);
    await mainPage.clickLoginBtn();
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
    await mainPage.clickLoginBtn();
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.isPasswordFieldNotRedHighlighted();
    await mainPage.isEmailFieldRedHighlighted();
    await mainPage.isFieldErrorMsgDisplayed(messagesData.Errors.emptyField);
    await mainPage.isLoginErrorMsgNotExist();
  });

  test("C201: Authorization with valid email and password", async ({
    mainPage,
    headerPage,
  }) => {
    for (let i = 0; i < authorizationData.Existent.emails.length; i++) {
      // Click on the "Вхід" button
      await headerPage.clickHeaderLoginBtn();

      // Check the authorization with valid email and password
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.fillLoginEmailField(authorizationData.Existent.emails[i]);
      await mainPage.fillLoginPasswordField(authorizationData.Valid.password);
      await mainPage.clickHiddenPasswordBtn();
      await mainPage.isPasswordNotHidden();
      await mainPage.clickHiddenPasswordBtn();
      await mainPage.isPasswordHidden();
      if (i === 0) {
        await mainPage.clickLoginBtn();
      } else if (i === 1) {
        await mainPage.pressPasswordFieldEnter();
      }
      await headerPage.clickUserIcon();
      await headerPage.isUserEmailDisplayed(
        authorizationData.Existent.emails[i].toLowerCase()
      );

      // Check logout
      await headerPage.clickLogoutLink();
    }
  });

  test("C202: Authorization with valid phone and password", async ({
    mainPage,
    profilePage,
    headerPage,
  }) => {
    for (let i = 0; i < authorizationData.Valid.phones.length; i++) {
      // Click on the "Вхід" button
      await headerPage.clickHeaderLoginBtn();

      // Check the authorization with valid phone and password
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.fillLoginEmailField(authorizationData.Valid.phones[i]);
      await mainPage.isEmailFieldNotRedHighlighted();
      await mainPage.fillLoginPasswordField(authorizationData.Valid.password);
      await mainPage.isPasswordFieldNotRedHighlighted();
      await mainPage.clickLoginBtn();
      await headerPage.clickUserIcon();
      await headerPage.isUserEmailDisplayed(
        authorizationData.Existent.emails[0]
      );
      await headerPage.clickProfileLink();
      await profilePage.checkProfileURL();
      await profilePage.isUserPhoneNumberDisplayed(
        authorizationData.Existent.phone
      );
      await profilePage.isUserPhoneNumberVerificated(messagesData.verification);
      await profilePage.clickLogoutLink();
    }
  });
});
