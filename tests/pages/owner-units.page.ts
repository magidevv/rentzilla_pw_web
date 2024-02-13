import { Page } from "@playwright/test";
import BasePage from "./base-page";

const waitingUnitsTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][3]";
const waitingUnit: string = "//div[@data-testid='unitCard']";
const waitingUnitName: string = "//div[contains(@class, 'OwnerUnitCard_name')]";

class OwnerUnitsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkOwnerUnitsURL(): Promise<void> {
    await super.doesPageHaveURL(/owner-units-page\/$/);
  }

  public async clickWaitingUnitsTab(): Promise<void> {
    await super.click(waitingUnitsTab);
  }

  public async isWaitingUnitDisplayed(name: string): Promise<void> {
    await super.isDisplayed(waitingUnit);
    await super.toHaveText(waitingUnitName, name);
  }
}

export default OwnerUnitsPage;
