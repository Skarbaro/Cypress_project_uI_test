/// <reference types = "Cypress" />

const { signInPage } = require("../page_objects/signInPageObject");
const { commonPages } = require("../page_objects/commonPageObjects");
const { landingPage } = require("../page_objects/landingPageObjects");
const { projectPage } = require("../page_objects/projectPageObject");

import testData from '../fixtures/testData.json';

context('Sign In user on CQ', () => {

    beforeEach(function () {
        commonPages.visitPage();
        landingPage.buttonSignIn();
    })

    it('Sign In, valid email and password', () => {
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();
    })

    it('Sign In, invalid email and valid password', () => {
        signInPage.authorization(testData["invLogin"], testData.Account1[1]);
        signInPage.warningInvalidLogin();
        projectPage.gravatarIsNotPresent();
    })
    
    it('Sign In, valid email and invalid password', () => {
        signInPage.authorization(testData.Account1[0], testData["invPassword"]);
        signInPage.warningInvalidLogin();
        projectPage.gravatarIsNotPresent();
    })

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
    })

})