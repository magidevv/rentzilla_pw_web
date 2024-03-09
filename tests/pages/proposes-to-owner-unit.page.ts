import { Page } from "@playwright/test";
import BasePage from "./base-page";

const unitCard: string = "//div[@data-testid='unitCard']";
const unitName: string = "//div[contains(@class, 'OwnerUnitCard_name')]";
const proposeCard: string =
  "//div[contains(@class, 'ProposeOrderCard_wrapper')]";
const proposeUserName: string = "//div[@data-testid='userName']";
const proposePeriodDate: string =
  "//div[contains(@class, 'InfoOrderPeriod_wrapper')]";
const proposeFileName: string =
  "//div[contains(@class, 'ProposeOrderCard_nameDoc')]";
const proposeDetailsBtn: string =
  "//button[contains(@class, 'ItemButtons_lightBlueBtn')]";

class UnitProposesPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkUnitProposesURL(): Promise<void> {
    await super.doesPageHaveURL(/\/proposes-to-owner-unit\//);
  }

  public async checkProposeUnit(name: string): Promise<void> {
    await super.isDisplayed(unitCard);
    await super.toHaveText(unitName, name);
  }

  public async checkPropose(
    userName: string,
    period: string,
    fileName: string
  ): Promise<void> {
    await super.isDisplayed(proposeCard);
    await super.toHaveText(proposeUserName, userName);
    await super.toHaveText(proposePeriodDate, period);
    await super.toHaveText(proposeFileName, fileName);
  }

  public async clickProposeDetailsBtn(): Promise<void> {
    await super.click(proposeDetailsBtn);
  }
}

export default UnitProposesPage;
