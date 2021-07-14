/// <reference types = "Cypress" />

const { commonPages } = require('../page_objects/commonPageObjects');
const { landingPage } = require('../page_objects/landingPageObjects');

// TEst data
const testData = require('../fixtures/testData.json');
const { pracingPage } = require('../page_objects/pricingPageObject');
const { requestDemoPage } = require('../page_objects/requestDemoPageObject');
const { signInPage } = require('../page_objects/signInPageObject');

context('Test Account Settings page', () => {
    beforeEach(function () {
        cy.server();
        cy.route('POST', '/rpc/cquser').as('CQUser');
        cy.route('POST', '/rpc/project').as('Project');
        commonPages.visitPage();
    })

    it('Test Request Demo user not sign in', () => {
        cy.log('Go to pricing page. User not Sign In');
        landingPage.linksPageLending('Pricing', testData.linksLending.pricing);
        cy.log('Click on the "Try for free" button');
        pracingPage.clickRequestDemoPageButton();
        cy.log('Request demo page is present');
        requestDemoPage.demoPageIsPresent();
        requestDemoPage.checkFormDemoIsPresent();
        requestDemoPage.requestDemo(testData.requestDemo['not_reg_email'], testData.requestDemo['your_name'],
         testData.requestDemo['company_name'], testData.requestDemo['number_dev']);
        requestDemoPage.clickRequestDemoButton();
        requestDemoPage.checkDemoMessageIsPresent(testData.requestDemo['message']);
    })

    it('Test Request Demo user sign in', () => {
        cy.log('Sign In');
        landingPage.buttonSignIn();
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.log('Go to pricing page');
        commonPages.goToPricingPageSignIn();
        cy.log('Click on the "Try for free" button');
        pracingPage.clickRequestDemoPageButton();
        cy.log('Request demo page is present');
        requestDemoPage.demoPageIsPresent();
        requestDemoPage.checkFormDemoIsPresent();
        requestDemoPage.requestDemo(testData.requestDemo['reg_email'], testData.requestDemo['your_name'],
         testData.requestDemo['company_name'], testData.requestDemo['number_dev']);
        requestDemoPage.clickRequestDemoButton();
        requestDemoPage.checkDemoMessageIsPresent(testData.requestDemo['message']);
    })

    it('Test Request Demo test validation fields', () => {
        cy.log('Go to pricing page. User not Sign In');
        landingPage.linksPageLending('Pricing', testData.linksLending.pricing);
        cy.log('Click on the "Try for free" button');
        pracingPage.clickRequestDemoPageButton();
        cy.log('Request demo page is present');
        requestDemoPage.demoPageIsPresent();
        requestDemoPage.checkFormDemoIsPresent();
        requestDemoPage.requestDemo(testData.requestDemo['inv_email'], testData.requestDemo['inv_yname'],
         testData.requestDemo['inv_cname'], testData.requestDemo['inv_number']);
        requestDemoPage.checkValidationMessageIsPresent();
    })

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
    })

})