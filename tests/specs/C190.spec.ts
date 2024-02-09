import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test.describe("C190 Tests", () => {
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
    await mainPage.isFieldErrorMsgDisplayed(data.emptyFieldErrorMsg);
    await mainPage.isLoginErrorMsgNotExist();

    // Check the password reset closing
    await mainPage.fillRestorePasswordEmailField(data.existingEmails[0]);
    await mainPage.clickRestorePasswordCrossIcon();
    await mainPage.isRestorePasswordPopupNotDisplayed();

    // Check the password reset with invalid email
    await mainPage.clickForgotPasswordLink();
    for (const invalidEmail of data.invalidEmails) {
      await mainPage.fillRestorePasswordEmailField(invalidEmail);
      await mainPage.clickRecaptchaCheckbox();
      await mainPage.clickSubmitRestorePasswordBtn();
      await mainPage.isFieldErrorMsgDisplayed(data.invalidEmailErrorMsg);
      await mainPage.isLoginErrorMsgNotExist();
      await mainPage.isRestorePasswordPopupDisplayed();
    }

    // Check the password reset with non-existing email
    await mainPage.fillRestorePasswordEmailField(data.nonExistingEmails);
    await mainPage.clickRecaptchaCheckbox();
    await mainPage.pressRestorePasswordEmailFieldEnter();
    await mainPage.isRestoreErrorMsgDisplayed(data.nonExistingEmailErrorMsg);
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
    await mainPage.areFieldErrorMsgsDisplayed(data.emptyFieldErrorMsg);
    await mainPage.isLoginErrorMsgNotExist();
    await mainPage.isEmailFieldRedHighlighted();
    await mainPage.isPasswordFieldRedHighlighted();

    // Check the authorization with empty password field
    await mainPage.fillLoginEmailField(data.existingEmails[0]);
    await mainPage.clickLoginBtn();
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.isEmailFieldNotRedHighlighted();
    await mainPage.isPasswordFieldRedHighlighted();
    await mainPage.isFieldErrorMsgDisplayed(data.emptyFieldErrorMsg);
    await mainPage.isLoginErrorMsgNotExist();

    // Check the authorization after clearing the field
    await mainPage.clearLoginEmailField();
    await mainPage.isEmailFieldRedHighlighted();
    await mainPage.areFieldErrorMsgsDisplayed(data.emptyFieldErrorMsg);
    await mainPage.isLoginErrorMsgNotExist();

    // Check the authorization with empty email field
    await mainPage.fillLoginPasswordField(data.validPassword);
    await mainPage.clickLoginBtn();
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.isPasswordFieldNotRedHighlighted();
    await mainPage.isEmailFieldRedHighlighted();
    await mainPage.isFieldErrorMsgDisplayed(data.emptyFieldErrorMsg);
    await mainPage.isLoginErrorMsgNotExist();
  });

  test("C201: Authorization with valid email and password", async ({
    mainPage,
    headerPage,
  }) => {
    for (let i = 0; i < data.existingEmails.length; i++) {
      // Click on the "Вхід" button
      await headerPage.clickHeaderLoginBtn();

      // Check the authorization with valid email and password
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.fillLoginEmailField(data.existingEmails[i]);
      await mainPage.fillLoginPasswordField(data.validPassword);
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
        data.existingEmails[i].toLowerCase()
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
    for (let i = 0; i < data.validPhones.length; i++) {
      // Click on the "Вхід" button
      await headerPage.clickHeaderLoginBtn();

      // Check the authorization with valid phone and password
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.fillLoginEmailField(data.validPhones[i]);
      await mainPage.isEmailFieldNotRedHighlighted();
      await mainPage.fillLoginPasswordField(data.validPassword);
      await mainPage.isPasswordFieldNotRedHighlighted();
      await mainPage.clickLoginBtn();
      await headerPage.clickUserIcon();
      await headerPage.isUserEmailDisplayed(data.existingEmails[0]);
      await headerPage.clickProfileLink();
      await profilePage.checkProfileURL();
      await profilePage.isUserPhoneNumberDisplayed(data.profilePhone);
      await profilePage.isUserPhoneNumberVerificated(data.verificationMsg);
      await profilePage.clickLogoutLink();
    }
  });
});
