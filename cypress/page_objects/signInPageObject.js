/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const signInTitle_selector = '.cq-form-title';
const urlSignIn_selector = '/auth/signin';
const emailField_selector = ':nth-child(1) > .form-control';
const passwordField_selector = ':nth-child(2) > .form-control';
const buttonSignIn_selector = '.btn';
const link_forgotPass_selector = '.cq-form-postfix > :nth-child(2) > a';

export class SignInPage {

    signInTitle() {
        cy.get(signInTitle_selector).contains('Sign In').should('be.visible');
        commonPages.urlPage(urlSignIn_selector);
    }

    authorization(email, password) {

        cy.log(email/ password);

        cy.get(emailField_selector).should('have.length', 1)
          .type(email).should('have.value', email);

        cy.get(passwordField_selector).should('have.length', 1)
          .type(password).should('have.value', password);

        cy.get(buttonSignIn_selector).click();
    }

    warningInvalidLogin() {
      cy.get('.alert').contains('Provided email or/and password are incorrect.').should('be.visible');
    }

    forgotPass() {
      cy.clickElement(link_forgotPass_selector);
    }
    
}

export const signInPage = new SignInPage();