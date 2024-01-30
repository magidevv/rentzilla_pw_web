import { test } from "../../fixtures/fixtures";
import data from "../../utils/test-data.json";
import ApiHelper from "../../utils/API.helper";

test("C226: Verify 'У Вас залишилися питання?' form", async ({ mainPage }) => {
  // Open the «Rentzila» main page
  await mainPage.openMainURL();

  // Check the 'У Вас залишилися питання?' form display
  await mainPage.areFooterQuestionFormElementsDisplayed();

  // Check the empty form submit
  await mainPage.clickFooterQuestionFormSubmitBtn();
  await mainPage.areFooterQuestionFormFieldsRedHighlighted();
  await mainPage.areFooterQuestionFormErrorLabelsDisplayed(
    data.emptyFieldErrorMsg
  );

  // Check the form submit with empty phone number field
  await mainPage.fillFooterQuestionFormNameField(data.names);
  await mainPage.clickFooterQuestionFormSubmitBtn();
  await mainPage.isFooterQuestionFormNameFieldNotRedHighlighted();
  await mainPage.isFooterQuestionFormPhoneFieldRedHighlighted();

  //Check the prefilled phone number part
  await mainPage.clickFooterQuestionFormPhoneField();
  await mainPage.doesFooterQuestionFormPhoneHavePrefilledPart(
    data.prefilledPhoneNumberPart
  );

  // Check the form submit with empty phone number field
  await mainPage.fillFooterQuestionFormPhoneField(data.validPhones);
  await mainPage.clearFooterQuestionFormNameField();
  await mainPage.clickFooterQuestionFormSubmitBtn();
  await mainPage.isFooterQuestionFormNameFieldRedHighlighted();
  await mainPage.isFooterQuestionFormPhoneFieldNotRedHighlighted();

  // Check the phone number field validation with invalid phone numbers
  await mainPage.fillFooterQuestionFormNameField(data.names);
  for (const invalidPhone of data.invalidPhones) {
    await mainPage.fillFooterQuestionFormPhoneField(invalidPhone);
    await mainPage.clickFooterQuestionFormSubmitBtn();
    await mainPage.isFooterQuestionFormNameFieldNotRedHighlighted();
    await mainPage.isFooterQuestionFormPhoneFieldRedHighlighted();
    await mainPage.isFooterQuestionFormPhoneErrorLabelDisplayed(
      data.invalidPhoneNumberErrorMsg
    );
  }

  // Check the successful form submit with valid data
  await mainPage.fillFooterQuestionFormPhoneField(data.validPhones);
  await mainPage.clickFooterQuestionFormSubmitBtn();
  await mainPage.waitForModalAccept();

  //Check the feedback is present on the Feedbacks page
  // Fetch the feedback list from the API
  const apiHelper = new ApiHelper();
  const feedbackList = await apiHelper.getFeedbackList();
  await mainPage.isFoundFeedbackPresent(
    feedbackList,
    data.names,
    data.validPhones
  );
});
