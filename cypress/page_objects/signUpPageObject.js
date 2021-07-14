/// <reference types = "Cypress"/>

import testData from '../fixtures/testData.json';

const helper = require('../support/helper');

// Selectors
const signUpTitle_selector = '.cq-form-title';
const firstName_selector = '#first-name';
const email_selector = '#email';
const password_selector = ':nth-child(3) > .form-control';
const confirmPassword = ':nth-child(4) > .form-control';
const buttonSingUp_selector = '.btn';
const invalidFeednack1_selector = ':nth-child(1) > .invalid-feedback';
const invalidFeednack2_selector = ':nth-child(2) > .invalid-feedback';
const invalidFeednack3_selector = ':nth-child(3) > .invalid-feedback';
const invalidFeednack4_selector = ':nth-child(4) > .invalid-feedback';


export class SignUpPage {

  signUpTitle() {
    cy.get(signUpTitle_selector).contains('Try for free').should('be.visible');
  }

  fillInFirstName(firstName) {
    cy.get(firstName_selector).should('have.length', 1)
      .type(firstName).should('have.value', firstName);
  }

  fillInLastName(lastName) {
    cy.get(lastName_selector).should('have.length', 1)
      .type(lastName).should('have.value', lastName);
  }

  fillInEmail() {
    const email = `${helper.randomString("alpha", 10)}@automationtest.com`;
    cy.log(email);
    cy.get(email_selector).should('have.length', 1)
      .type(email).should('have.value', email);
  }

  fillInPassword(password) {
    cy.get(password_selector).should('have.length', 1)
      .type(password).should('have.value', password);

    cy.get(confirmPassword).should('have.length', 1)
      .type(password).should('have.value', password);
  }

  clickSingUpButton() {
    cy.clickElement(buttonSingUp_selector);
  }

  allInvalidFeedbackIsPresent() {
    cy.get(invalidFeednack1_selector).should('be.visible');
    cy.get(invalidFeednack2_selector).should('be.visible');
    cy.get(invalidFeednack3_selector).should('be.visible');
    cy.get(invalidFeednack4_selector).should('be.visible');
  }

  registrationNewUser() {
    signUpPage.fillInFirstName(testData['FirstName']);
    signUpPage.fillInEmail();
    signUpPage.fillInPassword(testData['password']);
    signUpPage.clickSingUpButton();
  }

}

export const signUpPage = new SignUpPage();