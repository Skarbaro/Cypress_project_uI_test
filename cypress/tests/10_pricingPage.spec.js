/// <reference types = "Cypress" />

const helper = require('../support/helper');

import { billingPage } from '../page_objects/billingPageObject';
import { commonPages } from '../page_objects/commonPageObjects';
import { landingPage } from '../page_objects/landingPageObjects';
import { pracingPage } from '../page_objects/pricingPageObject';
import { requestDemoPage } from '../page_objects/requestDemoPageObject';
import { signInPage } from '../page_objects/signInPageObject';
import { signUpPage } from '../page_objects/signUpPageObject';

const testData = require('../fixtures/testData.json');
const service_list = testData.pricingPage['service_list']
// const totalPrice = `${helper.totalPay(12, 1)}`;

context('Pricing page', () => {
    beforeEach(function () {
        commonPages.visitPage();
    })

    it('Pricing page, user is not sign in. test visual part', () => {
        cy.log('Go to pricing page. User not Sign In')
        landingPage.linksPageLending('Pricing', testData.linksLending.pricing);
        cy.log('Pricing page is present');
        pracingPage.pricigPageIsPresent();
        cy.log('Check block with plans')
        pracingPage.checkCompanyBlockUserNotSignIn();
        pracingPage.checkEnterpriseBlock();
        cy.log('Check paln list')
        service_list.forEach((serv_list) => {
            pracingPage.checkPlanList(serv_list);
        })
    })

    it('Pricing page, user is not sign in. test FAQ menu', () => {
        cy.log('Go to pricing page. User not Sign In')
        landingPage.linksPageLending('Pricing', testData.linksLending.pricing);
        cy.log('Pricing page is present');
        pracingPage.pricigPageIsPresent();
        cy.log('Check block FAQ menu')
        pracingPage.pricingFaqMenu();
    })

    it('Pricing page, user is sign in. test visual part', () => {
        cy.log('Sign In user')
        landingPage.buttonSignIn();
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.log('Go to pricing page')
        commonPages.goToPricingPageSignIn();
        cy.log('Pricing page is present');
        pracingPage.pricigPageIsPresent();
        cy.log('Check block with plans')
        pracingPage.checkCompanyBlockUserSignIn();
        pracingPage.checkEnterpriseBlock();
        cy.log('Check paln list')
        service_list.forEach((serv_list) => {
            pracingPage.checkPlanList(serv_list);
        })
    })

    it('Pricing page, user is not sign in, check the transition to the Sign Up page', () => {
        cy.log('Go to pricing page. User not Sign In')
        landingPage.linksPageLending('Pricing', testData.linksLending.pricing);
        cy.log('Pricing page is present');
        pracingPage.pricigPageIsPresent();
        cy.log('Click on the "Try for free" button');
        pracingPage.clickTryForFreeButton();
        cy.log('Check "Sign Up" page is present');
        signUpPage.signUpTitle();
    })

    it('Check the transition to the request demo page', () => {
        cy.log('Go to pricing page. User not Sign In')
        landingPage.linksPageLending('Pricing', testData.linksLending.pricing);
        cy.log('Pricing page is present');
        pracingPage.pricigPageIsPresent();
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

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
    })
})