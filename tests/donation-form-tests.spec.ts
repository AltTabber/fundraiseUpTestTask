import { test, expect, chromium } from '@playwright/test';
import { CharitySitePage } from '../pages/CharitySitePage';
import { DonationFormPage } from '../pages/DonationFormPage';

test('homepage has Playwright in title and get started link linking to the intro page', async ({ page }) => {
  page.on("console", msg => {
    console.log(msg);
  })
  const browser = await chromium.launch({
    logger: {
      isEnabled: (name, severity) => name === 'browser',
      log: (name, severity, message, args) => console.log(`${name} ${message}`)
    }
  });
  const charitySitePage = new CharitySitePage(page);
  await charitySitePage.goto();
  await charitySitePage.checkOpened();
  await charitySitePage.clickGiveNow();

  const donationFormPage = new DonationFormPage(page);
  await donationFormPage.checkOpened();
  await donationFormPage.setMonthlyDonateTo(100, "USD");
  await donationFormPage.clickDonateMonthly();

  await donationFormPage.checkSecondStageOfPayment();
  await donationFormPage.setCoverTransactionCosts(false);
  await donationFormPage.clickCreditCardButton();

  await donationFormPage.checkCreditCardForm();
  await donationFormPage.setCreditCardInfo({
    cardNumber: "4242 4242 4242 4242",
    monthYear: "04/24",
    cvc: "000"
  });
  await donationFormPage.clickContinueButton();

  await donationFormPage.checkPersonalInformationStage();
  await donationFormPage.setPersonalInformation({
    firstName: "Mikhail",
    lastName: "Shafigullin",
    email: "123@fundraiseup.com"
  })
  await donationFormPage.clickDonateButtonInPersonalInformation();
  await donationFormPage.checkCreditCardForm();
  await donationFormPage.checkErrorOnCreditCardStage("Your card was declined.");
  // await donationFormPage.checkErrorOnCreditCardStage("This could be due to any of several reasons: incorrect security code, insufficient funds, card limit, card disabled, etc.");
  
});
