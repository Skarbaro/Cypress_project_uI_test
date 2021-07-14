/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const cq_cookies_selector = 'Cookie Policy';
const url_cookies_selector = '/cookies';

export class CookiesPage {

    bodyCookiesPage() {
        cy.contains(cq_cookies_selector).should('be.visible');
        commonPages.urlPage(url_cookies_selector);
    }

}

export const cookiesPage = new CookiesPage();