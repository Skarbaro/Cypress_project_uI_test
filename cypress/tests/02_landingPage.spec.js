/// <reference types = "Cypress" />

import { commonPages } from '../page_objects/commonPageObjects';
import { landingPage } from '../page_objects/landingPageObjects';
import { signInPage } from '../page_objects/signInPageObject';
import { signUpPage } from '../page_objects/signUpPageObject';

const testData = require('../fixtures/testData.json');

context('Landing page tests (functional part)', () => {
    beforeEach(function () {
        commonPages.visitPage();
    })

    it('Check "Sign In" button', () => {
        landingPage.buttonSignIn();
        signInPage.signInTitle();
    })

    it('Check "Sign Up" button', () => {
        landingPage.buttonSignUp();
        signUpPage.signUpTitle();
    })

    it('Test "Roles" Bar', () => {
        landingPage.mainContentRoles();
    })

    it('Test "Unlock the hidden..." Bar', () => {
        landingPage.mainContentUnlockWork();
    })

    it('Navigation "FAQ" Bar', () => {
        landingPage.mainFaqMenu();
    })

    it('Test "Trending topics" blog link', () => {
        landingPage.checkLinkTopic(testData.topicArticle.article_url1[0], testData.topicArticle.article_url1[1]);
        landingPage.checkLinkTopic(testData.topicArticle.article_url2[0], testData.topicArticle.article_url2[1])
    })

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
    })
})