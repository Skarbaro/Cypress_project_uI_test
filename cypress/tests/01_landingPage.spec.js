/// <reference types = "Cypress" />

import { commonPages } from '../page_objects/commonPageObjects';
import { landingPage } from '../page_objects/landingPageObjects';
const testData = require('../fixtures/testData.json');

context('Landing page tests (text)', () => {
    beforeEach(function () {
        commonPages.visitPage();
    })

    it('Logo on the Landing Page', () => {
        commonPages.headerLogoIsPresent();
    })

    it('Check main Intro', () => {
        landingPage.mainIntro();
    })

    testData['title_on_landing'].forEach((testData) => {
        it(`title_on_landing"${testData}"`, () => {
            landingPage.mainContentTitle(testData);
        })
    })

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
    })

})