import { test } from "../../fixtures/fixtures";
import authorizationData from "../../utils/authorization-data.json";
import messagesData from "../../utils/messages-data.json";
import inputData from "../../utils/input-data.json";

test.describe("Consultation form", () => {
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
      messagesData.Errors.emptyField
    );

    // Check the form submit with empty phone number field
    await footerPage.fillQuestionFormNameField(authorizationData.Valid.name);
    await footerPage.clickQuestionFormSubmitBtn();
    await footerPage.isQuestionFormNameFieldNotRedHighlighted();
    await footerPage.isQuestionFormPhoneFieldRedHighlighted();

    //Check the prefilled phone number part
    await footerPage.clickQuestionFormPhoneField();
    await footerPage.doesQuestionFormPhoneHavePrefilledPart(
      inputData.prefilledPhoneNumberPart
    );

    // Check the form submit with empty phone number field
    await footerPage.fillQuestionFormPhoneField(
      authorizationData.Valid.phones[0]
    );
    await footerPage.clearQuestionFormNameField();
    await footerPage.clickQuestionFormSubmitBtn();
    await footerPage.isQuestionFormNameFieldRedHighlighted();
    await footerPage.isQuestionFormPhoneFieldNotRedHighlighted();

    // Check the phone number field validation with invalid phone numbers
    await footerPage.fillQuestionFormNameField(authorizationData.Valid.name);
    for (const invalidPhone of authorizationData.Invalid.phones) {
      await footerPage.fillQuestionFormPhoneField(invalidPhone);
      await footerPage.clickQuestionFormSubmitBtn();
      await footerPage.isQuestionFormNameFieldNotRedHighlighted();
      await footerPage.isQuestionFormPhoneFieldRedHighlighted();
      await footerPage.isQuestionFormPhoneErrorLabelDisplayed(
        messagesData.Errors.invalidPhoneNumber
      );
    }

    // Check the successful form submit with valid data
    await footerPage.fillQuestionFormPhoneField(
      authorizationData.Valid.phones[0]
    );
    await footerPage.clickQuestionFormSubmitBtn();
    await mainPage.waitForModalAccept();

    // Check the feedback is present (then delete)
    await mainPage.toBeTrue(
      await apiHelper.checkResponseResults(
        authorizationData.Valid.name,
        authorizationData.Valid.phones[0]
      )
    );
    await apiHelper.deleteFeedback(
      authorizationData.Valid.name,
      authorizationData.Valid.phones[0]
    );
    await mainPage.toBeFalse(
      await apiHelper.checkResponseResults(
        authorizationData.Valid.name,
        authorizationData.Valid.phones[0]
      )
    );
  });
});
