import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test("C200: Authorization with empty fields", async ({ mainPage }) => {
  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  // Click on the "Вхід" button
  await mainPage.clickHeaderLoginBtn();

  // Check the authorization with empty required fields
  await mainPage.isAuthorizationPopupDisplayed();
  await mainPage.clickLoginBtn();
  await mainPage.isAuthorizationPopupDisplayed();
  await mainPage.areFieldErrorMsgsDisplayed(data.emptyFieldErrorMsg);
  await mainPage.isEmailFieldRedHighlighted();
  await mainPage.isPasswordFieldRedHighlighted();

  // Check the authorization with empty password field
  await mainPage.fillLoginEmailField(data.existingEmails[0]);
  await mainPage.clickLoginBtn();
  await mainPage.isAuthorizationPopupDisplayed();
  await mainPage.isEmailFieldNotRedHighlighted();
  await mainPage.isPasswordFieldRedHighlighted();
  await mainPage.isFieldErrorMsgDisplayed(data.emptyFieldErrorMsg);

  // Check the authorization after clearing the field
  await mainPage.clearLoginEmailField();
  await mainPage.isEmailFieldRedHighlighted();
  await mainPage.areFieldErrorMsgsDisplayed(data.emptyFieldErrorMsg);

  // Check the authorization with empty email field
  await mainPage.fillLoginPasswordField(data.validPassword);
  await mainPage.clickLoginBtn();
  await mainPage.isAuthorizationPopupDisplayed();
  await mainPage.isPasswordFieldNotRedHighlighted();
});
