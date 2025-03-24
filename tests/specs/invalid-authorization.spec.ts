import { test } from "../../fixtures/fixtures";
import authorizationData from "../../utils/authorization-data.json";
import messagesData from "../../utils/messages-data.json";

test.describe("Authorization w/ invalid credentials", () => {
  test.beforeEach(async ({ mainPage, headerPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
    // Click on the "Вхід" button
    await headerPage.clickHeaderLoginBtn();
  });

  test("C576: Authorization with invalid email", async ({ mainPage }) => {
    // Check the authorization with invalid emails
    for (let i = 0; i < authorizationData.Invalid.emails.length; i++) {
      await mainPage.fillLoginEmailField(authorizationData.Invalid.emails[i]);
      await mainPage.fillLoginPasswordField(authorizationData.Valid.password);
      if (i === 0) {
        await mainPage.clickLoginBtn();
      } else {
        await mainPage.pressPasswordFieldEnter();
      }
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.isFieldErrorMsgDisplayed(
        messagesData.Errors.invalidEmailOrPhone
      );
      await mainPage.isLoginErrorMsgNotExist();
    }

    // Check the authorization with non-existent email
    for (let i = 0; i < 2; i++) {
      await mainPage.fillLoginEmailField(authorizationData.NonExistent.email);
      await mainPage.fillLoginPasswordField(authorizationData.Valid.password);
      if (i === 0) {
        await mainPage.clickLoginBtn();
      } else {
        await mainPage.pressPasswordFieldEnter();
      }
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.isLoginErrorMsgDisplayed(
        messagesData.Errors.invalidEmailOrPassword
      );
      await mainPage.isFieldErrorMsgNotExist();
    }
  });

  test("C577: Authorization with invalid password", async ({ mainPage }) => {
    // Check the authorization with invalid passwords
    for (let i = 0; i < authorizationData.Invalid.passwords.length; i++) {
      await mainPage.fillLoginEmailField(authorizationData.Existent.emails[0]);
      await mainPage.fillLoginPasswordField(
        authorizationData.Invalid.passwords[i]
      );
      if (i === 0) {
        await mainPage.clickLoginBtn();
      } else {
        await mainPage.pressPasswordFieldEnter();
      }
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.isFieldErrorMsgDisplayed(
        messagesData.Errors.invalidPassword
      );
      await mainPage.isLoginErrorMsgNotExist();
    }

    // Check the authorization with non-existent password
    for (let i = 0; i < 2; i++) {
      await mainPage.fillLoginEmailField(authorizationData.Existent.emails[0]);
      await mainPage.fillLoginPasswordField(
        authorizationData.NonExistent.password
      );
      if (i === 0) {
        await mainPage.clickLoginBtn();
      } else {
        await mainPage.pressPasswordFieldEnter();
      }
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.isLoginErrorMsgDisplayed(
        messagesData.Errors.invalidEmailOrPassword
      );
      await mainPage.isFieldErrorMsgNotExist();
    }
  });
});
