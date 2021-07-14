/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const cq_terms_h1 = 'Terms of Service';
const url_terms = '/terms';
const body_termsPage_selector = '#cq-landing';

export class TermsPage {

    termsIsPresent() {
        cy.contains('h1', cq_terms_h1).should('be.visible');
        commonPages.urlPage(url_terms);
    }

    h2TermsIsPresent() {
        cy.get(body_termsPage_selector).find('h2').its('length').should('be.gte', 26);
    }

}

export const termsPage = new TermsPage();