import { Page } from "@playwright/test";
import BasePage from "./base-page";

const waitingUnitsTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][3]";
const activeUnitsTab: string =
  "//button[contains(@class, 'MuiButtonBase-root MuiTab-root')][1]";
const unitCard: string = "//div[@data-testid='unitCard']";
const unitName: string = "//div[contains(@class, 'OwnerUnitCard_name')]";
const unitManufacturer: string = "//div[@data-testid='manufacturer']";
const unitCategory: string =
  "//div[contains(@class, 'OwnerUnitCard_category')]";
const unitCreatedDate: string =
  "//div[contains(@class, 'OwnerUnitCard_dateWithDot')]/div[2]";
const proposesBtn: string =
  "//button[contains(@class, 'ItemButtons_darkBlueBtn')]";
const activeEditBtn: string =
  "//button[contains(@class, 'ItemButtons_lightBlueBtn')]";
const waitingEditBtn: string =
  "//button[contains(@class, 'ItemButtons_darkBlueBtn')]";
const noActiveUnitsMsg: string = "//div[@data-testid='title']";
const unitSearchInput: string = "//div[@data-testid='search']/input";
const resetFiltersBtn: string = "//button[@data-testid='emptyBlockButton']";
const unitNotFoundMsg: string = "//div[@data-testid='title']";

class OwnerUnitsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkOwnerUnitsURL(): Promise<void> {
    await super.doesPageHaveURL(/\/owner-units-page\/$/);
  }

  public async fillUnitSearchInput(name: string): Promise<void> {
    await super.setValue(unitSearchInput, name);
  }

  public async resetUnitSearchInput(): Promise<void> {
    await super.click(resetFiltersBtn);
  }

  public async isUnitNotFoundMsgDisplayed(msg: string): Promise<void> {
    await super.toHaveText(unitNotFoundMsg, msg);
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

  public async clickActiveEditBtn(): Promise<void> {
    await super.click(activeEditBtn);
    await super.waitForTimeout(1000);
  }

  public async clickWaitingEditBtn(): Promise<void> {
    await super.click(waitingEditBtn);
    await super.waitForTimeout(1000);
  }

  public async checkUnitDisplay(
    name: string,
    notFoundMsg: string,
    noActiveMsg: string
  ): Promise<void> {
    if (await super.isVisible(unitCard)) {
      await this.fillUnitSearchInput(name);
      await super.toHaveText(unitNotFoundMsg, notFoundMsg);
    } else {
      await super.toHaveText(noActiveUnitsMsg, noActiveMsg);
    }
  }

  public async checkUnitData(
    name: string,
    manufacturer: string,
    category: string,
    date: string
  ): Promise<void> {
    await super.toHaveText(unitName, name);
    await super.toHaveText(unitManufacturer, manufacturer);
    await super.toContainText(unitCategory, category);
    await super.toHaveText(unitCreatedDate, date);
  }

  public async checkUnitManufacturer(manufacturer: string): Promise<void> {
    await super.toHaveText(unitManufacturer, manufacturer);
  }

  public async clickUnitCard(): Promise<void> {
    await super.click(unitCard);
    await super.waitForTimeout(2000);
  }
}

export default OwnerUnitsPage;
