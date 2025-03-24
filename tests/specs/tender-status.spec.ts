import { test } from "../../fixtures/fixtures";

const data: any = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,

  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
};

let tender: { name: string; responseBodyTender: any };
let newTender: { name: string; responseBodyTender: any };

test.describe("Tender Status", () => {
  test.beforeEach(async ({ mainPage, headerPage, apiHelper }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
    await mainPage.waitForModalAccept();

    // Create the random tender via API
    tender = await apiHelper.createTender();

    // Check the created tender via API
    await mainPage.toBeTrue(
      await apiHelper.checkTenderResponseResultsById(
        tender.responseBodyTender.id
      )
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
    await apiHelper.approveTender(tender.responseBodyTender.id);

    // Check the tender display in "Активні" tab
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.isActiveTendersTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tender.name);
    await ownerTendersPage.isActiveTenderDisplayed(tender.name);
  });

  test("C256: Reject the tender", async ({
    ownerTendersPage,
    apiHelper,
    headerPage,
  }) => {
    // Reject the created tender via API
    await apiHelper.rejectTender(tender.responseBodyTender.id);

    // Check the tender display in "Відхилені" tab
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.clickRejectedTab();
    await ownerTendersPage.isRejectedTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tender.name);
    await ownerTendersPage.isRejectedTenderDisplayed(tender.name);
  });

  test("C257: Close the tender", async ({
    ownerTendersPage,
    apiHelper,
    headerPage,
  }) => {
    // Close the created tender via API
    await apiHelper.closeTender(tender.responseBodyTender.id);

    // Check the tender display in "Завершені" tab
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.clickClosedTab();
    await ownerTendersPage.isClosedTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tender.name);
    await ownerTendersPage.isClosedTenderDisplayed(tender.name);
  });

  test("C258: Delete the tender", async ({
    ownerTendersPage,
    apiHelper,
    mainPage,
    headerPage,
  }) => {
    // Close and delete the created tender via API
    await apiHelper.deleteTender(tender.responseBodyTender.id);

    // Create the new tender via API (to display the tabs)
    newTender = await apiHelper.createTender();

    // Check the new created tender via API
    await mainPage.toBeTrue(
      await apiHelper.checkTenderResponseResultsById(
        newTender.responseBodyTender.id
      )
    );

    // Close the new created tender via API
    await apiHelper.closeTender(newTender.responseBodyTender.id);

    // Check the deleted tender display in "Завершені" tab
    await headerPage.clickUserIcon();
    await headerPage.clickMyTendersLink();
    await ownerTendersPage.checkOwnerTendersURL();
    await ownerTendersPage.clickClosedTab();
    await ownerTendersPage.isClosedTabSelected();
    await ownerTendersPage.fillTenderSearchInput(tender.name);
    await ownerTendersPage.isClosedTenderNotDisplayed();
  });
});

test.afterEach(async ({ apiHelper, ownerTendersPage }) => {
  // Delete the created tender via API
  if (tender !== undefined) {
    await apiHelper.deleteTender(tender.responseBodyTender.id);
    await ownerTendersPage.toBeFalse(
      await apiHelper.checkTenderResponseResultsById(
        tender.responseBodyTender.id
      )
    );
  }

  if (newTender !== undefined) {
    // Delete the new created tender
    await apiHelper.deleteTender(newTender.responseBodyTender.id);
    await ownerTendersPage.toBeFalse(
      await apiHelper.checkTenderResponseResultsById(
        newTender.responseBodyTender.id
      )
    );
  }
});
