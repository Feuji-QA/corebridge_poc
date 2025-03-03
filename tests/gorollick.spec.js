const { test } = require("@playwright/test");
const indexPage = require("../utils/index.js");
require("dotenv").config();

let gorollickHomePage;

  test.beforeEach(async ({ page }) => {
    gorollickHomePage = new indexPage.HomePage(page);
  });

  test('Gorollick home page verification', async ({ page }) => {
    await gorollickHomePage.launchUrl();
    await gorollickHomePage.validateLogo();
    await gorollickHomePage.validateBrands();
    await gorollickHomePage.validateTop10();
    await gorollickHomePage.searchDealer();
    await gorollickHomePage.dealerPriceForm();
});
