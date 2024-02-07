import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test("C577: Authorization with invalid password", async ({ mainPage }) => {
  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  // Click on the "Вхід" button
  await mainPage.clickHeaderLoginBtn();

  await mainPage.isAuthorizationPopupDisplayed();

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
