import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test("C576: Authorization with invalid email", async ({ mainPage }) => {
  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  // Click on the "Вхід" button
  await mainPage.clickHeaderLoginBtn();

  await mainPage.isAuthorizationPopupDisplayed();

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
