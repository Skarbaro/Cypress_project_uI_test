/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const url_commits_page = '/project/commits';
const field_commits_selector = '.col-xl-9 > .cq-card';
const field_summary_selector = '.col-xl-3 > .cq-card';
const field_commits_list_selector = '.cq-page > :nth-child(2)'; 

const commithash_selector = ':nth-child(3) > .col-commit_hash';
const greade_selector = ':nth-child(3) > .col-undefined';
const tdLoc_selector = ':nth-child(3) > .col-td_ratio';
const vKLoc_selector = ':nth-child(3) > .col-violations_ratio';
const cKLoc_selector = ':nth-child(3) > .col-complexity_ratio';
const cgcKLoc_selector = ':nth-child(3) > .col-cgcomplexity_ratio';
const dKLoc_selector = ':nth-child(3) > .col-duplications_ratio';
const td_selector = ':nth-child(3) > .col-td_index';
const high_impact_selector = ':nth-child(3) > .col-high_impact_violations';
const addedLoc_selector = ':nth-child(3) > .col-added_lines';
const removedLoc_selector = ':nth-child(3) > .col-removed_lines';

// Test data
const testData = require('../fixtures/testData.json');

export class CommitsPage {

    graphCommitsPageIsPresent() {
        commonPages.urlPage(url_commits_page);
        cy.get(field_commits_selector).contains(testData.graph_commits_page[0]).should('be.visible');
        cy.get(field_summary_selector).contains(testData.graph_commits_page[1]).should('be.visible');
        cy.get(field_commits_list_selector).contains(testData.graph_commits_page[2]).should('be.visible');
    }

    checkMetricsInCommits1() {
        cy.get(commithash_selector).contains(testData.commits_metrics_QATestLab.e18bccf['hash_commit']).should('be.visible');
        cy.get(greade_selector).should('be.visible', 'have.img', testData.commits_metrics_QATestLab.e18bccf['grade']);
        cy.get(tdLoc_selector).contains(testData.commits_metrics_QATestLab.e18bccf['tdloc']).should('be.visible');
        cy.get(vKLoc_selector).contains(testData.commits_metrics_QATestLab.e18bccf['vkloc']).should('be.visible');
        cy.get(cKLoc_selector).contains(testData.commits_metrics_QATestLab.e18bccf['ckloc']).should('be.visible');
        cy.get(cgcKLoc_selector).contains(testData.commits_metrics_QATestLab.e18bccf['cgckloc']).should('be.visible');
        cy.get(dKLoc_selector).contains(testData.commits_metrics_QATestLab.e18bccf['dkloc']).should('be.visible');
        cy.get(td_selector).contains(testData.commits_metrics_QATestLab.e18bccf['td']).should('be.visible');
        cy.get(high_impact_selector).contains(testData.commits_metrics_QATestLab.e18bccf['high_impact']).should('be.visible');
        cy.get(addedLoc_selector).contains(testData.commits_metrics_QATestLab.e18bccf['addedLoc']).should('be.visible');
        cy.get(removedLoc_selector).contains(testData.commits_metrics_QATestLab.e18bccf['removedLoc']).should('be.visible');
    }

}

export const commitsPage = new CommitsPage();