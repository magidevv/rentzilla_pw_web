import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test.describe("C570 Tests", () => {
  test.beforeEach(async ({ mainPage, headerPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
    // Click on the "Вхід" button
    await headerPage.clickHeaderLoginBtn();

    //Check the authorization popup display
    await mainPage.isAuthorizationPopupDisplayed();
  });

  test("C576: Authorization with invalid email", async ({ mainPage }) => {
    // Check the authorization with invalid emails
    for (let i = 0; i < data.invalidEmails.length; i++) {
      await mainPage.fillLoginEmailField(data.invalidEmails[i]);
      await mainPage.fillLoginPasswordField(data.validPassword);
      if (i === 0) {
        await mainPage.clickLoginBtn();
      } else {
        await mainPage.pressPasswordFieldEnter();
      }
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.isFieldErrorMsgDisplayed(data.invalidEmailOrPhoneErrorMsg);
    }

    // Check the authorization with non-existent email
    for (let i = 0; i < 2; i++) {
      await mainPage.fillLoginEmailField(data.nonExistingEmails);
      await mainPage.fillLoginPasswordField(data.validPassword);
      if (i === 0) {
        await mainPage.clickLoginBtn();
      } else {
        await mainPage.pressPasswordFieldEnter();
      }
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.isLoginErrorMsgDisplayed(
        data.invalidEmailOrPasswordErrorMsg
      );
    }
  });

  test("C577: Authorization with invalid password", async ({ mainPage }) => {
    // Check the authorization with invalid passwords
    for (let i = 0; i < data.invalidPasswords.length; i++) {
      await mainPage.fillLoginEmailField(data.existingEmails[0]);
      await mainPage.fillLoginPasswordField(data.invalidPasswords[i]);
      if (i === 0) {
        await mainPage.clickLoginBtn();
      } else {
        await mainPage.pressPasswordFieldEnter();
      }
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.isFieldErrorMsgDisplayed(data.invalidPasswordErrorMsg);
    }

    // Check the authorization with non-existent password
    for (let i = 0; i < 2; i++) {
      await mainPage.fillLoginEmailField(data.existingEmails[0]);
      await mainPage.fillLoginPasswordField(data.nonExistingPassword);
      if (i === 0) {
        await mainPage.clickLoginBtn();
      } else {
        await mainPage.pressPasswordFieldEnter();
      }
      await mainPage.isAuthorizationPopupDisplayed();
      await mainPage.isLoginErrorMsgDisplayed(
        data.invalidEmailOrPasswordErrorMsg
      );
    }
  });
});
