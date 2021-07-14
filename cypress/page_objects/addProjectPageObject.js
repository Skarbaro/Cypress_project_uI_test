/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const fieldProjectName_selector = '#name';
const fieldDescription_selector = '#description';
const urlAddProjectPage_selector = '/wizard/project';
const addProjectButton_selector = '.cq-btn-lightgrey';

const addRepoButton_selector = ':nth-child(2) > .btn';

export class AddProjectPageObject {

    enterProjectName(nameProject) {
        cy.get(fieldProjectName_selector).should('have.length', 1).type(nameProject).should('have.value', nameProject);
    }

    enterProjectDescription(nameProject) {
        cy.get(fieldDescription_selector).should('have.length', 1).type(nameProject).should('have.value', nameProject);
    }

    clickAddProjectButton() {
        cy.get(addProjectButton_selector).contains('Add').should('be.visible').click();
    }

    urlProjectPage() {
        commonPages.urlPage(urlAddProjectPage_selector);
    }

    createProject (nameProject) {
        addProjectPageObject.enterProjectName(nameProject);
        addProjectPageObject.enterProjectDescription(nameProject);
        addProjectPageObject.clickAddProjectButton();
    }

    clickAddRepoButton() {
        cy.clickElement(addRepoButton_selector);
    }

}

export const addProjectPageObject = new AddProjectPageObject();