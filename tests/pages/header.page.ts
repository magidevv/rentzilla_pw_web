import { Page } from "@playwright/test";
import BasePage from "./base-page";

const logo: string = "//div[@data-testid='Navbar']//div[@data-testid='logo']";
const catalogBtn: string = "//div[contains(@class, 'NavbarCatalog_wrapper')]";
const catalogDropdown: string = "//div[contains(@class, 'Catalog_container')]";
const catalogSpecialMachinery: string =
  "//div[contains(@class, 'Catalog_container')]/div/div[contains(@class, 'Catalog_parent')][1]";
const catalogServices: string =
  "//div[contains(@class, 'Catalog_container')]/div/div[contains(@class, 'Catalog_parent')][2]";
const catalogItems: string =
  "//div[contains(@class, 'Catalog_container')]/div/div[contains(@class, 'CatalogItem_item')]";
const catalogSecondItems: string =
  "//div[contains(@class, 'Catalog_container')]/div[contains(@class, 'Catalog_listSecond')][1]/div[contains(@class, 'CatalogItem_item')]";
const headerLoginBtn: string =
  "//div[contains(@class, 'NavbarAuthBlock_buttonEnter')]";
const navbarUserIcon: string = "//div[@data-testid='avatarBlock']";
const profileDropdownMenu: string =
  "//div[contains(@class, 'ProfileDropdownMenu_container')]";
const profileDropdownMenuUserEmail: string = "//div[@data-testid='email']";
const profileDropdownMenuLogoutLink: string = "//div[@data-testid='logout']";
const profileDropdownMenuProfileLink: string = "//div[@data-testid='profile']";

class HeaderPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async clickLogo(): Promise<void> {
    await super.click(logo);
    await super.waitForLoad();
  }

  public async isCatalogBtnDisplayed(): Promise<void> {
    await super.isDisplayed(catalogBtn);
  }

  public async clickCatalogBtn(): Promise<void> {
    await super.click(catalogBtn);
  }

  public async areCatalogElementsDisplayed(
    specialMachineryLabel: string,
    servicesLabel: string
  ): Promise<void> {
    await super.isDisplayed(catalogDropdown);
    await super.isDisplayed(catalogSpecialMachinery);
    await super.toHaveText(catalogSpecialMachinery, specialMachineryLabel);
    await super.isDisplayed(catalogServices);
    await super.toHaveText(catalogServices, servicesLabel);
  }

  public async hoverCatalogSpecialMachinery(): Promise<void> {
    await super.hover(catalogSpecialMachinery);
  }

  public async areCatalogSpecialMachineryItemsDisplayed(
    ...items: string[]
  ): Promise<void> {
    await this.areDisplayed(catalogItems);
    for (const catalogItem of items) {
      await this.filteredDisplay(catalogItems, catalogItem);
    }
  }

  public async areCatalogSpecialMachinerySecondItemsDisplayed(
    ...items: string[]
  ): Promise<void> {
    await this.areDisplayed(catalogSecondItems);
    for (const catalogSecondItem of items) {
      await this.filteredDisplay(catalogSecondItems, catalogSecondItem);
    }
  }

  public async clickCatalogSpecialMachineryItem(
    countItem: number
  ): Promise<void> {
    await super.click(catalogItems + `[${countItem + 1}]`);
    await super.waitForLoad();
  }

  public async hoverCatalogSpecialMachineryItem(
    countItem: number
  ): Promise<void> {
    await super.hover(catalogItems + `[${countItem + 1}]`);
    await super.waitForLoad();
  }

  public async clickCatalogSpecialMachinerySecondItem(
    countItem: number
  ): Promise<void> {
    await super.click(catalogSecondItems + `[${countItem + 1}]`);
    await super.waitForLoad();
  }

  public async hoverCatalogServices(): Promise<void> {
    await super.hover(catalogServices);
  }

  public async areCatalogServicesItemsDisplayed(
    ...items: string[]
  ): Promise<void> {
    await this.areDisplayed(catalogItems);
    for (const catalogItem of items) {
      await this.filteredDisplay(catalogItems, catalogItem);
    }
  }

  public async hoverCatalogServicesItem(countItem: number): Promise<void> {
    await super.hover(catalogItems + `[${countItem + 1}]`);
    await super.waitForLoad();
  }

  public async areCatalogServicesSecondItemsDisplayed(): Promise<void> {
    await super.areDisplayed(catalogSecondItems);
  }

  public async clickHeaderLoginBtn(): Promise<void> {
    await super.click(headerLoginBtn);
  }

  public async clickUserIcon(): Promise<void> {
    await super.isDisplayed(navbarUserIcon);
    await super.click(navbarUserIcon);
  }

  public async isUserEmailDisplayed(email: string): Promise<void> {
    await super.isDisplayed(profileDropdownMenu);
    await super.isDisplayed(profileDropdownMenuUserEmail);
    await super.toHaveText(profileDropdownMenuUserEmail, email);
  }

  public async clickLogoutLink(): Promise<void> {
    await super.click(profileDropdownMenuLogoutLink);
  }

  public async clickProfileLink(): Promise<void> {
    await super.click(profileDropdownMenuProfileLink);
  }
}

export default HeaderPage;