/// <reference types = "Cypress" />

import { commonPages } from '../page_objects/commonPageObjects';
import { landingPage } from '../page_objects/landingPageObjects';
import { signInPage } from '../page_objects/signInPageObject';
import { projectPage } from '../page_objects/projectPageObject';
import { reposPageObject } from '../page_objects/reposPageObject';
import { analisysPage } from '../page_objects/analisysPageObjects';
import { developersPage } from '../page_objects/developersPageObjects';
import { commitsPage } from '../page_objects/commitsPageObjects';
import { overviewPage } from '../page_objects/overviewPageObjects';
import { violationsPage } from '../page_objects/violationsPageObjects';

const testData = require('../fixtures/testData.json');

context('Dashboard', () => {

    beforeEach(function () {
        cy.server();
        cy.route('POST', '/rpc/cquser').as('CQUser');
        cy.route('POST', '/rpc/project').as('Project');
        cy.route('POST', '/rpc/add_repo').as('addRepo');
        cy.route('POST', '/rpc/scanner_backend').as('scanner_backend');
        commonPages.visitPage();
        landingPage.buttonSignIn();
    })

    it('Test repo is scaned', () => {
        cy.log('Authorization')
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();
        cy.log('Select project');
        projectPage.selectProject(testData.Account1[2]);
        cy.log('Go to Setting page')
        commonPages.clickDashboardSettingsMenu();
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);
        reposPageObject.checkScanedStatusRepo();
        reposPageObject.checkUrlRepoPage();
        reposPageObject.blockRepoListIsVisible();
    })

    it('Test dashboard', () => {
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        projectPage.urlProjectPage();
        projectPage.gravatarIsPresent();
        cy.log('Select project');
        projectPage.selectProject(testData.Account1[2]);
        cy.log('Check Current Iteration page is opened');
        analisysPage.analisysPageNameIsPresent();
        cy.log('Check Code Quality page is opened')
        analisysPage.selectCodeQualityTab();
        commonPages.selectOverAllDate();
        analisysPage.metricsGraphCQPageIsPresent();
        analisysPage.checkMetricsDailyCodeRating();
        analisysPage.checkMetricsHIViolationsByDev();
        cy.log('Check Activity page is opened')
        analisysPage.selectActivityTab();
        analisysPage.checkMetricsCodeOutTimeline();
        analisysPage.checkMetricsFatCommits();
        cy.log('Check Developers page')
        commonPages.selectDashboardDevelopersPage();
        developersPage.graphDevelopersPageIsPresent();
        developersPage.checkMetricsInDev1();
        cy.log('Check Commits page')
        commonPages.selectDashboardCommitsPage();
        commitsPage.graphCommitsPageIsPresent();
        commitsPage.checkMetricsInCommits1();
        cy.log('Check Violations page')
        commonPages.selectDashboardViolationsPage();
        violationsPage.graphDevelopersPageIsPresent();
        violationsPage.checkFirstViolationsInList();
        cy.log('Check Overview page')
        commonPages.selectDashboardOverviewPage();
        overviewPage.graphDevelopersPageIsPresent();
    })

    it('Re Adding a repository', () => {
        cy.log('Authorization')
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.log('Select project');
        projectPage.selectProject(testData.Account1[2]);
        cy.log('Go to Setting page')
        commonPages.clickDashboardSettingsMenu();
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);
        cy.log('Remove repository')
        reposPageObject.clickOptionRepo();
        reposPageObject.selectDeleteRepo();
        reposPageObject.clickRemoveButton();
        cy.wait('@scanner_backend', 3).should('have.property', 'status', 200).then(console.log);
        reposPageObject.messageRepoDeletingIsVisible(testData['urlRepoQatestlab'], testData['branchRepoQatestlab']);
        // reposPageObject.checkRemoveStatusRepo();
        cy.wait(50000);
        cy.log('add repository');
        reposPageObject.addRepo(testData['urlRepoQatestlab'], testData['branchRepoQatestlab'])
    })

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
    })

})