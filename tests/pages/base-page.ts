import { expect, Locator, Page } from "@playwright/test";

class BasePage {
  public page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  public async openURL(url: string): Promise<void> {
    await this.page.goto(url, { timeout: 10000 });
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
    this.page.on("dialog", (dialog) => dialog.accept());
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

  public async filteredClickFirst(
    element: string,
    text: string
  ): Promise<void> {
    const filteredEl = (await this.getElement(element)).filter({
      hasText: text,
    });

    for (const el of await filteredEl.all()) {
      const ariaDisabled = await el.getAttribute("aria-disabled");
      if (ariaDisabled === "false") {
        await el.click();
        return;
      }
    }
  }

  public async filteredClickLast(element: string, text: string): Promise<void> {
    const filteredEl = (await this.getElement(element)).filter({
      hasText: text,
    });

    for (const el of await filteredEl.all()) {
      const ariaDisabled = await el.getAttribute("aria-disabled");
      if (ariaDisabled === "false") {
        await el.click();
        return;
      }
    }
  }

  public async hover(element: string): Promise<void> {
    await (await this.getElement(element)).hover();
  }

  public async forceHover(element: string): Promise<void> {
    await (await this.getElement(element)).hover({ force: true });
  }

  public async click(element: string): Promise<void> {
    await (await this.getElement(element)).click();
  }

  public async forceClick(element: string): Promise<void> {
    await (await this.getElement(element)).click({ force: true });
  }

  public async doubleClick(element: string): Promise<void> {
    await (await this.getElement(element)).click({ clickCount: 2 });
  }

  public async clickByCoordinates(
    element: string,
    divX: number,
    divY: number
  ): Promise<void> {
    const boundingBox = await (await this.getElement(element)).boundingBox();
    if (boundingBox) {
      const x: number = boundingBox.x + boundingBox.width / divX;
      const y: number = boundingBox.y + boundingBox.height / divY; // Center Y coordinate
      await this.page.mouse.click(x, y);
    }
  }

  public async press(element: string, key: string): Promise<void> {
    await (await this.getElement(element)).press(key);
  }

  public async clickFirst(element: string): Promise<void> {
    await (await this.getElement(element)).first().click();
  }

  public async forceClickFirst(element: string): Promise<void> {
    await (await this.getElement(element)).first().click({ force: true });
  }

  public async doesFirstContainText(
    element: string,
    text: string
  ): Promise<void> {
    await expect((await this.getElement(element)).first()).toContainText(text);
  }

  public async doesFirstElHaveText(
    element: string,
    text: string
  ): Promise<void> {
    await expect((await this.getElement(element)).first()).toHaveText(text);
  }

  public async getFirstElText(element: string): Promise<string> {
    const textContent = await (await this.getElement(element))
      ?.first()
      .textContent();
    return textContent ?? "";
  }

  public async clickAll(element: string): Promise<void> {
    const items = await (await this.getElement(element)).all();
    for (const item of items) {
      await item.click();
    }
  }

  public async getInputValue(element: string): Promise<string> {
    return await (await this.getElement(element)).inputValue({ timeout: 1000 });
  }

  public async setValue(element: string, value: string): Promise<void> {
    await (await this.getElement(element)).fill(value);
  }

  public async clearValue(element: string): Promise<void> {
    await (await this.getElement(element)).clear();
  }

  public async isEmpty(element: string): Promise<void> {
    await expect(await this.getElement(element)).toBeEmpty();
  }

  public async toHaveValue(element: string, value: string): Promise<void> {
    await expect(await this.getElement(element)).toHaveValue(value);
  }

  public async toHaveValueWithoutSpaces(
    element: string,
    value: string
  ): Promise<void> {
    const actualValue = await this.getInputValue(element);
    await this.valuesEqual(actualValue.replace(/\s/g, ""), value);
  }

  public async toHaveValueLength(
    element: string,
    length: number
  ): Promise<void> {
    const value = await this.getInputValue(element);
    await this.valuesEqual(value.length, length);
  }

  public async toHaveValueLengthWithoutSpaces(
    element: string,
    length: number
  ): Promise<void> {
    const value = await this.getInputValue(element);
    await this.valuesEqual(value.replace(/\s/g, "").length, length);
  }

  public async isDisplayed(element: string, timeout = 5000): Promise<void> {
    await expect(await this.getElement(element)).toBeVisible({
      timeout: timeout,
    });
  }

  public async isFirstDisplayed(
    element: string,
    timeout = 5000
  ): Promise<void> {
    await expect((await this.getElement(element)).first()).toBeVisible({
      timeout: timeout,
    });
  }

  public async isNotDisplayed(element: string, timeout = 5000): Promise<void> {
    await expect(await this.getElement(element)).not.toBeVisible({
      timeout: timeout,
    });
  }

  public async areDisplayed(element: string, timeout = 5000): Promise<void> {
    const items = await (await this.getElement(element)).all();
    for (const item of items) {
      await expect(item).toBeVisible({ timeout: timeout });
    }
  }

  public async areNotDisplayed(element: string, timeout = 5000): Promise<void> {
    const items = await (await this.getElement(element)).all();
    for (const item of items) {
      await expect(item).not.toBeVisible({ timeout: timeout });
    }
  }

  public async isNotExist(element: string): Promise<void> {
    const count = await (await this.getElement(element)).count();
    expect(count).toEqual(0);
  }

  public async getText(element: string): Promise<string> {
    const textContent = await (await this.getElement(element))?.textContent();
    return textContent ?? "";
  }

  public async getElementsText(element: string): Promise<string[]> {
    const textContents: string[] = [];
    const items = await (await this.getElement(element)).all();
    for (const item of items) {
      let textContent = await item?.textContent();
      textContents.push(textContent ?? "");
    }
    return textContents;
  }

  public async toHaveText(
    element: string,
    text: string | RegExp
  ): Promise<void> {
    await expect(await this.getElement(element)).toHaveText(text);
  }

  public async toHaveTextWithoutSpaces(
    element: string,
    text: string
  ): Promise<void> {
    const actualText = await this.getText(element);
    await this.valuesEqual(actualText.replace(/\s/g, ""), text);
  }

  public async notToHaveText(
    element: string,
    text: string | RegExp
  ): Promise<void> {
    await expect(await this.getElement(element)).not.toHaveText(text);
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

  public async isEnabled(element: string): Promise<void> {
    await expect(await this.getElement(element)).toBeEnabled();
  }

  public async isDisabled(element: string): Promise<void> {
    await expect(await this.getElement(element)).toBeDisabled();
  }

  public async getAttributeValue(
    element: string,
    attribute: string
  ): Promise<string> {
    const attrValue = await (
      await this.getElement(element)
    )?.getAttribute(attribute, {
      timeout: 1000,
    });
    return attrValue ?? "";
  }

  public async doesElementHaveAttr(
    element: string,
    attribute: string
  ): Promise<void> {
    await expect(await this.getElement(element)).toHaveAttribute(attribute);
  }

  public async doesElementAttrHaveValue(
    element: string,
    attribute: string,
    value: string | RegExp
  ): Promise<void> {
    await expect(await this.getElement(element)).toHaveAttribute(
      attribute,
      value
    );
  }

  public async doesElementAttrDoesntHaveValue(
    element: string,
    attribute: string,
    value: string
  ): Promise<void> {
    await expect(await this.getElement(element)).not.toHaveAttribute(
      attribute,
      value
    );
  }

  async toHaveCSS(
    element: string,
    attribute: string,
    value: string
  ): Promise<void> {
    await expect(await this.getElement(element)).toHaveCSS(attribute, value);
  }

  async notToHaveCSS(
    element: string,
    attribute: string,
    value: string
  ): Promise<void> {
    await expect(await this.getElement(element)).not.toHaveCSS(
      attribute,
      value
    );
  }

  async firstToHaveCSS(
    element: string,
    attribute: string,
    value: string
  ): Promise<void> {
    await expect((await this.getElement(element)).first()).toHaveCSS(
      attribute,
      value
    );
  }

  async firstNotToHaveCSS(
    element: string,
    attribute: string,
    value: string
  ): Promise<void> {
    await expect((await this.getElement(element)).first()).not.toHaveCSS(
      attribute,
      value
    );
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

  async isFieldGreenHighlighted(field: string): Promise<void> {
    await expect(await this.getElement(field)).toHaveCSS(
      "border-color",
      "rgb(71, 196, 128)"
    );
  }

  public async upload(element: string, path: string): Promise<void> {
    await (await this.getElement(element)).setInputFiles(path);
  }

  async toBeTrue(element: any): Promise<void> {
    expect(element).toBeTruthy();
  }

  async toBeFalse(element: any): Promise<void> {
    expect(element).toBeFalsy();
  }

  async toEqual(element: any, value: any): Promise<void> {
    expect(element).toEqual(value);
  }

  async valuesEqual(firstValue: any, secondValue: any): Promise<void> {
    expect(firstValue).toEqual(secondValue);
  }

  async stringsContainEqual(
    firstValue: string,
    secondValue: string
  ): Promise<void> {
    expect(firstValue).toEqual(expect.stringContaining(secondValue));
  }

  async isVisible(element: string): Promise<boolean> {
    const visible = await (await this.getElement(element)).first().isVisible();
    return visible;
  }
}

export default BasePage;
