/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const background_selector = '.cq_top_background > .container-xl';
const url_CodeQuality_selector = '/code-quality';

export class CodeQualityPage {

    backgroundIsPresent() {
        cy.get(background_selector).should('be.visible');
        commonPages.urlPage(url_CodeQuality_selector);
    }

}

export const codeQualityPage = new CodeQualityPage();