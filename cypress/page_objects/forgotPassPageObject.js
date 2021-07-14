/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const form_forgotPassword_selector = '#cq-app-entry-container > div > div > div > div.col-lg-6.bg-light.text-dark.d-flex.flex-column > div.cq-container-half.my-auto.mx-auto.ml-lg-0.px-3 > div > div > div > div';
const url_forgotPass_selector = 'auth/forgotPassword';
const title_forgotPass_selector = 'Reset your password';
const field_email_selector = '#email';
const systemMessage_selector = '.alert';
const resetPassButton_selector = '.btn';

export class ForgotPassPage {

    bodyForgotPasPage() {
        cy.get(form_forgotPassword_selector).should('be.visible').contains(title_forgotPass_selector);
        commonPages.urlPage(url_forgotPass_selector);
    }

    enterEmail(email) {
        cy.log(email);
        cy.get(field_email_selector).should('be.empty', 'have.length', 1).type(email).should('have.value', email);
    }

    clickResetPassButton() {
        cy.clickElement(resetPassButton_selector);
    }

    messagePassChengeIsVisible() {
        cy.get(systemMessage_selector).should('be.visible', 'have.css', 'background-color', 'rgb(139, 191, 73)')
        .contains('Done');
    }

    messageNoUserIsVisible() {
        cy.get(systemMessage_selector).should('be.visible', 'have.css', 'background-color', 'rgb(244, 80, 69)')
        .contains('There is no user with such email');
    }

}

export const forgotPassPage = new ForgotPassPage();