import { test } from "../../fixtures/fixtures";
import { generateRandomCombination } from "../../utils/random.util";

const data: any = {
  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
};

let status: number;

test.describe("API testing", () => {
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
    const randomUnitName = "Test " + generateRandomCombination();
    const unitName = randomUnitName;
    status = await apiHelper.createUnit(unitName);
    await mainPage.toEqual(status, 201);

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
    await ownerUnitsPage.isWaitingUnitDisplayed(unitName);

    // Check the created unit status code (then delete)
    await mainPage.toBeTrue(await apiHelper.checkUnitResponseResults(unitName));
    await apiHelper.deleteUnit(unitName);
    await mainPage.toBeFalse(
      await apiHelper.checkUnitResponseResults(unitName)
    );
  });
});
