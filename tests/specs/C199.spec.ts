import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test("C199: Reset the password with invalid email", async ({ mainPage }) => {
  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  // Click on the "Вхід" button
  await mainPage.clickHeaderLoginBtn();

  // Check the password reset with empty email field
  await mainPage.isAuthorizationPopupDisplayed();
  await mainPage.clickForgotPasswordLink();
  await mainPage.isRestorePasswordPopupDisplayed();
  await mainPage.clickRecaptchaCheckbox();
  await mainPage.clickSubmitRestorePasswordBtn();
  await mainPage.isFieldErrorMsgDisplayed(data.emptyFieldErrorMsg);

  // Check the password reset closing
  await mainPage.fillRestorePasswordEmailField(data.existingEmails);
  await mainPage.clickRestorePasswordCrossIcon();
  await mainPage.isRestorePasswordPopupNotDisplayed();

  // Check the password reset with invalid email
  await mainPage.clickForgotPasswordLink();
  for (const invalidEmail of data.invalidEmails) {
    await mainPage.fillRestorePasswordEmailField(invalidEmail);
    await mainPage.clickRecaptchaCheckbox();
    await mainPage.clickSubmitRestorePasswordBtn();
    await mainPage.isFieldErrorMsgDisplayed(data.invalidEmailErrorMsg);
    await mainPage.isRestorePasswordPopupDisplayed();
  }

  // Check the password reset with non-existing email
  await mainPage.fillRestorePasswordEmailField(data.nonExistingEmails);
  await mainPage.clickRecaptchaCheckbox();
  await mainPage.pressRestorePasswordEmailFieldEnter();
  await mainPage.isRestoreErrorMsgDisplayed(data.nonExistingEmailErrorMsg);
});
