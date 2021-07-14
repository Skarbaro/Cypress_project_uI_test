/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const blockIteration = '.col-lg-8 > .cq-card';
const systemNotification_selector = '.cq-notification';
const urlIterationPage_selector = '/wizard/iteration';
const startDateField_selector = '.cq-form > :nth-child(1) > div > .form-control';
const nextIterationField_selector = '.cq-form > :nth-child(3) > div';
const createIterationButton_selector = '.mb-3 > .btn';
const repeadPeriod_selector = '.cq-form > :nth-child(2)'

export class IterationPageObject {

    elementIterationPageIsVisible() {
        cy.get(blockIteration).contains('Create iteration').should('be.visible');
        cy.get(startDateField_selector).should('be.visible');
        cy.get(nextIterationField_selector).should('be.visible');
        cy.get(repeadPeriod_selector).should('be.visible');
        cy.get(createIterationButton_selector).contains('Create').should('be.visible');
    }

    messageIterationCreatedIsVisible() {
        cy.get(systemNotification_selector).should('be.visible', 'have.css', 'background-color', 'rgb(139, 191, 73)')
        .contains("Iteration has been successfully created");
    }

    checkUrlIterationPage() {
        commonPages.urlPage(urlIterationPage_selector);
    }

}

export const iterationPageObject = new IterationPageObject();