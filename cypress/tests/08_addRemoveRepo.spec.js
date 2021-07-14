/// <reference types = "Cypress" />

import { commonPages } from '../page_objects/commonPageObjects';
import { landingPage } from '../page_objects/landingPageObjects';
import { signInPage } from '../page_objects/signInPageObject';
import { projectPage } from '../page_objects/projectPageObject'
import { addProjectPageObject } from '../page_objects/addProjectPageObject';
import { wizardRepoPage } from '../page_objects/wizardRepoPageObject';
import { reposPageObject } from '../page_objects/reposPageObject';
import { settingsPage } from '../page_objects/settingsPageObjects';

const testData = require('../fixtures/testData.json');


context('Add / Remove Reposotory', () => {

    beforeEach(function () {
        cy.server();
        cy.route('POST', '/rpc/cquser').as('CQUser');
        cy.route('POST', '/rpc/project').as('Project');
        cy.route('POST', '/rpc/add_repo').as('addRepo');
        cy.route('POST', '/rpc/scanner_backend').as('scanner_backend');
        commonPages.visitPage();
        landingPage.buttonSignIn();
    })

    it('test "Add Repo"', () => {
        cy.log('Sign In user');
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.wait('@CQUser').should('have.property', 'status', 200).then(console.log)
        cy.wait('@Project').should('have.property', 'status', 200).then(console.log);
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();

        cy.log('Select Project')
        projectPage.selectProject(testData['testProject']);

        cy.log('Add repository')
        addProjectPageObject.clickAddRepoButton();
        cy.wait('@addRepo').should('have.property', 'status', 200).then(console.log);
        wizardRepoPage.selectCheakBoxPrivateRepo();
        wizardRepoPage.checkSshKeyIsVisible();
        wizardRepoPage.enterUrlAndBranch(testData['urlRepo'], testData['branchRepo']);
        wizardRepoPage.checkRepoPrivateHint(testData.notification['messageWarningHttp']);
        wizardRepoPage.clickAddRepoButton();
        cy.wait('@addRepo').should('have.property', 'status', 200).then(console.log);
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);
        wizardRepoPage.messageRepoAddIsVisible(testData['urlRepo'], testData['branchRepo']);

        cy.log('Check Repo is added')
        reposPageObject.checkUrlRepoPage();
        reposPageObject.blockRepoListIsVisible();
        // cy.wait(20000);
        // reposPageObject.checkStatusRepo();
    })

    it('test "Repository already exists"', () => {
        cy.log('Sign In user');
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.wait('@CQUser').should('have.property', 'status', 200).then(console.log)
        cy.wait('@Project').should('have.property', 'status', 200).then(console.log);
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();
        cy.log('Select Project')
        projectPage.selectProject(testData['testProject']);
        cy.log('Go to Setting page');
        commonPages.clickDashboardSettingsMenu();
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);
        settingsPage.settingsPageIsPresent();
        cy.log('Add repository')
        settingsPage.clickAddRepoButton();
        wizardRepoPage.enterUrlAndBranch(testData['urlRepo'], testData['branchRepo']);
        wizardRepoPage.checkRepoPrivateHint(testData.notification['messageWarningHttp']);
        wizardRepoPage.clickAddRepoButton();
        wizardRepoPage.messageRepoIsNotAdd(testData.notification['repo_already_exists']);
        cy.wait(3000);
        settingsPage.repoTabIsNotPresent();
    })

    it('test "Remove Repo"', () => {
        cy.log('Sign In user');
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.wait('@Project').should('have.property', 'status', 200).then(console.log);
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();

        cy.log('Select Project')
        projectPage.selectProject(testData['testProject']);
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);

        cy.log('Go to Setting page')
        commonPages.clickDashboardSettingsMenu();
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);
        reposPageObject.checkUrlRepoPage();
        reposPageObject.blockRepoListIsVisible();

        cy.log('Remove repository')
        reposPageObject.clickOptionRepo();
        reposPageObject.selectDeleteRepo();
        reposPageObject.clickRemoveButton();
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);
        reposPageObject.messageRepoDeletingIsVisible(testData['urlRepo'], testData['branchRepo']);
        // reposPageObject.checkRemoveStatusRepo();
    })

    it('test "Validation Url"', () => {
        cy.log('Sign In user');
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.wait('@CQUser').should('have.property', 'status', 200).then(console.log)
        cy.wait('@Project').should('have.property', 'status', 200).then(console.log);
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();

        cy.log('Select Project')
        projectPage.selectProject(testData['testProject']);

        cy.log('Add repository')
        addProjectPageObject.clickAddRepoButton();
        cy.wait('@addRepo').should('have.property', 'status', 200).then(console.log);
        wizardRepoPage.selectCheakBoxPrivateRepo();
        wizardRepoPage.checkSshKeyIsVisible();

        wizardRepoPage.enterUrlAndBranch(testData['urlRepo'], testData['invBranchRepo']);
        wizardRepoPage.checkRepoPrivateHint(testData.notification['messageWarningHttp']);
        wizardRepoPage.clickAddRepoButton();
        cy.wait('@addRepo').should('have.property', 'status', 200).then(console.log);
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);
        wizardRepoPage.messageRepoIsNotAdd(testData.notification['invalid_branch']);
    })

    it('test "Validation Branch"', () => {
        cy.log('Sign In user');
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.wait('@CQUser').should('have.property', 'status', 200).then(console.log)
        cy.wait('@Project').should('have.property', 'status', 200).then(console.log);
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();

        cy.log('Select Project')
        projectPage.selectProject(testData['testProject']);

        cy.log('Add repository')
        addProjectPageObject.clickAddRepoButton();
        cy.wait('@addRepo').should('have.property', 'status', 200).then(console.log);
        wizardRepoPage.selectCheakBoxPrivateRepo();
        wizardRepoPage.checkSshKeyIsVisible();
        wizardRepoPage.enterUrlAndBranch(testData['invUrlRepo'], testData['branchRepo']);
        wizardRepoPage.checkRepoPrivateHint(testData.notification['messageWarningHttp']);
        wizardRepoPage.clickAddRepoButton();
        cy.wait('@addRepo').should('have.property', 'status', 200).then(console.log);
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);
        wizardRepoPage.messageRepoIsNotAdd(testData.notification['invalid_url']);
    })

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
    })

})