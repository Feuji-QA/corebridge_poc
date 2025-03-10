const { test, expect } = require("@playwright/test");
const indexPage = require("../utils/index.js");
require("dotenv").config();

let bartleCyclePage;

test.describe("Wdget Testing validations", () => {
  test.beforeEach(async ({ page }) => {
    bartleCyclePage = new indexPage.BartleCyclePage(page);
  });

  test("Perform all the validations in Cycle Sports Page", async () => {
    await bartleCyclePage.navigateBartleCyclePage();
    await bartleCyclePage.selectPreOwnedInventory();
    await bartleCyclePage.getVehiclePrice();
    await bartleCyclePage.validateButtons();
    await bartleCyclePage.clickOnStartMyDealButton();
    // await bartleCyclePage.fillQuoteForm();
    // await bartleCyclePage.verifyReserveNow();
    // await bartleCyclePage.validateEstimateTradeIn();
    // await bartleCyclePage.validateSpecialOffers();
    // await bartleCyclePage.validateScheduleAppointment();

  });
});
