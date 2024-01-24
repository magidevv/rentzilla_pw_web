import { expect, Locator, Page } from "@playwright/test";

class BasePage {
  public page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  public async openURL(url: string): Promise<void> {
    await this.page.goto(url);
    await this.page.waitForLoadState("load");
  }

  public async getURL(): Promise<string> {
    return this.page.url();
  }

  public async waitForTimeout(milliseconds: number): Promise<void> {
    await this.page.waitForTimeout(milliseconds);
  }

  public async waitForLoad(): Promise<void> {
    await this.page.waitForLoadState("load");
  }

  public async doesPageHaveURL(URL: RegExp): Promise<void> {
    await expect(await this.page).toHaveURL(URL);
  }

  public async click(element: Locator): Promise<void> {
    await element.click();
  }

  public async clickAll(element: Locator): Promise<void> {
    const items = await element.all();
    for (const item of items) {
      await this.click(item);
    }
  }

  public async setValue(element: Locator, value: string): Promise<void> {
    await (await element).fill(value);
  }

  public async isDisplayed(element: Locator, timeout = 15000): Promise<void> {
    await expect(await element).toBeVisible({ timeout: timeout });
  }

  public async areDisplayed(element: Locator): Promise<void> {
    const items = await element.all();
    for (const item of items) {
      await this.isDisplayed(item);
    }
  }

  public async getText(element: Locator): Promise<string> {
    const textContent = await element?.textContent();
    return textContent ?? "";
  }

  public async toHaveCount(element: Locator, value: number): Promise<void> {
    await expect(await element).toHaveCount(value);
  }

  public async isChecked(element: Locator): Promise<void> {
    await expect(await element).toBeChecked();
  }
}

export default BasePage;
