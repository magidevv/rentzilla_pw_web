import { Page } from "@playwright/test";
import BasePage from "./base-page";

const unitCard: string = "//div[@data-testid='unitCard']";
const unitName: string = "//div[contains(@class, 'OwnerUnitCard_name')]";
const proposeDetailsCard: string =
  "//div[contains(@class, 'OrderDetails_infoBlock')]";
const proposeUserName: string = "//div[@data-testid='selectedUserTitle']";
const proposePeriodDate: string =
  "//div[contains(@class, 'InfoOrderPeriod_wrapper')]";
const proposeFileName: string =
  "//div[contains(@class, 'AdditionalFilesList_fileName')]";
const proposeComment: string =
  "//div[contains(@class, 'OrderDetails_comment')]";

class UnitProposeDetailsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkUnitProposeDetailsURL(): Promise<void> {
    await super.doesPageHaveURL(/\/order-details\//);
  }

  public async checkProposeUnit(name: string): Promise<void> {
    await super.isDisplayed(unitCard);
    await super.toHaveText(unitName, name);
  }

  public async checkProposeDetails(
    userName: string,
    // period: string,
    fileName: string,
    comment: string
  ): Promise<void> {
    await super.isDisplayed(proposeDetailsCard);
    await super.toHaveText(proposeUserName, userName);
    // await super.toHaveText(proposePeriodDate, period);
    await super.toHaveText(proposeFileName, fileName);
    await super.toHaveText(proposeComment, comment);
  }
}

export default UnitProposeDetailsPage;
