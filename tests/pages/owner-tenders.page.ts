import { Page } from "@playwright/test";
import BasePage from "./base-page";

const createTenderButton: string = "//button[@data-testid='emptyBlockButton']";

const waitingTendersTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][3]";
const waitingTender: string = "//a[@data-testid='tenderLink']";
const waitingTenderName: string =
  "//div[contains(@class, 'CurrentItemInfo_name')]";

class OwnerTendersPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkOwnerTendersURL(): Promise<void> {
    await super.doesPageHaveURL(/owner-tenders-page\/$/);
  }

  public async clickCreateTenderBtn(): Promise<void> {
    await super.click(createTenderButton);
  }

  public async isWaitingTabSelected(): Promise<void> {
    await super.doesElementAttrHaveValue(
      waitingTendersTab,
      "aria-selected",
      "true"
    );
  }

  public async isWaitingTendersDisplayed(name: string): Promise<void> {
    await super.isDisplayed(waitingTender);
    await super.toHaveText(waitingTenderName, name);
  }
}

export default OwnerTendersPage;
