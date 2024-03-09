import { test } from "../../fixtures/fixtures";
import path from "path";
import { datePeriod } from "../../utils/unit-propose-data";
import { validUnitProposeData } from "../../utils/unit-propose-data";

const data: any = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,

  userEmail: process.env.USER_EMAIL,
  userPassword: process.env.USER_PASSWORD,
};

const filePath: any = {
  profileImage: path.resolve("data/", "test.png"),
};

test.describe("Unit propose sending", () => {
  test.beforeEach(async ({ mainPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
  });

  test("Verify that user is able to send propose to unit", async ({
    mainPage,
    headerPage,
    productsPage,
    unitPage,
    ownerUnitsPage,
    unitProposesPage,
    unitProposeDetailsPage,
    apiHelper,
  }) => {
    // Create the random unit via API
    const unitName = await apiHelper.createUnit();

    // Check the created unit and approve via API
    await mainPage.toBeTrue(await apiHelper.checkUnitResponseResults(unitName));
    await apiHelper.approveUnit(unitName);

    // Click on the "Вхід" button
    await headerPage.clickHeaderLoginBtn();

    // Authorization with admin account
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.fillLoginEmailField(data.adminEmail);
    await mainPage.fillLoginPasswordField(data.adminPassword);
    await mainPage.clickLoginBtn();

    // Find the created unit in search
    await headerPage.clickUnitsLink();
    await productsPage.fillSearchInputField(unitName);
    await productsPage.isSearchUnitItemDisplayed(unitName);
    await productsPage.clickSearchUnitItem();
    await unitPage.doesUnitTitleHaveText(unitName);

    // Check propose sending on created unit
    await unitPage.clickOrderBtn();
    await unitPage.isOrderPopupDisplayed("Замовити техніку", unitName);
    await unitPage.clickRentalPeriodDateField();
    await unitPage.areCalendarsDisplayed();
    await unitPage.selectRentalPeriodDate(2);
    await unitPage.uploadAdditionalFiles(filePath.profileImage);
    await unitPage.fillCommentTextarea(validUnitProposeData.comment);
    await unitPage.clickSubmitBtn();
    await unitPage.isSuccessOrderPopupDisplayed(
      "Ваша заявка на оренду техніки відправлена",
      "Очікуйте будь-ласка!Коли власник техніки підтвердить Ваше замовлення у Вас з’явиться можливість зв’язатися з ним."
    );
    await unitPage.closeSuccessOrderPopup();

    // Logout from admin account
    await headerPage.clickUserIcon();
    await headerPage.clickLogoutLink();

    // Authorization with user account
    await headerPage.clickHeaderLoginBtn();
    await mainPage.isAuthorizationPopupDisplayed();
    await mainPage.fillLoginEmailField(data.userEmail);
    await mainPage.fillLoginPasswordField(data.userPassword);
    await mainPage.clickLoginBtn();

    // Check the propose display and the data content entered as admin
    await headerPage.clickUserIcon();
    await headerPage.clickMyUnitsLink();
    await ownerUnitsPage.checkOwnerUnitsURL();
    await ownerUnitsPage.isActiveUnitsTabSelected();
    await ownerUnitsPage.isActiveUnitDisplayed(unitName);
    await ownerUnitsPage.clickProposesBtn();
    await unitProposesPage.checkUnitProposesURL();
    await unitProposesPage.checkProposeUnit(unitName);
    await unitProposesPage.checkPropose(
      validUnitProposeData.userName,
      datePeriod(2),
      validUnitProposeData.fileName
    );
    await unitProposesPage.clickProposeDetailsBtn();
    await unitProposeDetailsPage.checkUnitProposeDetailsURL();
    await unitProposeDetailsPage.checkProposeUnit(unitName);
    await unitProposeDetailsPage.checkProposeDetails(
      validUnitProposeData.userNameTitle,
      datePeriod(2),
      validUnitProposeData.fileName,
      validUnitProposeData.comment
    );

    // Delete the created unit via API
    await apiHelper.deleteUnit(unitName);
    await mainPage.toBeFalse(
      await apiHelper.checkUnitResponseResults(unitName)
    );
  });
});
