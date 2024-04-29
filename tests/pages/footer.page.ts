import { Page } from "@playwright/test";
import BasePage from "./base-page";

const mobileNavbarHomeBtn: string =
  "li[class^='MobileNavbar_item']:nth-child(1)";
const mobileNavbarProfileBtn: string =
  "li[class^='MobileNavbar_item']:nth-child(5)";
const footer: string = "//div[contains(@class, 'Footer_footer')]";
const footerLogo: string =
  "//div[contains(@class, 'Footer_footer')]//div[@data-testid='logo']";
const aboutUsLabel: string = "//div[@data-testid='content']";
const privacyPolicyLabel: string =
  "//div[@data-testid='politika-konfidenciinosti']/a";
const cookiePolicyLabel: string =
  "//div[@data-testid='pravila-vikoristannya-failiv-cookie']/a";
const termsConditionsLabel: string =
  "//div[@data-testid='umovi-dostupu-ta-koristuvannya']/a";
const toUsersLabel: string =
  "//div[contains(@class, 'RentzilaForBuyers_title')]";
const advertismentLabel: string = "//div[@data-testid='ogoloshennya']/a";
const tendersLabel: string = "//div[@data-testid='tenderi']/a";
const requestsForWorkLabel: string = "//div[@data-testid='zapiti-na-robotu']/a";
const contactsLabel: string =
  "//div[contains(@class, 'RentzilaContacts_title')]";
const companyEmail: string = "//a[contains(@class, 'RentzilaContacts_email')]";
const questionForm: string =
  "//div[contains(@class, 'ConsultationForm_container')]";
const questionFormTitle: string =
  "//div[contains(@class, 'ConsultationForm_container')]/h2[contains(@class, 'ConsultationForm_title')]";
const questionFormNameField: string =
  "//div[contains(@class, 'ConsultationForm_container')]//input[@name='name']";
const questionFormPhoneField: string =
  "//div[contains(@class, 'ConsultationForm_container')]//input[@type='tel']";
const questionFormSubmitBtn: string =
  "//div[contains(@class, 'ConsultationForm_container')]//button[@type='submit']";
const questionFormErrorLabels: string =
  "//div[contains(@class, 'ConsultationForm_container')]//p[contains(@class, 'ConsultationForm_error_message')]";

class FooterPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async tapMobileHomeBtn(): Promise<void> {
    await super.tap(mobileNavbarHomeBtn);
  }

  public async tapMobileProfileBtn(): Promise<void> {
    await super.tap(mobileNavbarProfileBtn);
    await super.waitForTimeout(500);
  }

  public async isFooterDisplayed(): Promise<void> {
    await super.isDisplayed(footer);
  }

  public async isFooterLogoClickable(): Promise<void> {
    await super.isDisplayed(footerLogo);
    await super.isNotClickable(footerLogo);
  }

  public async areFootersElementsDisplayed(): Promise<void> {
    await super.isDisplayed(aboutUsLabel);
    await super.isDisplayed(privacyPolicyLabel);
    await super.isDisplayed(cookiePolicyLabel);
    await super.isDisplayed(termsConditionsLabel);
    await super.isDisplayed(toUsersLabel);
    await super.isDisplayed(advertismentLabel);
    await super.isDisplayed(tendersLabel);
    await super.isDisplayed(requestsForWorkLabel);
    await super.isDisplayed(contactsLabel);
    await super.isDisplayed(companyEmail);
  }

  public async clickPrivacyPolicy(): Promise<void> {
    await super.click(privacyPolicyLabel);
  }

  public async clickCookiePolicy(): Promise<void> {
    await super.click(cookiePolicyLabel);
  }

  public async clickTermsConditions(): Promise<void> {
    await super.click(termsConditionsLabel);
  }

  public async clickAdvertisment(): Promise<void> {
    await super.click(advertismentLabel);
  }

  public async clickTenders(): Promise<void> {
    await super.click(tendersLabel);
  }

  public async tapPrivacyPolicy(): Promise<void> {
    await super.tap(privacyPolicyLabel);
  }

  public async tapCookiePolicy(): Promise<void> {
    await super.tap(cookiePolicyLabel);
  }

  public async tapTermsConditions(): Promise<void> {
    await super.tap(termsConditionsLabel);
  }

  public async tapAdvertisment(): Promise<void> {
    await super.tap(advertismentLabel);
  }

  public async tapTenders(): Promise<void> {
    await super.tap(tendersLabel);
  }

  public async isEmailClickable(): Promise<void> {
    await super.isClickable(companyEmail);
  }

  public async areQuestionFormElementsDisplayed(): Promise<void> {
    await super.isDisplayed(questionForm);
    await super.isDisplayed(questionFormTitle);
    await super.isDisplayed(questionFormNameField);
    await super.isDisplayed(questionFormPhoneField);
    await super.isDisplayed(questionFormSubmitBtn);
  }

  public async clickQuestionFormSubmitBtn(): Promise<void> {
    await super.click(questionFormSubmitBtn);
  }

  public async areQuestionFormFieldsRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(questionFormNameField);
    await super.isFieldRedHighlighted(questionFormPhoneField);
  }

  public async areQuestionFormErrorLabelsDisplayed(
    errorMsg: string
  ): Promise<void> {
    await super.filteredDisplay(questionFormErrorLabels, errorMsg);
  }

  public async fillQuestionFormNameField(name: string): Promise<void> {
    await super.setValue(questionFormNameField, name);
  }

  public async fillQuestionFormPhoneField(phone: string): Promise<void> {
    await super.setValue(questionFormPhoneField, phone);
  }

  public async isQuestionFormNameFieldNotRedHighlighted(): Promise<void> {
    await super.isFieldNotRedHighlighted(questionFormNameField);
  }

  public async isQuestionFormPhoneFieldRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(questionFormPhoneField);
  }

  public async clickQuestionFormPhoneField(): Promise<void> {
    await super.click(questionFormPhoneField);
  }

  public async doesQuestionFormPhoneHavePrefilledPart(
    prefilledPart: string
  ): Promise<void> {
    await super.toHaveValue(questionFormPhoneField, prefilledPart);
  }

  public async clearQuestionFormNameField(): Promise<void> {
    await super.clearValue(questionFormNameField);
  }

  public async isQuestionFormNameFieldRedHighlighted(): Promise<void> {
    await super.isFieldRedHighlighted(questionFormNameField);
  }

  public async isQuestionFormPhoneFieldNotRedHighlighted(): Promise<void> {
    await super.isFieldNotRedHighlighted(questionFormPhoneField);
  }

  public async isQuestionFormPhoneErrorLabelDisplayed(
    errorMsg: string
  ): Promise<void> {
    await super.toHaveText(questionFormErrorLabels, errorMsg);
  }
}

export default FooterPage;
