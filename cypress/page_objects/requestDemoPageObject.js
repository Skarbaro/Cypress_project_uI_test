/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const url_requestDemo_selector = '/demo/request';
const demo_body_selector = '.cq-card-body';
const corporate_email_selector = '#email';
const your_name_selector = '#firstName';
const company_name_selector = '#company';
const number_engineers = '#engineers';
const requestDemo_button_selector = '[style="margin-top: 4.7rem;"] > .btn';
const img_demo_selector = '.col-lg-7';
const demo_message_selector = '.cq-notification';

// validation 
const val_email_selector = ":nth-child(1) > .invalid-feedback";
const val_yname_selector = ":nth-child(2) > .invalid-feedback";
const val_cname_selector = ":nth-child(3) > .invalid-feedback";
const val_number_selector = ":nth-child(4) > .invalid-feedback";

export class RequestDemoPage {

  demoPageIsPresent() {
    cy.get(demo_body_selector).contains('Request demo').should('be.visible');
    commonPages.urlPage(url_requestDemo_selector);
  }

  checkFormDemoIsPresent() {
    cy.get(corporate_email_selector).should('have.attr', 'placeholder', 'Corporate email').should('be.visible');
    cy.get(your_name_selector).should('have.attr', 'placeholder', 'Your name').should('be.visible');
    cy.get(company_name_selector).should('have.attr', 'placeholder', 'Company name').should('be.visible');
    cy.get(number_engineers).should('have.attr', 'placeholder', 'Number of engineers in your company').should('be.visible');
    cy.get(requestDemo_button_selector).contains('Request demo').should('be.visible');
    cy.get(img_demo_selector).should('be.visible', 'have.img', '/images/request-demo.png')
  }

  requestDemo(email, your_name, company_name, number) {

    cy.get(corporate_email_selector).should('have.length', 1)
      .type(email).should('have.value', email);
    cy.get(your_name_selector).should('have.length', 1)
      .type(your_name).should('have.value', your_name);
    cy.get(company_name_selector).should('have.length', 1)
      .type(company_name).should('have.value', company_name);
    cy.get(number_engineers).should('have.length', 1)
      .type(number).should('have.value', number);
  }

  clickRequestDemoButton() {
    cy.clickElement(requestDemo_button_selector);
  }

  // Test validation fields

  checkValidationMessageIsPresent() {
    cy.contains("Request demo").click();
    cy.get(val_email_selector).contains("Enter a valid email").should('be.visible');
    cy.get(val_yname_selector).contains("Enter a valid first name").should('be.visible');
    cy.get(val_cname_selector).contains("Company name should contain 2-40 characters").should('be.visible');
    cy.get(val_number_selector).contains("Engineers number must contain only numbers").should('be.visible');
  }

  // Test message 

  checkDemoMessageIsPresent(text_message) {
    cy.get(demo_message_selector).contains(text_message).should('be.visible');
  }

}

export const requestDemoPage = new RequestDemoPage();