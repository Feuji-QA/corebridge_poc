const {test,expect} = require('@playwright/test');
const indexPage=require('../utils/index.js');
require('dotenv').config();
let aimbaseloginpage;
test.describe('Performing actions on Dashboard Page', () => {
    test.beforeEach(async ({ page }) => {
        aimbaseloginpage = new indexPage.LoginPage(page);
    });
    test('Verify aimbase creation', async ({ page }) => {
        await aimbaseloginpage.launchUrl();
        await aimbaseloginpage.loginFlow();
        await aimbaseloginpage.createLead();
    });
});

