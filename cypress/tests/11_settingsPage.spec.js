/// <reference types = "Cypress" />

import { commonPages } from '../page_objects/commonPageObjects';
import { landingPage } from '../page_objects/landingPageObjects';
import { reposPageObject } from '../page_objects/reposPageObject';
import { settingsPage } from '../page_objects/settingsPageObjects';

const helper = require('../support/helper');
const testData = require('../fixtures/testData.json');

// Invite user data
const username = testData.metrics_QATestLab['dev_name'];
const email = `${helper.randomString("alpha", 10)}@automationtest.com`;
const project = testData.Account1[3];
const permission = testData.permissions['repo'];

context('Settings page', () => {
    beforeEach(function () {
        cy.server();
        cy.route('POST', '/rpc/cquser').as('CQUser');
        cy.route('POST', '/rpc/project').as('Project');
        cy.route('POST', '/rpc/add_repo').as('addRepo');
        cy.route('POST', '/rpc/scanner_backend').as('scanner_backend');
        commonPages.visitPage();
        landingPage.buttonSignIn();
    })

    it('Test "Repository" tab', () => {
        settingsPage.goToSettingsPage();
        cy.log('Repositories');
        settingsPage.repoTabIsPresent();
        reposPageObject.blockRepoListIsVisible();
        cy.log('Test search Repository');
        settingsPage.searchRepo();
        settingsPage.checkSearchRepo();        
    })

    it('Test "SSH key" tab', () => {
        settingsPage.goToSettingsPage();
        cy.log('Repositories');
        settingsPage.repoTabIsPresent();
        reposPageObject.blockRepoListIsVisible();
        cy.log('SSH key tab')
        settingsPage.sshKeyTabIsPresent();
        settingsPage.checkSshTabElmentIsPresent();
        cy.log('Click "Copy" button')
        settingsPage.checkCopySSHkey();
    })

    it('Test "Users" tab', () => {
        settingsPage.goToSettingsPage();
        cy.log('Repositories');
        settingsPage.repoTabIsPresent();
        reposPageObject.blockRepoListIsVisible();
        cy.log('Users Tab');
        settingsPage.usersTabIsPresent();
        settingsPage.checkInviteTabElementIsPresent();
        cy.log('Open invite user form');
        settingsPage.openInviteUserForm();
        cy.log('Enter data invite form');
        settingsPage.enterDataInviteUserForm(username, email, project, permission);
        settingsPage.clickInviteUserButton();
        cy.wait('@CQUser');
        settingsPage.checkUserWasInvited(username);
        cy.log('Search invite user');
        settingsPage.searchInvUser();
        cy.log('Delete invite user');
        cy.wait(10000);
        settingsPage.selectDeleteInvUser();
        cy.wait('@CQUser');
        settingsPage.checkInvUserDeleted();
    })

    it('Test "Rules" tab', () => {
        settingsPage.goToSettingsPage();
        cy.log('Repositories');
        settingsPage.repoTabIsPresent();
        reposPageObject.blockRepoListIsVisible();
        cy.log('Rules Tab');
        settingsPage.rulesTabIsPresent();
        settingsPage.searchRule();
        cy.wait(5000);
        settingsPage.checkRulesTabElementsIsPresent();
    })

    it('Test "Iteration" tab', () => {
        settingsPage.goToSettingsPage();
        cy.log('Repositories');
        settingsPage.repoTabIsPresent();
        reposPageObject.blockRepoListIsVisible();
        cy.log('Iterations Tab');
        settingsPage.iterationsTabIsPresent();
        settingsPage.checkIterationTabElementsIsPresent();
        cy.log('Open Edit iteration form');
        settingsPage.selectEditIteration();
        settingsPage.returnToIterationsTab();
        cy.log('Delete Iteration');
        settingsPage.deleteIteration();
        cy.log('Create Iteration');
        settingsPage.addIteration();
    })
    
    it('Test "Reports" tab', () => {
        settingsPage.goToSettingsPage();
        cy.log('Repositories');
        settingsPage.repoTabIsPresent();
        reposPageObject.blockRepoListIsVisible();
        cy.log('Reports Tab');
        settingsPage.reportsTabIsPresent();
        cy.log('Check search Developer');
        settingsPage.searchDevReports();
        settingsPage.checkReportsTabElementsIsPresent();
        cy.log('Check select day report');
        settingsPage.selectCheckboxDay();
        cy.wait('@scanner_backend');
        settingsPage.uncheckCheckboxDay();
        cy.log('Check select weekly report');
        settingsPage.selectCheckboxWeek();
        cy.wait('@scanner_backend');
        settingsPage.uncheckCheckboxWeek();
    })

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
        cy.window().then(win => {
            win.location.href = 'about:blank';
        });
    })
})