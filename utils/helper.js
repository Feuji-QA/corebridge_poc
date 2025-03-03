const fs = require('node:fs/promises');
require('dotenv').config();
const { expect, test } = require('@playwright/test');

async function scrollElement(element, scrollTo) {
  await element.evaluate((el, scrollTo) => {
    el.scrollTop = scrollTo === 'bottom' ? el.scrollHeight : 0;
  }, scrollTo);
}

async function assertElementVisible(element, customText) {
  await test.step(customText, async () => {
    await expect(element).toBeVisible();
  });
}

async function assertValueToBe(actual, customText, expected, toBe = true) {
  await test.step(customText, async () => {
    toBe
      ? await expect(expected).toBe(actual)
      : await expect(expected).not.toBe(actual);
  });
}

async function assertToHaveProperty(responseBody, customText, property) {
  await test.step(customText, async () => {
    await expect(responseBody).toHaveProperty("RegistrationResponseRecords");
  });
}

async function assertToBeTruthy(data, customText) {
  await test.step(customText, async () => {
    expect(data).toBeTruthy();
  });
}

async function assertElementNotVisible(element, customText) {
  await test.step(customText, async () => {
    await expect(element).not.toBeVisible();
  });
}

async function assertElementFocused(element, customText) {
  await test.step(customText, async () => {
    await expect(element).toBeFocused();
  });
}

async function assertEqualValues(value1, value2, customText) {
  await test.step(customText, async () => {
    await expect(value1).toEqual(value2);
  });
}
async function assertContainsValue(value1, value2, customText) {
  await test.step(customText, async () => {
    await expect(value1).toContain(value2);
  });
}

async function assertNotEqualValues(value1, value2, customText) {
  await test.step(customText, async () => {
    await expect(value1).not.toEqual(value2);
  });
}

async function assertElementHidden(page, selector, customText) {
  await test.step(customText, async () => {
    await expect(value1).not.toEqual(value2);
  });
  const element = await page.$(selector);
  await expect(element).not.toBeNull();
  await expect(element).toBeHidden();
}

async function assertTextPresent(page, text, customText) {
  await test.step(customText, async () => {
    await expect(page.locator(`text=${text}`)).toBeVisible();
  });
}

async function assertElementHaveText(page, selector, text, customText) {
  await test.step(customText, async () => {
    const element = await page.locator(selector);
    await expect(element).toHaveText(text);
  });
}

async function assertElementContainsText(element, text, customText) {
  await test.step(customText, async () => {
    await expect(element).toContainText(text);
  });
}

async function assertUrlContains(page, substring, customText) {
  await test.step(customText, async () => {
    const url = page.url();
    expect(url).toContain(substring);
  });
}

async function assertGreaterThan(value1, value2, customText) {
  await test.step(customText, async () => {
    await expect(value1).toBeGreaterThan(value2);
  });
}

async function screenshotElement(page, selector, path) {
  const element = await page.locator(selector);
  await element.screenshot({ path });
}

async function waitForElementVisible(page, selector, timeout = 30000) {
  await page.locator(selector).waitFor({ state: 'visible', timeout });
}

async function waitForElementHidden(page, selector, timeout = 30000) {
  await page.locator(selector).waitFor({ state: 'hidden', timeout });
}

async function assertElementAttribute(page, selector, attribute, value, customText) {
  await test.step(customText, async () => {
    const element = await page.locator(selector);
    const attributeValue = await element.getAttribute(attribute);
    expect(attributeValue).toBe(value);
  });
}

async function assertElementAttributeContains(locator, attribute, value, customText) {
  await test.step(customText, async () => {
    const attributeValue = await locator.getAttribute(attribute);
    expect(attributeValue).toContain(value);
  });
}

async function assertElementEnabled(element, customText) {
  await test.step(customText, async () => {
    const isEnabled = await element.isEnabled();
    expect(isEnabled).toBe(true);
  });
}

async function assertElementDisabled(element, customText) {
  await test.step(customText, async () => {
    const isDisabled = await element.isDisabled();
    expect(isDisabled).toBe(true);
  });
}

async function assertInputValue(element, expectedValue, customText) {
    await test.step(customText, async () => {
      const inputValue = await element.inputValue(); // Fetch input field value
      expect(inputValue).toBe(expectedValue);
    });
  }
  
async function clickAndWaitForNavigation(page, selector, timeout = 30000) {
  const [response] = await Promise.all([page.waitForNavigation({ timeout }), page.click(selector)]);
  return response;
}

async function assertCheckboxChecked(element, customText) {
  await test.step(customText, async () => {
    const isChecked = await element.isChecked();
    expect(isChecked).toBe(true);
  });
}

async function assertCheckboxUnchecked(page, selector, customText) {
  await test.step(customText, async () => {
    const element = await page.locator(selector);
    const isChecked = await element.isChecked();
    expect(isChecked).toBe(false);
  });
}

async function assertElementInnerHtml(page, selector, html, customText) {
  await test.step(customText, async () => {
    const element = await page.locator(selector);
    const innerHtml = await element.innerHTML();
    expect(innerHtml).toBe(html);
  });
}

async function waitForElementClass(page, selector, className, timeout = 30000) {
  const element = await page.locator(selector);
  await element.waitFor({ state: 'attached', timeout });
  const classes = await element.getAttribute('class');
  expect(classes).toContain(className);
}

async function writeFileSync(filePath, content) {
  await fs.writeFileSync(filePath, content, 'utf8');
}

async function readFileSync(filePath) {
  await fs.readFileSync(filePath, 'utf8');
}

function appendFileSync(filePath, content) {
  fs.appendFileSync(filePath, content, 'utf8');
}
async function assertIsNumber(value, customText) {
  await test.step(customText, async () => {
    const numberValue = Number(value);
    expect(typeof numberValue).toBe('number');
  });
}
async function assertElementTrue(element) {
  expect(element).toBe(true);
}
async function assertElementColor(elementLocator, expectedColor) {
  const color = await elementLocator.evaluate(el => {
    return window.getComputedStyle(el).color;
  });
  expect(color).toBe(expectedColor);
}

async function assertElementToBeEnabled(element) {
  await expect(element).toBeEnabled();
}

async function assertButtonDisabled(element) {
  const isButtonDisabled = await element.isDisabled();
  await expect(isButtonDisabled).toBe(true);
}
async function generateInvalidEmail() {
  const randomString = Math.random().toString(36).substring(2, 15);
  const invalidDomains = ['example', 'test', 'invalid', 'no-domain', 'wrong-format'];
  const randomDomain = invalidDomains[Math.floor(Math.random() * invalidDomains.length)];

  return `${randomString}@${randomDomain}`;
}
async function assertElementsSortedZtoA(eventNames, customText) {
  await test.step(customText, async () => {
    if (!Array.isArray(eventNames) || eventNames.length === 0) {
      throw new Error('eventNames must be a non-empty array');
    }
    const trimmedNames = eventNames.map(name => name.replace(/^\d+-/, '').trim());
    const sortedNames = [...trimmedNames].sort((a, b) => b.localeCompare(a));

    expect(trimmedNames).toEqual(sortedNames);
  });
}

async function assertElementsSortedAtoZ(eventNames, customText) {
  await test.step(customText, async () => {
    if (!Array.isArray(eventNames) || eventNames.length === 0) {
      throw new Error('eventNames must be a non-empty array');
    }
    const trimmedNames = eventNames.map(name => name.replace(/^\d+-/, '').trim());
    const sortedNames = [...trimmedNames].sort((a, b) => a.localeCompare(b));

    expect(trimmedNames).toEqual(sortedNames);
  });
}

module.exports = {
  scrollElement,
  assertElementVisible,
  assertElementNotVisible,
  assertToBeTruthy,
  assertToHaveProperty,
  assertElementHidden,
  assertTextPresent,
  assertElementHaveText,
  assertElementContainsText,
  assertUrlContains,
  screenshotElement,
  waitForElementVisible,
  waitForElementHidden,
  assertElementAttribute,
  assertElementEnabled,
  assertElementFocused,
  assertValueToBe,
  assertElementDisabled,
  assertInputValue,
  clickAndWaitForNavigation,
  assertCheckboxChecked,
  assertCheckboxUnchecked,
  assertElementInnerHtml,
  assertGreaterThan,
  waitForElementClass,
  writeFileSync,
  readFileSync,
  appendFileSync,
  assertEqualValues,
  assertNotEqualValues,
  assertIsNumber,
  assertElementAttributeContains,
  assertContainsValue,
  assertElementTrue,
  assertElementColor,
  assertElementToBeEnabled,
  assertButtonDisabled,
  generateInvalidEmail,
  assertElementsSortedAtoZ,
  assertElementsSortedZtoA
};
