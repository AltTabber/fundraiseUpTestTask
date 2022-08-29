import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./abstracts/AbstractPage";

export class CharitySitePage extends AbstractPage {
  readonly page: Page;
  readonly charityFrame: FrameLocator;
  readonly giveNowButton: Locator;

  constructor(page: Page) {
    super();
    this.page = page;
    this.charityFrame = page.frameLocator("#XBGSFAMB");
    this.giveNowButton = this.charityFrame.locator(
      'xpath=.//div[text()="Give Now"]'
    );
  }

  async goToPage() {
    await this.page.goto(process.env.CHARITY_SITE_PAGE);
  }

  async clickGiveNow() {
    await this.giveNowButton.click();
  }

  async checkOpened() {
    await expect(this.giveNowButton).toBeVisible();
  }
}
