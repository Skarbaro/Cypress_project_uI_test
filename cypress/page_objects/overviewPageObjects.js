/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const url_overview_page = '/project/overview';
const graph_overview_selector = '.cq-card';

// Test data
const testData = require('../fixtures/testData.json');

export class OverviewPage {

    graphDevelopersPageIsPresent() {
        commonPages.urlPage(url_overview_page);
        cy.get(graph_overview_selector).contains(testData.graph_overview_page[0]).should('be.visible');
    }

}

export const overviewPage = new OverviewPage();