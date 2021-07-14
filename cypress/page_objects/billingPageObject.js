/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const url_billingPage_selector = '/wizard/billing';
const billing_body_selector = '.col-12 > .cq-card';
const card_number_selector = '#subscribe-card-number';
const card_expiry_selector = '#subscribe-card-expiry';
const card_cvc_selector = '#subscribe-card-cvc';
const subscribe_button_selector = '.text-right > .btn';
const vack_button_selector = '.pl-0 > .btn';
const total_price_selector = '[style="color: rgb(36, 47, 64); margin-top: 2.5rem;"] > div';

export class BillingPage {

    billingPageIsPresent() {
        cy.get(billing_body_selector).contains('Company membership').should('be.visible');
        commonPages.urlPage(url_billingPage_selector);
    }

    checkFormPaymentIsPresent() {
        cy.get(card_number_selector).should('be.visible');
        cy.get(card_expiry_selector).should('be.visible');
        cy.get(card_cvc_selector).should('be.visible');
        cy.get(subscribe_button_selector).contains('Subscribe').should('be.visible');
        cy.get(vack_button_selector).contains('Back').should('be.visible');
    }

    checkPrice(totalPrice) {
        cy.get(total_price_selector).contains('Total: $' + totalPrice).should('be.visible');
    }

}

export const billingPage = new BillingPage();