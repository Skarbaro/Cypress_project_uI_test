/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const analisys_name_selector = '.col-md-4 > span';
const currentIteration_tab_selector = ':nth-child(1) > .cq-tabs-link';
const codeQuality_tab_selector = ':nth-child(3) > .cq-tabs-link';
const activity_tab_selector = ':nth-child(5) > .cq-tabs-link';
const url_currentIteration = '/project/analysis/currentIteration';
const url_codeQuality = '/project/analysis/codeQuality';
const url_activity = '/project/analysis/activity';
// Code Quality Page selectors
const dailyCodeRating = '.cq-page > :nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(1)';
const codeMetricsByDeveloper = '.mb-lg-0 > .cq-card';
const codeMetricsByRepository = ':nth-child(2) > .cq-card';
const hi_violations_by_commit = '.cq-page > :nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(3)';
const hi_violations_by_dev = '.cq-page > :nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(4)';
const number_of_developer = '.row > :nth-child(1) > .flex-column';
const number_of_daysCommits = '.row > :nth-child(2) > .flex-column';
const totalGreade = ':nth-child(3) > .flex-column';
const hi_developer_selector = '.cq-vertical-scroll > .mb-4 > .container-fluid > .row.align-items-center > .col-md-5';
const hi_opened_selector = '.cq-vertical-scroll > .mb-4 > .container-fluid > .row.align-items-center > .col-md-7 > .row > :nth-child(1)';
const hi_per_kloc_selector = '.cq-vertical-scroll > .mb-4 > .container-fluid > .row.align-items-center > .col-md-7 > .row > :nth-child(2)';
// Activity page selectors
const codeOutputTimeline_selector = '.cq-page > :nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(1)';
const fatCommits_selector = '.cq-page > :nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(2)';
const commentSize_selectors = '.cq-page > :nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(3)';
const ticketsMentioned_selector = '.cq-page > :nth-child(1) > :nth-child(3) > :nth-child(1) > :nth-child(4)';
const code_affected_by_developer = '.mb-lg-0 > .cq-card';
const added_loc_selector = '.cq-card-body > .flex-wrap-reverse > .col-xl-3 > .container-fluid > .row > :nth-child(1) > .flex-column';
const removed_loc_selector = '.cq-card-body > .flex-wrap-reverse > .col-xl-3 > .container-fluid > .row > :nth-child(2) > .flex-column';
const totalLoc_selector = '.cq-card-body > .flex-wrap-reverse > .col-xl-3 > .container-fluid > .row > :nth-child(3) > .flex-column';
const fat_commits_list_selector = ':nth-child(2) > .cq-card-body > :nth-child(1) > .mt-4 > .cq-vertical-scroll';

// Test data
const testData = require('../fixtures/testData.json');

export class AnalisysPage {

    analisysPageNameIsPresent() {
        cy.get(analisys_name_selector).contains('Analysis').should('be.visible');
        commonPages.urlPage(url_currentIteration);
    }

    selectCurrentIterationTab() {
        cy.get(currentIteration_tab_selector).contains('Current Iteration').should('be.visible').click();
        commonPages.urlPage(url_currentIteration);
    }

    selectCodeQualityTab() {
        cy.get(codeQuality_tab_selector).contains('Code Quality').should('be.visible').click();
        commonPages.urlPage(url_codeQuality);
    }

    selectActivityTab() {
        cy.get(activity_tab_selector).contains('Activity').should('be.visible').click();
        commonPages.urlPage(url_activity);
    }

    // Code Quality Page
    metricsGraphCQPageIsPresent() {
        cy.get(dailyCodeRating).contains(testData.graph_cq_page[0]).should('be.visible');
        cy.get(codeMetricsByDeveloper).contains(testData.graph_cq_page[1]).should('be.visible');
        cy.get(codeMetricsByRepository).contains(testData.graph_cq_page[2]).should('be.visible');
        cy.get(hi_violations_by_commit).contains(testData.graph_cq_page[3]).should('be.visible');
        cy.get(hi_violations_by_dev).contains(testData.graph_cq_page[4]).should('be.visible');
    }

    checkMetricsDailyCodeRating() {
        cy.get(number_of_developer).contains(testData.metrics_QATestLab['number_developer']).should('be.visible');
        cy.get(number_of_daysCommits).contains(testData.metrics_QATestLab['number_days_commit']).should('be.visible');
        cy.get(totalGreade).should('be.visible', 'have.img', '/images/grades/grade-5.svg')
    }

    checkMetricsHIViolationsByDev() {
        cy.get(hi_developer_selector).contains(testData.metrics_QATestLab['dev_name']).should('be.visible');
        cy.get(hi_opened_selector).contains(testData.metrics_QATestLab['hi_opened']).should('be.visible');
        cy.get(hi_per_kloc_selector).contains(testData.metrics_QATestLab['hi_per_kloc']).should('be.visible');
    }

    // Activity Page
    metricsGraphActivityPageIsPresent() {
        cy.get(codeOutputTimeline_selector).contains(testData.graph_activity_page[0]).should('be.visible');
        cy.get(fatCommits_selector).contains(testData.graph_activity_page[1]).should('be.visible');
        cy.get(commentSize_selectors).contains(testData.graph_activity_page[2]).should('be.visible');
        cy.get(ticketsMentioned_selector).contains(testData.graph_activity_page[3]).should('be.visible');
        cy.get(code_affected_by_developer).contains(testData.graph_activity_page[4]).should('be.visible');
    }

    checkMetricsCodeOutTimeline() {
        cy.get(added_loc_selector).contains(testData.metrics_QATestLab['add_loc']).should('be.visible');
        cy.get(removed_loc_selector).contains(testData.metrics_QATestLab['removed_loc']).should('be.visible');
        cy.get(totalLoc_selector).contains(testData.metrics_QATestLab['total_loc']).should('be.visible');
    }

    checkMetricsFatCommits() {
        cy.get(fat_commits_list_selector).contains(testData.metrics_QATestLab['dev_name']).should('be.visible');
        cy.get(fat_commits_list_selector).contains(testData.metrics_QATestLab['median_commit']).should('be.visible');
        cy.get(fat_commits_list_selector).contains(testData.metrics_QATestLab['fat_commits']).should('be.visible');
        cy.get(fat_commits_list_selector).contains(testData.metrics_QATestLab['big_hash_commit']).should('be.visible');
        cy.get(fat_commits_list_selector).should('be.visible', 'have.img', '/images/grades/grade-7.svg');
    }

}

export const analisysPage = new AnalisysPage();