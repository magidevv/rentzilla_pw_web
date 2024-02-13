import { Page } from "@playwright/test";
import BasePage from "./base-page";

const phoneNumberField: string =
  "//input[@data-testid='input_OwnerProfileNumber']";
const phoneNumberVerificationMsg: string =
  "//div[@data-testid='verification_OwnerProfileNumber']";
const logoutLink: string = "//div[@data-testid='logOut']";
const unitsLink: string =
  "//div[contains(@class, 'LeftSideOwnCabinetCategory_wrapper')][1]";
const myUnitsLink: string = "//div[@data-testid='variant'][1]";

class ProfilePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkProfileURL(): Promise<void> {
    await super.doesPageHaveURL(/\/owner-cabinet\//);
  }

  public async isUserPhoneNumberDisplayed(phone: string): Promise<void> {
    await super.isDisplayed(phoneNumberField);
    await super.toHaveValue(phoneNumberField, phone);
  }

  public async isUserPhoneNumberVerificated(msg: string): Promise<void> {
    await super.isDisplayed(phoneNumberVerificationMsg);
    await super.toHaveText(phoneNumberVerificationMsg, msg);
  }

  public async clickLogoutLink(): Promise<void> {
    await super.click(logoutLink);
    await super.waitForLoad();
  }

  public async clickUnitsLink(): Promise<void> {
    await super.click(unitsLink);
  }

  public async clickMyUnitsLink(): Promise<void> {
    await super.click(myUnitsLink);
    await super.waitForLoad();
  }
}

export default ProfilePage;
