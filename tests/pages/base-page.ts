import { expect, type Locator, type Page } from "@playwright/test";

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

  public async doesPageHaveURL(URL: string): Promise<void> {
    await expect(await this.page).toHaveURL(URL);
  }

  public async doesPageURLContainText(text: string): Promise<void> {
    await expect(await this.page.url()).toContain(text);
  }

  public async click(element: Locator): Promise<void> {
    await element.click();
  }

  public async setValue(element: Locator, value: string): Promise<void> {
    await (await element).fill(value);
  }

  public async isDisplayed(element: Locator, timeout = 5000): Promise<void> {
    await expect(await element).toBeVisible({ timeout: timeout });
  }

  public async getText(element: Locator): Promise<string> {
    const textContent = await element?.textContent();
    return textContent ?? "";
  }
}

export default BasePage;