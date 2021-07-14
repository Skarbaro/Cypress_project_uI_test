/// <reference types = "Cypress" />

import { commonPages } from '../page_objects/commonPageObjects';
import { landingPage } from '../page_objects/landingPageObjects';
import { pracingPage } from '../page_objects/pricingPageObject';
import { cookiesPage } from '../page_objects/cookiesPageObject';
import { codeQualityPage } from '../page_objects/codeQualityPageObject';
import { privacyPage } from '../page_objects/privacyPageObject';
import { termsPage } from '../page_objects/termsPageObject';
import { signInPage } from '../page_objects/signInPageObject';
import { signUpPage } from '../page_objects/signUpPageObject';

const testData = require('../fixtures/testData.json');

context('Landing page tests (links)', () => {
    beforeEach(function () {
        commonPages.visitPage();
    })

    it('The "Code Quality Rank" link',  () => {
        landingPage.selectCodeQualityRank();
        codeQualityPage.backgroundIsPresent();
    })
    
    it('The "pricing" link',  () => {
        landingPage.linksPageLending('Pricing', testData.linksLending.pricing);
        pracingPage.pricigPageIsPresent();
    })

    it('The "Get Started 1" button', () => {
        landingPage.buttonGetStarted1();
        signUpPage.signUpTitle();
    })

    it('The "Get Started 2" button', () => {
        landingPage.buttonGetStarted2();
        signUpPage.signUpTitle();
    })

    it('The "Terms & Conditions" link',  () => {
        landingPage.linksPageLending('Terms & Conditions', testData.linksLending.terms);
        termsPage.termsIsPresent();
        termsPage.h2TermsIsPresent();
    })

    it('The "Privacy Policy" link',  () => {
        landingPage.linksPageLending('Privacy Policy', testData.linksLending.privacy);
        privacyPage.privacyIsPresent();
    })

    it('The "Cookie Policy" link',  () => {
        landingPage.linksPageLending('Cookie Policy', testData.linksLending.cookies);
        cookiesPage.bodyCookiesPage();
    })

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
    })

})