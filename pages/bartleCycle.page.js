const { th } = require("@faker-js/faker");
const { executeStep } = require("../utils/action.js");
const {
  assertInputValue,
  assertElementVisible,
  assertEqualValues,
} = require("../utils/helper.js");
const indexPage = require("../utils/index.js");
require("dotenv").config();
let expectedPrice, priceElement;
exports.BartleCyclePage = class BartleCyclePage {
  constructor(page) {
    this.page = page;
    this.inventoryMenu = page.locator("//a[text()='Inventory']");
    this.preOwnedInventory = page.locator(
      "(//a[text()='Pre-Owned Inventory'])[1]"
    );
    this.alertCloseButton = page.locator("(//button[@aria-label='Close'])[1]");
    this.price = page.locator(
      "(//label[text()='Our Price'])[1]//following-sibling::span"
    );
    this.startMyDealButton = page.locator("(//div[text()='Start My Deal'])[1]");
    this.reserveNowButton = page.locator("(//div[text()='Reserve Now'])[1]");
    this.iframe = page.frameLocator("#rollick-modal");
    this.formPrice = this.iframe.locator(
      "(//div[contains(@class,'data-vehicle-price')])[1]"
    );
    this.requestQuoteButton = this.iframe.locator(
      "(//button[text()='Request a Quote'])[1]"
    );
    this.quoteFirstName = this.iframe.locator(
      "(//input[@placeholder='First Name'])[1]"
    );
    this.quoteLastName = this.iframe.locator(
      "(//input[@placeholder='Last Name'])[1]"
    );
    this.quoteEmail = this.iframe.locator("(//input[@placeholder='Email'])[1]");
    this.quotePhone = this.iframe.locator("(//input[@placeholder='Phone'])[1]");
    this.quoteZipCode = this.iframe.locator(
      "(//input[@placeholder='ZIP Code'])[1]"
    );
    this.selectDays = this.iframe.locator(
      "(//label[text()='How soon are you looking to buy?*']/..//select)[1]"
    );
    this.commentArea = this.iframe.locator(
      "(//textarea[@placeholder='Leave a comment here'])[1]"
    );
    this.submitButton = this.iframe.locator("(//button[text()='Submit'])[1]");
    this.resserveSubmitBtn = this.iframe.locator(
      "(//button[text()='Submit'])[2]"
    );
    this.reserveNowTab = this.iframe.locator(
      "(//div[@data-tabname ='Reserve-Now'])[1]"
    );
    this.estimateTradeInTile = this.iframe.locator(
      "(//div[@data-tabname='Trade-In'])[1]"
    );
    this.tradeInValue = this.iframe.locator(
      "(//div[text()='Trade-In Value'])[2]"
    );
    this.specialOffersTab = this.iframe.locator(
      "(//div[@data-tabname='Offers'])[1]"
    );
    this.specialOffersText = this.iframe.locator(
      "(//div[text()='Special Offers'])[2]"
    );
    this.scheduleAppointmentTab = this.iframe.locator(
      "(//div[@data-tabname='Appointment'])[1]"
    );
    this.closeForm = this.iframe.locator(
      "(//div[@class='close-button-div'])[2]"
    );
  }
  async navigateBartleCyclePage() {
    await this.page.goto(process.env.bartleCycleUrl);
  }
  async selectPreOwnedInventory() {
    await executeStep(this.inventoryMenu, "hover", "Hover over Inventory Menu");
    await executeStep(
      this.preOwnedInventory,
      "click",
      "Select Pre-Owned Inventory in Inventory Menu"
    );
    await executeStep(this.alertCloseButton, "click", "Close the alert");
  }
  async getVehiclePrice() {
    await this.page.waitForTimeout(parseInt(process.env.small_timeout));
    expectedPrice = await this.price.textContent();
    await this.page.waitForTimeout(parseInt(process.env.large_timeout));
  }
  async validateButtons() {
    await assertElementVisible(
      this.startMyDealButton,
      "Verify Start My Deal Button text has been displayed"
    );
    await assertElementVisible(
      this.reserveNowButton,
      "Verify Reserve Now Button text has been displayed"
    );
  }
  async clickOnStartMyDealButton() {
    await executeStep(
      this.startMyDealButton,
      "click",
      "Click on Start My Deal Button"
    );
    await this.page.waitForTimeout(parseInt(process.env.medium_timeout));
    priceElement = await this.formPrice.textContent();
    await this.page.waitForTimeout(parseInt(process.env.small_timeout));
    await assertEqualValues(
      expectedPrice,
      priceElement,
      `Verify Vehicle Price: Expected = ${expectedPrice}, Actual = ${priceElement}`
    );
    await executeStep(
      this.requestQuoteButton,
      "click",
      "Click on Request a Quote Button"
    );
  }

  async fillQuoteForm() {
    await executeStep(
      this.quoteFirstName,
      "fill",
      "Fill in the First Name field",
      [indexPage.requiredData.bartlePage.firstName]
    );
    await executeStep(
      this.quoteLastName,
      "fill",
      "Fill in the Last Name field",
      [indexPage.requiredData.bartlePage.lastName]
    );
    await executeStep(this.quoteEmail, "fill", "Fill in the Email field", [
      indexPage.requiredData.bartlePage.email,
    ]);
    await executeStep(this.quotePhone, "fill", "Fill in the Phone field", [
      indexPage.requiredData.bartlePage.phone,
    ]);
    await executeStep(this.quoteZipCode, "fill", "Fill in the ZIP Code field", [
      indexPage.requiredData.bartlePage.zipCode,
    ]);
    await executeStep(this.selectDays, "selectOption", "Select the Days", [
      indexPage.requiredData.bartlePage.selectDays,
    ]);
    await executeStep(this.commentArea, "fill", "Fill in the Comment field", [
      indexPage.requiredData.bartlePage.comments,
    ]);
    await executeStep(this.submitButton, "click", "Click on Submit Button");
    await this.page.waitForTimeout(parseInt(process.env.small_timeout));
  }
  async verifyReserveNow() {
    await executeStep(
      this.reserveNowTab,
      "click",
      "Click on Reserve Now Button"
    );
    await this.page.waitForTimeout(parseInt(process.env.small_timeout));
    await assertInputValue(
      this.quoteFirstName,
      indexPage.requiredData.bartlePage.firstName,
      "Verify First Name is displayed correctly in the 'Reserve Now' form, same as in the 'Request A Quote' form"
    );
    await assertInputValue(
      this.quoteLastName,
      indexPage.requiredData.bartlePage.lastName,
      "Verify Last Name is displayed correctly in the 'Reserve Now' form, same as in the 'Request A Quote' form"
    );
    await assertInputValue(
      this.quoteEmail,
      indexPage.requiredData.bartlePage.email,
      "Verify Email is displayed correctly in the 'Reserve Now' form, same as in the 'Request A Quote' form"
    );
    await assertInputValue(
      this.quoteZipCode,
      indexPage.requiredData.bartlePage.zipCode,
      "Verify Zip code is displayed correctly in the 'Reserve Now' form, same as in the 'Request A Quote' form"
    );
    await assertInputValue(
      this.commentArea,
      indexPage.requiredData.bartlePage.comments,
      "Verify Comment is displayed correctly in the 'Reserve Now' form, same as in the 'Request A Quote' form"
    );
    await executeStep(
      this.resserveSubmitBtn,
      "click",
      "Click on Submit Button"
    );
    await this.page.waitForTimeout(parseInt(process.env.small_timeout));
  }
  async validateEstimateTradeIn() {
    await executeStep(
      this.estimateTradeInTile,
      "click",
      "Click on Estimate Trade-In Tile"
    );
    await this.page.waitForTimeout(parseInt(process.env.small_timeout));
    await assertElementVisible(
      this.tradeInValue,
      "Verify Trade-In Value is displayed"
    );
  }
  async validateSpecialOffers() {
    await executeStep(
      this.specialOffersTab,
      "click",
      "Click on Special Offers Tab"
    );
    await this.page.waitForTimeout(parseInt(process.env.small_timeout));
    await assertElementVisible(
      this.specialOffersText,
      "Verify Special Offers Text is displayed"
    );
  }
  async validateScheduleAppointment() {
    await executeStep(
      this.scheduleAppointmentTab,
      "click",
      "Click on Schedule Appointment Tab"
    );
  }
};
