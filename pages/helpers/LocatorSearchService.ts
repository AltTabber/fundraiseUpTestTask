import { Locator } from "@playwright/test";

export class LocatorSearchService {
  async getVisibleElementFromLocator(
    locatorWithMultipleElements: Locator
  ): Promise<Locator> {
    const count = await locatorWithMultipleElements.count();
    let locator: Locator = locatorWithMultipleElements.last();
    let zIndex: number = Number.MIN_VALUE;

    for (let i = 0; i < count; i++) {
      if (await locator.isVisible()) {
        locator = locatorWithMultipleElements.nth(i);
      }
    }
    return locator;
  }
}
