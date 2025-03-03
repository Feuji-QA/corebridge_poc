const { executeStep } = require("../utils/action.js");
import {
  assertElementVisible,
  assertValueToBe
} from "../utils/helper.js";
const indexPage = require("../utils/index.js");
require("dotenv").config();
const atob = require("atob");

exports.HomePage = class HomePage {
  constructor(page) {
    this.page = page;
    this.logo = page.locator(
      "//div[@id='rollick_header_container']//img[@alt='Home']"
    );
    this.brandList = page.locator("//div[@class='brand-list']//a");
    this.top10Text = page.locator("//h4[contains(normalize-space(),'Top 10')]");
    this.motorcycles = page.locator("//div[contains(normalize-space(),'Top 10')]/child::div[@class='row vehicles']//a");
    this.startYourSearch = page.locator("//select[@id='category']");
    this.option = page.locator('#category');
    this.searchBtn = page.locator("//button[text()='Search']");
    this.viewDetails = page.locator("(//button[normalize-space()='View Details'])[1]");
    this.getYourPrice = (page)=>page.locator("//a[normalize-space()='Get Your Price']");
    this.submitBtn = (page)=>page.locator("(//button[@id='getPriceCTA'])[1]");
    this.ErrorMsg = (page, id)=>page.locator(`//label[@id='${id}']`);
  }
  async launchUrl() {
    await this.page.goto(process.env.gorollickbaseUrl);
  }

  async validateLogo() {
    await assertElementVisible(
      this.logo,
      "Verify that the Gorollick logo is displayed"
    );
  }

  async validateBrands() {
    const brands = await this.brandList.all();
    for (const brand of brands) {
      const href = await brand.getAttribute("href");
      await assertValueToBe('','Verify that the Brand link is present',href, false);
    }
  }

  async validateTop10() {
    this.page.waitForTimeout(parseInt(process.env.small_timeout));
   await executeStep(this.top10Text, "scroll", "Scroll to the Top 10 section");
    const motorcyclesLinks = await this.motorcycles.all();
    for (const motorcycleLink of motorcyclesLinks) {
      const href = await motorcycleLink.getAttribute("href");
      await assertValueToBe('','Verify that the Brand link is present',href, false);
    }
  }
  
  async searchDealer() {
    await executeStep(this.startYourSearch, "scroll", "Scroll to the page Top");
    await this.page.waitForTimeout(parseInt(process.env.small_timeout));
    await this.option.selectOption('rvs');
    await executeStep(this.searchBtn, "click", "Click on the Search button");
  }

  async dealerPriceForm() { 
    const page1Promise = this.page.waitForEvent('popup');
    await executeStep(this.viewDetails, "click", "Click on the View Details button");
    const newPage = await page1Promise;
    await executeStep(this.getYourPrice(newPage), "click", "Click on the Get Your Price button");
    await executeStep(this.submitBtn(newPage), "click", "Click on the Submit button");
    await assertElementVisible(this.ErrorMsg(newPage, "firstName-error"), "Verify that the First Name Error Message is displayed");
    await assertElementVisible(this.ErrorMsg(newPage, "lastName-error"), "Verify that the Last Name Error Message is displayed");
    await assertElementVisible(this.ErrorMsg(newPage, "email-error"), "Verify that the Email Error Message is displayed");
    await assertElementVisible(this.ErrorMsg(newPage, "phone-error"), "Verify that the Phone Error Message is displayed");
  }

};
