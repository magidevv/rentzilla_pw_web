import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test("C202: Authorization with valid phone and password", async ({
  mainPage,
  profilePage,
}) => {
  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  for (let i = 0; i < data.validPhones.length; i++) {
    // Click on the "Вхід" button
    await mainPage.clickHeaderLoginBtn();

    // Check the authorization with valid phone and password
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.fillLoginEmailField(data.validPhones[i]);
    await mainPage.isEmailFieldNotRedHighlighted();
    await mainPage.fillLoginPasswordField(data.validPassword);
    await mainPage.isPasswordFieldNotRedHighlighted();
    await mainPage.clickLoginBtn();
    await mainPage.clickUserIcon();
    await mainPage.isUserEmailDisplayed(data.existingEmails[0]);
    await mainPage.clickProfileLink();
    await profilePage.checkProfileURL();
    await profilePage.isUserPhoneNumberDisplayed(data.profilePhone);
    await profilePage.isUserPhoneNumberVerificated(data.verificationMsg);
    await profilePage.clickLogoutLink();
  }
});
