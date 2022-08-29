import { expect, Locator } from "@playwright/test";

export class LocatorSupportService {
  /**
   * Get visible element from multiple element with one locator
   * @param locatorWithMultipleElements
   * @returns visible locator with nth
   */
  async getVisibleElementFromLocator(
    locatorWithMultipleElements: Locator
  ): Promise<Locator> {
    const count = await locatorWithMultipleElements.count();
    let locator: Locator = locatorWithMultipleElements.last();
    for (let i = 0; i < count; i++) {
      if (await locator.isVisible()) {
        locator = locatorWithMultipleElements.nth(i);
      }
    }
    return locator;
  }

  /**
   * Fill the input and check it after filling
   * @param inputLocator
   * @param value
   */
  async fillInputWithCheck(inputLocator: Locator, value: string) {
    await inputLocator.fill(value);
    expect(await inputLocator.inputValue()).toEqual(value);
  }
}
