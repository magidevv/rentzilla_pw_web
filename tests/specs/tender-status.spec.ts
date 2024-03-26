import { test } from "../../fixtures/fixtures";

const data: any = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,

  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
};

let tenderName: string;

test.describe("Tender Status", () => {
  test.beforeEach(async ({ mainPage, headerPage, apiHelper }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
    await mainPage.waitForModalAccept();

    // Create the random tender via API
    tenderName = await apiHelper.createTender();

    // Check the created tender via API
    await mainPage.toBeTrue(
      await apiHelper.checkTenderResponseResults(tenderName)
    );

    // Authorization with user account
    await headerPage.clickHeaderLoginBtn();
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.fillLoginEmailField(data.userEmail);
    await mainPage.fillLoginPasswordField(data.userPassword);
    await mainPage.clickLoginBtn();
  });

  test("C255: Approve the tender", async ({
    ownerTendersPage,
    apiHelper,
    headerPage,
  }) => {
    // Approve the created tender via API
    await apiHelper.approveTender(tenderName);

    // Check the tender display in "Активні" tab
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.isActiveTendersTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tenderName);
    await ownerTendersPage.isActiveTenderDisplayed(tenderName);
  });

  test("C256: Reject the tender", async ({
    ownerTendersPage,
    apiHelper,
    headerPage,
  }) => {
    // Reject the created tender via API
    await apiHelper.rejectTender(tenderName);

    // Check the tender display in "Відхилені" tab
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.clickRejectedTab();
    await ownerTendersPage.isRejectedTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tenderName);
    await ownerTendersPage.isRejectedTenderDisplayed(tenderName);
  });

  test("C257: Close the tender", async ({
    ownerTendersPage,
    apiHelper,
    headerPage,
  }) => {
    // Close the created tender via API
    await apiHelper.closeTender(tenderName);

    // Check the tender display in "Завершені" tab
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.clickClosedTab();
    await ownerTendersPage.isClosedTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tenderName);
    await ownerTendersPage.isClosedTenderDisplayed(tenderName);
  });

  test("C258: Delete the tender", async ({
    ownerTendersPage,
    apiHelper,
    headerPage,
  }) => {
    // Close and delete the created tender via API
    await apiHelper.deleteTender(tenderName);

    // Check the tender display in "Завершені" tab
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.clickClosedTab();
    await ownerTendersPage.isClosedTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tenderName);
    await ownerTendersPage.isClosedTenderNotDisplayed();
  });

  test.afterEach(async ({ apiHelper, mainPage }) => {
    // Delete the created tender via API
    await apiHelper.deleteTender(tenderName);
    await mainPage.toBeFalse(
      await apiHelper.checkTenderResponseResults(tenderName)
    );
  });
});