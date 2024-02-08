import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";

test.describe("C220 Tests", () => {
  test.beforeEach(async ({ mainPage }) => {
    // Open the «Rentzila» main page
    await mainPage.openMainURL();
  });

  test("C226: Verify 'У Вас залишилися питання?' form", async ({
    mainPage,
    footerPage,
    apiHelper,
  }) => {
    // Check the 'У Вас залишилися питання?' form display
    await footerPage.areQuestionFormElementsDisplayed();

    // Check the empty form submit
    await footerPage.clickQuestionFormSubmitBtn();
    await footerPage.areQuestionFormFieldsRedHighlighted();
    await footerPage.areQuestionFormErrorLabelsDisplayed(
      data.emptyFieldErrorMsg
    );

    // Check the form submit with empty phone number field
    await footerPage.fillQuestionFormNameField(data.names);
    await footerPage.clickQuestionFormSubmitBtn();
    await footerPage.isQuestionFormNameFieldNotRedHighlighted();
    await footerPage.isQuestionFormPhoneFieldRedHighlighted();

    //Check the prefilled phone number part
    await footerPage.clickQuestionFormPhoneField();
    await footerPage.doesQuestionFormPhoneHavePrefilledPart(
      data.prefilledPhoneNumberPart
    );

    // Check the form submit with empty phone number field
    await footerPage.fillQuestionFormPhoneField(data.validPhones[0]);
    await footerPage.clearQuestionFormNameField();
    await footerPage.clickQuestionFormSubmitBtn();
    await footerPage.isQuestionFormNameFieldRedHighlighted();
    await footerPage.isQuestionFormPhoneFieldNotRedHighlighted();

    // Check the phone number field validation with invalid phone numbers
    await footerPage.fillQuestionFormNameField(data.names);
    for (const invalidPhone of data.invalidPhones) {
      await footerPage.fillQuestionFormPhoneField(invalidPhone);
      await footerPage.clickQuestionFormSubmitBtn();
      await footerPage.isQuestionFormNameFieldNotRedHighlighted();
      await footerPage.isQuestionFormPhoneFieldRedHighlighted();
      await footerPage.isQuestionFormPhoneErrorLabelDisplayed(
        data.invalidPhoneNumberErrorMsg
      );
    }

    // Check the successful form submit with valid data
    await footerPage.fillQuestionFormPhoneField(data.validPhones[0]);
    await footerPage.clickQuestionFormSubmitBtn();
    await mainPage.waitForModalAccept();

    // Check the feedback is present (then delete)
    await mainPage.toBeTrue(
      await apiHelper.checkResponseResults(data.names, data.validPhones[0])
    );
    if (await apiHelper.checkResponseResults(data.names, data.validPhones[0])) {
      await apiHelper.deleteFeedback(data.names, data.validPhones[0]);
    }
  });
});
