const { executeStep } = require("../utils/action.js");
import { faker } from "@faker-js/faker";
import { assertElementEnabled, assertElementVisible } from "../utils/helper.js";
const indexPage = require("../utils/index.js");
require("dotenv").config();
const atob = require("atob");

exports.LoginPage = class LoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator("#UserName");
    this.nextBtn = page.locator("#Next");
    this.passWord = page.locator("#Password");
    this.loginBtn = page.locator("#Login");
    this.createBtn = page.locator("//a[normalize-space()='Create']");
    this.firstName = page.locator("//input[@data-details-field='FirstName']");
    this.lastName = page.locator("//input[@data-details-field='LastName']");
    this.adress1 = page.locator("//input[@data-details-field='Address1']");
    this.city = page.locator("//input[@data-details-field='City']");
    this.postalCode = page.locator("//input[@data-details-field='PostalCode']");
    this.enterEmail = page.locator("//input[@data-details-field='Email']");
    this.country = page.locator("//select[@data-details-field='CountryCode']");
    this.selectProduct = page.locator(
      "(//input[@placeholder='Type to search...'])[2]"
    );
    this.selectLeadSource = page.locator(
      "//select[@data-details-field='LeadSourceName']"
    );
    this.selectLeadType = page.locator(
      "//select[@data-details-field='LeadTypeName']"
    );
    this.selectLeadCategory = page.locator(
      "//select[@data-details-field='LeadCategoryName']"
    );
    this.IsCommunicationOptIn = page.locator(
      "//select[@data-details-field='IsCommunicationOptIn']"
    );
    this.selectautoResponder = page.locator(
      "//select[@data-details-field='SendAutoresponder']"
    );
    this.selectNurture = page.locator(
      "//select[@data-details-field='SendNurture']"
    );
    this.selectLead = page.locator("//select[@data-details-field='SendLead']");
    this.saveChanges = page.locator("//a[@title='Save Changes']");
    this.successMsg = page.locator("//div[@class='alert alert-success']");
    this.randomFirstName = faker.person.firstName();
    this.randomLastName = faker.person.lastName();
    this.randomAdress = faker.location.streetAddress();
    this.randomCity = faker.location.city();
    this.randomPostalCode = faker.location.zipCode();
    this.randomEmail = faker.internet.email();
  }
  async launchUrl() {
    await this.page.goto(process.env.aimbaseUrl);
  }
  async loginFlow() {
    await executeStep(
      this.userName,
      "fill",
      `Fill the User Name field :${atob(process.env.aimbaseUserName)}`,
      [atob(process.env.aimbaseUserName)]
    );
    await executeStep(this.nextBtn, "click", "Click the Next button");
    await executeStep(this.passWord, "fill", "Fill the Password field", [
      atob(process.env.aimbasePassword),
    ]);
    await executeStep(this.loginBtn, "click", "Click the Login button");
    await this.page.waitForTimeout(parseInt(process.env.medium_timeout));
    await assertElementVisible(
      this.createBtn,
      "Verify that the Create button is visible"
    );
    await executeStep(this.createBtn, "click", "Click the Create button");
  }

  async createLead() {
    await assertElementEnabled(
      this.firstName,
      "Verify that the First Name field is enabled"
    );
    await executeStep(this.firstName, "fill", "Fill in the First Name field", [
      this.randomFirstName,
    ]);
    await executeStep(this.lastName, "fill", "Fill in the Last Name field", [
      this.randomLastName,
    ]);
    await executeStep(this.adress1, "fill", "Fill in the Address field", [
      this.randomAdress,
    ]);
    await executeStep(this.city, "fill", "Fill in the City field", [
      this.randomCity,
    ]);
    await executeStep(
      this.postalCode,
      "fill",
      "Fill in the Postal Code field",
      [this.randomPostalCode]
    );
    await executeStep(this.enterEmail, "fill", "Fill in the Email field", [
      this.randomEmail,
    ]);
    await executeStep(
      this.country,
      "selectOption",
      "Select a Country from the dropdown",
      [indexPage.requiredData.aimbase.selectCountryName]
    );
    await executeStep(
      this.selectProduct,
      "fill",
      "Enter the Product Name in the search box",
      [
        indexPage.requiredData.aimbase.ProductName,
        { timeout: parseInt(process.env.large_timeout) },
      ]
    );
    await executeStep(
      this.selectLeadSource,
      "selectOption",
      "Select the Lead Source from the dropdown",
      [{ index: 1 }]
    );
    await executeStep(
      this.selectLeadType,
      "selectOption",
      "Select the Lead Type from the dropdown",
      [indexPage.requiredData.aimbase.leadType]
    );
    await executeStep(
      this.selectLeadCategory,
      "selectOption",
      "Select the Lead Category from the dropdown",
      [{ index: 1 }]
    );
    await executeStep(
      this.IsCommunicationOptIn,
      "selectOption",
      "Select 'Yes' for Communication Opt-In",
      [indexPage.requiredData.aimbase.option]
    );
    await executeStep(
      this.selectautoResponder,
      "selectOption",
      "Select 'Yes' for Auto Responder",
      [indexPage.requiredData.aimbase.option]
    );
    await executeStep(
      this.selectNurture,
      "selectOption",
      "Select 'Yes' for Nurture",
      [indexPage.requiredData.aimbase.option]
    );
    await executeStep(
      this.selectLead,
      "selectOption",
      "Select 'Yes' for Lead",
      [indexPage.requiredData.aimbase.option]
    );
    await executeStep(
      this.saveChanges,
      "click",
      "Click the Save Changes button"
    );
    //await assertElementVisible(this.successMsg,"Verify Success Message is Displayed");
  }
};
