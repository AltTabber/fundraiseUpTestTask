import { test, expect, chromium } from "@playwright/test";
import { CharitySitePage } from "../pages/CharitySitePage";
import { DonationFormPage } from "../pages/DonationFormPage";

test("The donation form will throw error if you have incorrect card info", async ({
  page,
}) => {
  page.on("console", (msg) => {
    console.log(msg);
  });

  const charitySitePage = new CharitySitePage(page);
  await charitySitePage.goToPage();
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
    monthYear: "04 / 24",
    cvc: "000",
  });
  await donationFormPage.clickContinueButton();

  await donationFormPage.checkPersonalInformationStage();
  await donationFormPage.setPersonalInformation({
    firstName: "Mikhail",
    lastName: "Shafigullin",
    email: "123@fundraiseup.com",
  });
  await donationFormPage.clickDonateButtonInPersonalInformation();
  await donationFormPage.checkCreditCardForm();
  await donationFormPage.checkErrorOnCreditCardStage("Your card was declined.");
});
