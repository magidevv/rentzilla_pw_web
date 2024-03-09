import { Page } from "@playwright/test";
import BasePage from "./base-page";

const waitingUnitsTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][3]";
const activeUnitsTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][1]";
const unitCard: string = "//div[@data-testid='unitCard']";
const unitName: string = "//div[contains(@class, 'OwnerUnitCard_name')]";
const proposesBtn: string =
  "//button[contains(@class, 'ItemButtons_darkBlueBtn')]";

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
    await super.isDisplayed(unitCard);
    await super.toHaveText(unitName, name);
  }

  public async isActiveUnitsTabSelected(): Promise<void> {
    await super.doesElementAttrHaveValue(
      activeUnitsTab,
      "aria-selected",
      "true"
    );
  }

  public async isActiveUnitDisplayed(name: string): Promise<void> {
    await super.isDisplayed(unitCard);
    await super.toHaveText(unitName, name);
  }

  public async clickProposesBtn(): Promise<void> {
    await super.click(proposesBtn);
  }
}

export default OwnerUnitsPage;
