import { Page } from "@playwright/test";
import BasePage from "./base-page";

const createTenderButton: string = "//button[@data-testid='emptyBlockButton']";

const waitingTendersTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][3]";
const rejectedTendersTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][4]";
const activeTendersTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][1]";
const tenderCard: string = "//a[@data-testid='tenderLink']";
const tenderName: string = "//div[contains(@class, 'CurrentItemInfo_name')]";
const tenderCategory: string =
  "//div[contains(@class, 'CurrentItemInfo_category')]";
const tenderCreatedDate: string =
  "(//div[contains(@class, 'ParagraphWithIcon_paragraph')])[1]";
const tenderPrice: string =
  "//div[contains(@class, 'CurrentItemPrice_price_')]";
const tenderPlace: string =
  "(//div[contains(@class, 'ParagraphWithIcon_paragraph')])[2]";
const editBtn: string =
  "//button[contains(@class, 'CurrentTenderButtons_fillBtn')]";
const noActiveTendersMsg: string = "//div[@data-testid='title']";

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

  public async clickWaitingTab(): Promise<void> {
    await super.click(waitingTendersTab);
  }

  public async isWaitingTabSelected(): Promise<void> {
    await super.doesElementAttrHaveValue(
      waitingTendersTab,
      "aria-selected",
      "true"
    );
  }

  public async isWaitingTenderDisplayed(name: string): Promise<void> {
    await super.isDisplayed(tenderCard);
    await super.toHaveText(tenderName, name);
  }

  public async clickRejectedTab(): Promise<void> {
    await super.click(rejectedTendersTab);
  }

  public async isRejectedTabSelected(): Promise<void> {
    await super.doesElementAttrHaveValue(
      rejectedTendersTab,
      "aria-selected",
      "true"
    );
  }

  public async isRejectedTenderDisplayed(name: string): Promise<void> {
    await super.isDisplayed(tenderCard);
    await super.toHaveText(tenderName, name);
  }

  public async isActiveTendersTabSelected(): Promise<void> {
    await super.doesElementAttrHaveValue(
      activeTendersTab,
      "aria-selected",
      "true"
    );
  }

  public async isActiveTenderDisplayed(name: string): Promise<void> {
    await super.isDisplayed(tenderCard);
    await super.toHaveText(tenderName, name);
  }

  public async clickEditBtn(): Promise<void> {
    await super.click(editBtn);
    await super.waitForTimeout(1000);
  }

  public async checkTenderDisplay(name: string, msg: string): Promise<void> {
    if (await super.isVisible(tenderCard)) {
      await super.notToHaveText(tenderName, name);
    } else {
      await super.toHaveText(noActiveTendersMsg, msg);
    }
  }

  public async checkTenderData(
    name: string,
    service: string,
    date: string,
    place: string,
    price: string
  ): Promise<void> {
    await super.toHaveText(tenderName, name);
    await super.toContainText(tenderCategory, service);
    await super.toHaveText(tenderCreatedDate, date);
    await super.toHaveText(tenderPlace, place);
    await super.toHaveTextWithoutSpaces(tenderPrice, price);
  }

  public async clickTenderCard(): Promise<void> {
    await super.click(tenderCard);
    await super.waitForTimeout(2000);
  }
}

export default OwnerTendersPage;
