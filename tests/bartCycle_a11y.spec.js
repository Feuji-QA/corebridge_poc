import runAccessibilityTests from '../utils/a11y';
const { test, expect } = require('@playwright/test');
const indexPage=require('../utils/index.js');
require("dotenv").config();
test.describe('BartCycle Home Page Accessibility', () => {
    test('automatically detectable accessibility issues', {tag: '@regression'},  async ({ page }) => {
      const bartleCyclePage = new indexPage.BartleCyclePage(page)
      await bartleCyclePage.navigateBartleCyclePage();
      await runAccessibilityTests("HomePage",page)
    });
  });