/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const cq_privacy_selector = '#cq-privacy-page';
const url_privacy_selector = '/privacy';

export class PrivacyPage {

    privacyIsPresent() {
        cy.get(cq_privacy_selector).should('be.visible');
        commonPages.urlPage(url_privacy_selector);
    }
    

}

export const privacyPage = new PrivacyPage();