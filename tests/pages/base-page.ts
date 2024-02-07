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

  public async previousPage(): Promise<void> {
    await this.page.goBack();
    await this.page.waitForLoadState("load");
  }

  public async refreshPage(): Promise<void> {
    await this.page.reload();
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

  public async waitForModalAccept(): Promise<void> {
    await (await this.page.waitForEvent("dialog")).accept();
  }

  public async doesPageHaveURL(URL: string | RegExp): Promise<void> {
    await expect(this.page).toHaveURL(URL);
  }

  public async getElement(element: string): Promise<Locator> {
    return this.page.locator(element);
  }

  public async filter(element: string, text: string): Promise<Locator> {
    return (await this.getElement(element)).filter({ hasText: text });
  }

  public async filteredDisplay(element: string, text: string): Promise<void> {
    const filtered = (await this.getElement(element)).filter({ hasText: text });
    const items = await filtered.all();
    for (const item of items) {
      await expect(item).toBeVisible();
      await expect(item).toContainText(text);
    }
  }

  public async filteredClick(element: string, text: string): Promise<void> {
    await (await this.getElement(element)).filter({ hasText: text }).click();
  }

  public async hover(element: string): Promise<void> {
    await (await this.getElement(element)).hover();
  }

  public async click(element: string): Promise<void> {
    await (await this.getElement(element)).click();
  }

  public async clickByCoordinates(element: string): Promise<void> {
    const boundingBox = await (await this.getElement(element)).boundingBox();
    if (boundingBox) {
      const x: number = boundingBox.x + boundingBox.width / 5.5;
      const y: number = boundingBox.y + boundingBox.height / 2; // Center Y coordinate
      await this.page.mouse.click(x, y);
    }
  }

  public async press(element: string, key: string): Promise<void> {
    await (await this.getElement(element)).press(key);
  }

  public async clickFirst(element: string): Promise<void> {
    await (await this.getElement(element)).first().click();
  }

  public async clickAll(element: string): Promise<void> {
    const items = await (await this.getElement(element)).all();
    for (const item of items) {
      await item.click();
    }
  }

  public async setValue(element: string, value: string): Promise<void> {
    await (await this.getElement(element)).fill(value);
  }

  public async clearValue(element: string): Promise<void> {
    await (await this.getElement(element)).clear();
  }

  public async toHaveValue(element: string, value: string): Promise<void> {
    await expect(await this.getElement(element)).toHaveValue(value);
  }

  public async isDisplayed(element: string, timeout = 15000): Promise<void> {
    await expect(await this.getElement(element)).toBeVisible({
      timeout: timeout,
    });
  }

  public async isNotDisplayed(element: string, timeout = 15000): Promise<void> {
    await expect(await this.getElement(element)).not.toBeVisible({
      timeout: timeout,
    });
  }

  public async areDisplayed(element: string, timeout = 15000): Promise<void> {
    const items = await (await this.getElement(element)).all();
    for (const item of items) {
      await expect(item).toBeVisible({ timeout: timeout });
    }
  }

  public async areNotDisplayed(
    element: string,
    timeout = 15000
  ): Promise<void> {
    const items = await (await this.getElement(element)).all();
    for (const item of items) {
      await expect(item).not.toBeVisible({ timeout: timeout });
    }
  }

  public async getText(element: string): Promise<string> {
    const textContent = await (await this.getElement(element))?.textContent();
    return textContent ?? "";
  }

  public async toHaveText(
    element: string,
    text: string | RegExp
  ): Promise<void> {
    await expect(await this.getElement(element)).toHaveText(text);
  }

  public async elementsToHaveText(
    element: string,
    text: string | RegExp
  ): Promise<void> {
    const items = await (await this.getElement(element)).all();
    for (const item of items) {
      await expect(item).toHaveText(text);
    }
  }

  public async elementsToContainText(
    element: string,
    text: string
  ): Promise<void> {
    await this.filteredDisplay(element, text);
  }

  public async toContainText(
    element: string,
    text: string | RegExp
  ): Promise<void> {
    await expect(await this.getElement(element)).toContainText(text);
  }

  public async count(element: string): Promise<number> {
    return (await this.getElement(element)).count();
  }

  public async toHaveCount(element: string, value: number): Promise<void> {
    await expect(await this.getElement(element)).toHaveCount(value);
  }

  public async isChecked(element: string): Promise<void> {
    await expect(await this.getElement(element)).toBeChecked();
  }

  public async isNotClickable(element: string): Promise<void> {
    await expect(await this.getElement(element)).not.toHaveAttribute("href");
  }

  public async isClickable(element: string): Promise<void> {
    await expect(await this.getElement(element)).toHaveAttribute("href");
  }

  public async doesElementHaveAttr(
    element: string,
    attribute: string
  ): Promise<void> {
    await expect(await this.getElement(element)).toHaveAttribute(attribute);
  }

  public async doesElementAttrHaveText(
    element: string,
    attribute: string,
    text: string
  ): Promise<void> {
    const attributeText = await (
      await this.getElement(element)
    ).evaluate((input, attr) => {
      return input.getAttribute(attr);
    }, attribute);
    expect(attributeText).toBe(text);
  }

  async isFieldRedHighlighted(field: string): Promise<void> {
    await expect(await this.getElement(field)).toHaveCSS(
      "border-color",
      "rgb(247, 56, 89)"
    );
  }

  async isFieldNotRedHighlighted(field: string): Promise<void> {
    await expect(await this.getElement(field)).not.toHaveCSS(
      "border-color",
      "rgb(247, 56, 89)"
    );
  }

  async toBeTrue(element: any): Promise<void> {
    expect(element).toBeTruthy();
  }
}

export default BasePage;
