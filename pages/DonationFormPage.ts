import { expect, FrameLocator, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./abstracts/AbstractPage";
import { LocatorSearchService } from "./helpers/LocatorSearchService";

export class DonationFormPage extends AbstractPage {
  readonly page: Page;
  readonly frameDonationForm: FrameLocator;
  readonly locatorSearchService: LocatorSearchService;

  readonly donateButton: Locator;
  readonly donateMonthlyButton: Locator;
  readonly monthlyButton: Locator;
  readonly currencySelect: Locator;
  readonly amountInput: Locator;

  readonly secondSectionHeader: Locator;
  readonly coverTransactionCostsCheckbox: Locator;
  readonly transactionCostsHeader: Locator;
  readonly creditCardButton: Locator;

  readonly creditCardStageHeader: Locator;
  readonly cardNumberInput: Locator;
  readonly monthYearInput: Locator;
  readonly cvcInput: Locator;
  readonly continueButton: Locator;
  readonly errorOnCreditCardHeader: Locator;
  readonly errorOnCreditCardText: Locator;

  readonly personalInformationHeader: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly donateButtonInPersonalInfo: Locator;

  constructor(page: Page) {
    super();
    this.page = page;
    this.locatorSearchService = new LocatorSearchService();
    this.frameDonationForm = page.frameLocator('[title="Donation Widget"]');

    this.donateButton = this.frameDonationForm.locator(
      'xpath=.//*[text()="Donate"]'
    );
    this.donateMonthlyButton = this.frameDonationForm.locator(
      'xpath=.//*[text()="Donate monthly"]'
    );
    this.monthlyButton = this.frameDonationForm.locator(
      'xpath=.//*[text()="Monthly"]/ancestor::div[contains(@class, "btn-tab")]'
    );
    this.currencySelect = this.frameDonationForm.locator(
      'select[data-qa="currency-selector"]'
    );
    this.amountInput = this.frameDonationForm.locator(
      'input[data-qa="amount"]'
    );

    this.secondSectionHeader = this.frameDonationForm.locator(
      'xpath=.//*[text()="Payment option"]'
    );
    this.coverTransactionCostsCheckbox = this.frameDonationForm.locator(
      'xpath=.//*[text()="Cover transaction costs"]/ancestor::*[@role="checkbox"]'
    );
    this.transactionCostsHeader = this.frameDonationForm.locator(
      'div[data-qa="cover-fee-table"]'
    );
    this.creditCardButton = this.frameDonationForm.locator(
      'xpath=.//*[text()="Credit card"]/ancestor::*[contains(@class, "btn-primary")]'
    );

    this.creditCardStageHeader = this.frameDonationForm.locator(
      'xpath=.//*[text()="Credit card"]/ancestor-or-self::*[contains(@class, "header-title")]'
    );
    this.cardNumberInput = this.frameDonationForm
      .frameLocator('[title="Secure card number input frame"]')
      .locator('input[placeholder="Card number"]');
    this.monthYearInput = this.frameDonationForm
      .frameLocator('[title="Secure expiration date input frame"]')
      .locator('input[placeholder="MM / YY"]');
    this.cvcInput = this.frameDonationForm
      .frameLocator('[title="Secure CVC input frame"]')
      .locator('input[placeholder="CVC"]');
    this.errorOnCreditCardHeader = this.frameDonationForm.locator(
      '*[data-qa="card-continue-error-title"]'
    );
    this.errorOnCreditCardText = this.frameDonationForm.locator(
      '*[data-qa="card-continue-error-message"]'
    );
    this.continueButton = this.frameDonationForm.locator(
      '*[data-qa="card-continue"]'
    );

    this.personalInformationHeader = this.frameDonationForm.locator(
      'xpath=.//*[text()="Personal information"]'
    );
    this.firstNameInput = this.frameDonationForm.locator(
      'input[data-qa="personal-first-name"]'
    );
    this.lastNameInput = this.frameDonationForm.locator(
      'input[data-qa="personal-last-name"]'
    );
    this.emailInput = this.frameDonationForm.locator(
      'input[data-qa="personal-email"]'
    );
    this.donateButtonInPersonalInfo = this.frameDonationForm.locator(
      'button[data-qa="privacy-continue"]'
    );
  }

  async checkOpened() {
    await expect(this.donateButton).toBeVisible();
  }

  async checkIsFirstStageOfForm() {
    await expect(this.donateButton).toBeVisible();
  }

  async setMonthlyDonateTo(amount: number, currency: string) {
    let monthlyButtonVisible =
      await this.locatorSearchService.getVisibleElementFromLocator(
        this.monthlyButton
      );
    await monthlyButtonVisible.click();
    await expect(this.donateMonthlyButton).toBeVisible();
    await this.currencySelect.selectOption(currency);
    await this.amountInput.fill(amount.toString());
  }

  async clickDonateMonthly() {
    await this.donateMonthlyButton.click();
  }

  async checkSecondStageOfPayment() {
    await expect(this.secondSectionHeader).toBeVisible();
  }

  async setCoverTransactionCosts(isEnabled: boolean) {
    if (!isEnabled) {
      await expect(
        await this.coverTransactionCostsCheckbox.getAttribute("aria-checked")
      ).toEqual("true");
      await this.coverTransactionCostsCheckbox.click();
      await this.transactionCostsHeader.waitFor({ state: "detached" });
    } else {
      await expect(
        await this.coverTransactionCostsCheckbox.getAttribute("aria-checked")
      ).toEqual("false");
      await this.coverTransactionCostsCheckbox.click();
      await this.transactionCostsHeader.waitFor({ state: "attached" });
    }
  }

  async clickCreditCardButton() {
    await this.creditCardButton.click();
  }

  async checkCreditCardForm() {
    await expect(this.cardNumberInput).toBeVisible();
  }

  async setCreditCardInfo(cardInfo: {
    cardNumber?: string;
    monthYear?: string;
    cvc?: string;
  }) {
    if (cardInfo.cardNumber) {
      await this.cardNumberInput.fill(cardInfo.cardNumber);
    }
    if (cardInfo.monthYear) {
      await this.monthYearInput.fill(cardInfo.monthYear);
    }
    if (cardInfo.cvc) {
      await this.cvcInput.fill(cardInfo.cvc);
    }
  }

  async clickContinueButton() {
    let continueButtonVisible =
      await this.locatorSearchService.getVisibleElementFromLocator(
        this.continueButton
      );
    await expect(continueButtonVisible).toBeVisible();
    await continueButtonVisible.click();
  }

  async checkPersonalInformationStage() {
    await expect(this.personalInformationHeader).toBeVisible();
  }

  async setPersonalInformation(personalInfo: {
    firstName?: string;
    lastName?: string;
    email?: string;
  }) {
    if (personalInfo.firstName) {
      await this.firstNameInput.fill(personalInfo.firstName);
    }
    if (personalInfo.lastName) {
      await this.lastNameInput.fill(personalInfo.lastName);
    }
    if (personalInfo.email) {
      await this.emailInput.fill(personalInfo.email);
    }
  }

  async clickDonateButtonInPersonalInformation() {
    await this.donateButtonInPersonalInfo.click();
  }

  async checkErrorOnCreditCardStage(errorMessage: string) {
    await expect(this.errorOnCreditCardHeader).toBeVisible();
    await expect(await this.errorOnCreditCardHeader.textContent()).toContain(
      errorMessage
    );
  }
}
