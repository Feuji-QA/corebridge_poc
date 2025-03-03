const { AxeBuilder } = require("@axe-core/playwright");
const { createHtmlReport } = require("axe-html-reporter");

async function runAccessibilityTests(pageName,page) {
  await page.waitForTimeout(parseInt(5000));
  const accessibilityScanResults = await new AxeBuilder( {page} ).analyze();
  const reportPath = `a11y_${pageName}.html`;
  createHtmlReport({
    results: 
      accessibilityScanResults
    ,
    options: {
      projectKey: "BartleCycle",
      reportFileName:reportPath,
      outputDir:"reports/a11y/"
    },
  }); 
};

module.exports = runAccessibilityTests;