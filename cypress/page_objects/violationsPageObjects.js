/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const url_violations_page = '/project/violations';
const graph_violations_selector = '.col-xl-9 > .cq-card';
const violations_list_selector = '.cq-page > :nth-child(2)';
// Violations List selector
const technology_selector = 'tbody > :nth-child(1) > .col-language';
const type_selector = 'tbody > :nth-child(1) > .col-type';
const title_selector = 'tbody > :nth-child(1) > .col-title';
const td_index_selector = ':nth-child(1) > .col-td_index';
const issue_status_selector = 'tbody > :nth-child(1) > .col-issue_status';
const owner_selector = 'tbody > :nth-child(1) > .col-member_id';
const number_violations_selector = '.col-md-5 > span';

// Test data
const testData = require('../fixtures/testData.json');

export class ViolationsPage {
    
    graphDevelopersPageIsPresent() {
        commonPages.urlPage(url_violations_page);
        cy.get(graph_violations_selector).contains(testData.graph_violations_page[0]).should('be.visible');
        cy.get(violations_list_selector).contains(testData.graph_violations_page[1]).should('be.visible');
    }

    checkFirstViolationsInList() {
        cy.get(technology_selector).should('be.visible', 'have.img', '/images/languages/java.svg');
        cy.get(type_selector).should('be.visible', 'have.img', '/images/types/code_smell.svg');
        cy.get(title_selector).contains('Define a constant instead of duplicating this literal "user.dir" 3 times.').should('be.visible');
        cy.get(td_index_selector).contains('8').should('be.visible');
        cy.get(issue_status_selector).contains('Open').should('be.visible');
        cy.get(owner_selector).contains(testData.metrics_QATestLab['dev_name']).should('be.visible');
        cy.get(number_violations_selector).contains(testData.metrics_QATestLab['number_violations']).should('be.visible');
    }

}

export const violationsPage = new ViolationsPage();