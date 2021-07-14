/// <reference types = "Cypress" />

const { commonPages } = require('../page_objects/commonPageObjects');
const { landingPage } = require('../page_objects/landingPageObjects');

// TEst data
const testData = require('../fixtures/testData.json');
const { signInPage } = require('../page_objects/signInPageObject');
const { projectPage } = require('../page_objects/projectPageObject');
const { accountSettingsPageObject } = require('../page_objects/accountSettingsPageObject');
const { pracingPage } = require('../page_objects/pricingPageObject');

context('Test Account Settings page', () => {
    beforeEach(function () {
        cy.server();
        cy.route('POST', '/rpc/cquser').as('CQUser');
        cy.route('POST', '/rpc/project').as('Project');
        commonPages.visitPage();
        landingPage.buttonSignIn();
    })

    it('Test change Account Settings', () => {
        cy.log('Sign In user');
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.wait('@Project');
        cy.wait('@CQUser');
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();
        cy.log('Go to Account Settings page');
        commonPages.goToAccountSettingsPage();
        accountSettingsPageObject.generalTabIsPresent();
        cy.log('Chenge user name');
        accountSettingsPageObject.changeUserName(testData.Account1_1['user_name'], testData.Account1_1['new_user_name']);
        accountSettingsPageObject.clickUpdateButton();
        cy.log('Check update User');
        cy.wait('@CQUser');
        accountSettingsPageObject.checkUpdateMessage(testData.notification['update_user']);
        accountSettingsPageObject.checkUpdateUserName(testData.Account1_1['new_user_name']);
        cy.wait(10000);
        cy.log('Chenge user password');
        accountSettingsPageObject.enterOldPassword(testData.Account1_1['old_pass']);
        accountSettingsPageObject.enterNewPassword(testData.Account1_1['new_pass']);
        accountSettingsPageObject.clickUpdateButton();
        cy.wait('@CQUser');
        cy.log('Check update User password');
        accountSettingsPageObject.checkUpdateMessage(testData.notification['update_password']);
    })

    it('Test Sign In user with new password', () => {
        signInPage.authorization(testData.Account1[0], testData.Account1_1['new_pass']);
        cy.wait('@CQUser');
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();
    })

    it('Test change User password back', () => {
        cy.log('Sign In user');
        signInPage.authorization(testData.Account1[0], testData.Account1_1['new_pass']);
        cy.wait('@Project');
        cy.wait('@CQUser');
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();
        cy.log('Go to Account Settings page');
        commonPages.goToAccountSettingsPage();
        accountSettingsPageObject.generalTabIsPresent();
        cy.log('Chenge user name');
        accountSettingsPageObject.changeUserName(testData.Account1_1['new_user_name'], testData.Account1_1['user_name']);
        accountSettingsPageObject.enterOldPassword(testData.Account1_1['new_pass']);
        accountSettingsPageObject.enterNewPassword(testData.Account1_1['old_pass']);
        accountSettingsPageObject.clickUpdateButton();
        cy.log('Check update User');
        cy.wait('@CQUser');
        accountSettingsPageObject.checkUpdateMessage(testData.notification['update_user']);
        cy.wait(1000);
        accountSettingsPageObject.checkUpdateUserName(testData.Account1_1['user_name']);
    })

    it('Negative test change User information', () => {
        cy.log('Sign In user');
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.wait('@CQUser');
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();
        cy.log('Go to Account Settings page');
        commonPages.goToAccountSettingsPage();
        accountSettingsPageObject.generalTabIsPresent();
        cy.log('Enter invalid name, confirm password');
        cy.wait('@CQUser');
        accountSettingsPageObject.changeUserName(testData.Account1_1['user_name'], testData.Account1_1['invUser_name']);
        accountSettingsPageObject.enterOldPassword(testData.Account1_1['old_pass']);
        accountSettingsPageObject.enterDifferentPassword(testData.Account1_1['new_pass'], testData.Account1_1['invPassword']);
        accountSettingsPageObject.clickOnUserInfo();
        cy.log('Check validation message for User');
        cy.wait(1000);
        accountSettingsPageObject.checkValidationName();
        accountSettingsPageObject.checkValidationPass();
    })

    it('Test Subscription tab', () => {
        cy.log('Sign In user');
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.wait('@CQUser');
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();
        cy.log('Go to Account Settings page');
        commonPages.goToAccountSettingsPage();
        cy.log('Open Subscription Tab');
        accountSettingsPageObject.subTabIsPresent();
        cy.log('Open unsubscription modal window');
        accountSettingsPageObject.clickUnsubButton();
        accountSettingsPageObject.checkModalUnsubIsPresent();
        cy.log('Close unsubscription modal window');
        accountSettingsPageObject.closedModalUnsub();
        cy.log('Open pricing page');
        accountSettingsPageObject.clickUpgradePlanButton();
        pracingPage.pricigPageIsPresent();
    })

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
        cy.window().then(win => {
            win.location.href = 'about:blank';
        });
    })

})