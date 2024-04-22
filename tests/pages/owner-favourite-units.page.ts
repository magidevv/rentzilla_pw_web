import { Page } from "@playwright/test";
import BasePage from "./base-page";

const emptyFavUnitsTitle = "//div[@data-testid='title']";
const toUnitListBtn = "//button[@data-testid='emptyBlockButton']";
const unitCard: string = "//div[@data-testid='unitCard']";
const unitName: string = "//div[contains(@class, 'OwnerUnitCard_name')]";
const unitSearchInput: string = "//div[@data-testid='search']/input";
const resetFiltersBtn: string = "//button[@data-testid='emptyBlockButton']";
const unitNotFoundMsg: string = "//div[@data-testid='title']";
const unitCategorySelect: string = "//div[@data-testid='search'][2]";
const unitCategorySelectedItem: string =
  "(//span[contains(@class, 'CustomSelect_value')])[1]";
const unitCategoryItem: string = "//li[@data-testid='item-customSelect']";
const unitSortSelect: string = "(//div[@data-testid='div_CustomSelect'])[2]";
const unitSortSelectedItem: string =
  "(//span[contains(@class, 'CustomSelect_value')])[2]";
const unitSortItem: string = "//li[@data-testid='item-customSelect']";
const unitCategoryName: string =
  "//div[contains(@class, 'OwnerUnitCard_category')]";
const showMoreBtn: string = "//button[@data-testid='showMore']";
const removeFavUnitsBtn: string =
  "//button[contains(@class, 'OwnerFavouriteUnitsPage_removeList')]";
const popupTitle: string = "//div[contains(@class, 'PopupLayout_label')]";
const popupCancelBtn: string =
  "//button[contains(@class, 'ItemButtons_lightRedBtn')]";
const popupSubmitBtn: string =
  "//button[contains(@class, 'ItemButtons_darkBlueBtn')]";
const closeIcon: string = "//div[@data-testid='closeIcon']";
const paginationNav: string = "//ul[@aria-label='Pagination']";
const prevPageBtn: string = "//a[@aria-label='Previous page']";
const nextPageBtn: string = "//a[@aria-label='Next page']";
const paginationItem: string = "(//a[contains(@class, 'Pagination_page')])";
const paginationItemBG: string = "//ul[@aria-label='Pagination']/li";

class OwnerFavUnitsPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  public async checkOwnerFavUnitsURL(): Promise<void> {
    await super.doesPageHaveURL(/\/owner-favourite-units\//);
  }

  public async isEmptyFavUnitsMsgDisplayed(title: string): Promise<void> {
    await super.toHaveText(emptyFavUnitsTitle, title);
    await super.isDisplayed(toUnitListBtn);
  }

  public async clickToUnitListBtn(): Promise<void> {
    await super.click(toUnitListBtn);
  }

  public async isFavUnitDisplayed(name: string): Promise<void> {
    await super.toHaveText(unitName, name);
  }

  public async isUnitNotDisplayed(): Promise<void> {
    await super.isNotDisplayed(unitCard);
  }

  public async areUnitsDisplayed(): Promise<void> {
    await super.areDisplayed(unitCard);
  }

  public async fillUnitSearchInput(name: string): Promise<void> {
    await super.setValue(unitSearchInput, name);
  }

  public async pressEnterUnitSearchInput(): Promise<void> {
    await super.press(unitSearchInput, "Enter");
  }

  public async isUnitSearchInputPlaceholderDisplayed(
    placeholder: string
  ): Promise<void> {
    await super.doesElementAttrHaveValue(
      unitSearchInput,
      "placeholder",
      placeholder
    );
  }

  public async resetUnitSearchInput(): Promise<void> {
    await super.click(resetFiltersBtn);
  }

  public async checkUnitDisplay(
    prompt: string,
    notFoundMsg: string
  ): Promise<void> {
    if (await super.isVisible(unitCard)) {
      await super.elementsToContainText(unitName, prompt);
    } else {
      await super.toHaveText(unitNotFoundMsg, new RegExp(notFoundMsg));
      await super.isDisplayed(resetFiltersBtn);
    }
  }

  public async checkUnitsDisplay(notFoundMsg: string): Promise<void> {
    if (await super.isVisible(unitCard)) {
      await super.areDisplayed(unitCard);
    } else {
      await super.toHaveText(unitNotFoundMsg, new RegExp(notFoundMsg));
      await super.isDisplayed(resetFiltersBtn);
    }
  }

  public async isNonExistentUnitDisplayed(notFoundMsg: string): Promise<void> {
    await super.toHaveText(unitNotFoundMsg, new RegExp(notFoundMsg));
    await super.isDisplayed(resetFiltersBtn);
  }

  public async clickFirstUnit(): Promise<void> {
    await super.clickFirst(unitCard);
  }

  public async isSelectedCategoryItemDisplayed(): Promise<void> {
    await super.toHaveText(unitCategorySelectedItem, "Всі категорії");
  }

  public async selectCategoryItem(count: number): Promise<void> {
    await super.click(unitCategorySelect);
    await super.click(unitCategoryItem + `[${count}]`);
  }

  public async checkUnitCategoryName(category: string): Promise<void> {
    await super.doesFirstContainText(unitCategoryName, category);
  }

  public async checkAllUnitsCount(count: number): Promise<void> {
    await super.toHaveCount(unitCard, count);
  }

  public async clickShowMoreBtn(): Promise<void> {
    await super.click(showMoreBtn);
  }

  public async clickRemoveFavUnitsBtn(): Promise<void> {
    await super.click(removeFavUnitsBtn);
  }

  public async isRemoveFavUnitsPopupDisplayed(): Promise<void> {
    await super.toHaveText(popupTitle, "Очистити список обраних оголошень?");
  }

  public async isRemoveFavUnitsPopupNotDisplayed(): Promise<void> {
    await super.isNotDisplayed(popupTitle);
  }

  public async clickRemoveFavUnitsPopupCancelBtn(): Promise<void> {
    await super.click(popupCancelBtn);
  }

  public async clickRemoveFavUnitsPopupSubmitBtn(): Promise<void> {
    await super.click(popupSubmitBtn);
  }

  public async closeRemoveFavUnitsPopup(): Promise<void> {
    await super.click(closeIcon);
  }

  public async isSelectedSortItemDisplayed(sort: string): Promise<void> {
    await super.toHaveText(unitSortSelectedItem, sort);
  }

  public async selectSortItem(count: number): Promise<void> {
    await super.click(unitSortSelect);
    await super.click(unitSortItem + `[${count}]`);
  }

  public async checkUnitsSortByName(names: string[]): Promise<void> {
    let unitNames = await super.getElementsText(unitName);
    unitNames = unitNames.map((name) => name.toLowerCase());
    names = names.map((name) => name.toLowerCase());
    const sortedUnitNames = names.sort();
    await super.toEqual(unitNames, sortedUnitNames);
  }

  public async isPaginationNavDisplayed(pages: number): Promise<void> {
    await super.isDisplayed(paginationNav);
    await super.toHaveCount(paginationItem, pages);
  }

  public async isNextPageBtnDisabled(): Promise<void> {
    await super.isDisabled(nextPageBtn);
  }

  public async clickNextPageBtn(): Promise<void> {
    await super.click(nextPageBtn);
  }

  public async clickPrevPageBtn(): Promise<void> {
    await super.click(prevPageBtn);
  }

  public async doubleClickNextPageBtn(): Promise<void> {
    await super.doubleClick(nextPageBtn);
  }

  public async doubleClickPrevPageBtn(): Promise<void> {
    await super.doubleClick(prevPageBtn);
  }

  public async isPrevPageBtnDisabled(): Promise<void> {
    await super.isDisabled(prevPageBtn);
  }

  public async isPaginationItemSelected(page: number): Promise<void> {
    await super.doesElementAttrHaveValue(
      paginationItem + `[${page}]`,
      "aria-current",
      "page"
    );
    await super.toHaveCSS(
      paginationItemBG + `[${page + 1}]`,
      "background-color",
      "rgba(219, 237, 243, 0.6)"
    );
  }
}

export default OwnerFavUnitsPage;
