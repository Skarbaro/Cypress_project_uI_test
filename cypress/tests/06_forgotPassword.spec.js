/// <reference types = "Cypress" />

import { commonPages } from '../page_objects/commonPageObjects';
import { landingPage } from '../page_objects/landingPageObjects';
import { forgotPassPage } from '../page_objects/forgotPassPageObject';
import { signInPage } from '../page_objects/signInPageObject';

import testData from '../fixtures/testData.json';

context('Recovery password', () => {
    beforeEach(function () {
        commonPages.visitPage();
        landingPage.buttonSignIn();
        signInPage.forgotPass();
        forgotPassPage.bodyForgotPasPage();
    })

    it('Recover password with existing email', () => {
        forgotPassPage.enterEmail(testData.Account1[0]);
        forgotPassPage.clickResetPassButton();
        forgotPassPage.messagePassChengeIsVisible();
        
    })

    it('Trying recover password with not existing email', () => {
        forgotPassPage.enterEmail(testData['invLogin']);
        forgotPassPage.clickResetPassButton();
        forgotPassPage.messageNoUserIsVisible();
    })

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
    })

})