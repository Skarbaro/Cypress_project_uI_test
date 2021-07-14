/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const url_developers_page_selector = '/project/developers';
const graph_developers_selector = '.col-xl-9 > .cq-card';
const developers_list_selector = '.cq-page > :nth-child(2)';
// Selectors developers table
const name_developer_selector = '.col-member_id';
const td_loc_selector = '.expandable > .col-td_ratio';
const v_kloc_selector = '.expandable > .col-violations_ratio';
const c_kloc_selector = '.expandable > .col-complexity_ratio';
const cgc_kloc_selector = '.expandable > .col-cgcomplexity_ratio';
const d_kloc_selector = '.expandable > .col-duplications_ratio';
const td_selector = '.expandable > .col-td_index';
const hi_selectot = '.expandable > .col-high_impact_violations';
const loc_selector = '.expandable > .col-lines';
const commits_selector = '.expandable > .col-commits_count';

// Test data
const testData = require('../fixtures/testData.json');

export class DevelopersPage {

    graphDevelopersPageIsPresent() {
        commonPages.urlPage(url_developers_page_selector);
        cy.get(graph_developers_selector).contains(testData.graph_developers_page[0]).should('be.visible');
        cy.get(developers_list_selector).contains(testData.graph_developers_page[1]).should('be.visible');
    }

    checkMetricsInDev1() {
        cy.get(name_developer_selector).contains(testData.metrics_QATestLab['dev_name']).should('be.visible');
        cy.get(td_loc_selector).contains(testData.metrics_QATestLab['td_loc']).should('be.visible');
        cy.get(v_kloc_selector).contains(testData.metrics_QATestLab['v_kloc']).should('be.visible');
        cy.get(c_kloc_selector).contains(testData.metrics_QATestLab['c_kloc']).should('be.visible');
        cy.get(cgc_kloc_selector).contains(testData.metrics_QATestLab['cgc_kloc']).should('be.visible');
        cy.get(d_kloc_selector).contains(testData.metrics_QATestLab['d_kloc']).should('be.visible');
        cy.get(td_selector).contains(testData.metrics_QATestLab['td_kloc']).should('be.visible');
        cy.get(hi_selectot).contains(testData.metrics_QATestLab['h_impacts']).should('be.visible');
        cy.get(loc_selector).contains(testData.metrics_QATestLab['loc']).should('be.visible');
        cy.get(commits_selector).contains(testData.metrics_QATestLab['commits']).should('be.visible');
    }

}

export const developersPage = new DevelopersPage();