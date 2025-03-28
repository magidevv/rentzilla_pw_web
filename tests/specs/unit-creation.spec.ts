import { test } from "../../fixtures/fixtures";

const data: any = {
  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
};

let unit: { name: string; responseBodyUnit: any };

test.describe("Unit Creation", () => {
  test.beforeEach(async ({ mainPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
  });

  test("Check unit create (then delete)", async ({
    mainPage,
    headerPage,
    profilePage,
    ownerUnitsPage,
    apiHelper,
  }) => {
    // Create the random unit via API
    unit = await apiHelper.createUnit();
    await mainPage.toBeTrue(
      await apiHelper.checkUnitResponseResults(unit.responseBodyUnit.id)
    );

    // Click on the "Вхід" button
    await headerPage.clickHeaderLoginBtn();

    // Authorization with user account
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.fillLoginEmailField(data.userEmail);
    await mainPage.fillLoginPasswordField(data.userPassword);
    await mainPage.clickLoginBtn();

    // Check the created unit in "Очікуючі" tab
    await headerPage.clickUserIcon();
    await headerPage.clickProfileLink();
    await profilePage.checkProfileURL();
    await profilePage.clickUnitsLink();
    await profilePage.clickMyUnitsLink();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.clickWaitingUnitsTab();
    await ownerUnitsPage.fillUnitSearchInput(unit.name);
    await ownerUnitsPage.isWaitingUnitDisplayed(unit.name);
  });

  test.afterEach(async ({ apiHelper, mainPage }) => {
    // Delete the created unit via API
    await apiHelper.deleteUnit(unit.responseBodyUnit.id);
    await mainPage.toBeFalse(
      await apiHelper.checkUnitResponseResults(unit.responseBodyUnit.id)
    );
  });
});
