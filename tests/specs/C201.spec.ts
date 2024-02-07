import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test("C201: Authorization with valid email and password", async ({
  mainPage,
}) => {
  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  for (let i = 0; i < data.existingEmails.length; i++) {
    // Click on the "Вхід" button
    await mainPage.clickHeaderLoginBtn();

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
    await mainPage.clickUserIcon();
    await mainPage.isUserEmailDisplayed(data.existingEmails[i].toLowerCase());

    // Check logout
    await mainPage.clickLogoutLink();
  }
});
