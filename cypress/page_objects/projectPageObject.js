/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const headerLogo_selector = '.navbar-brand > .d-inline-block';
const gravatar_selector = '.react-gravatar';
const urlProjectPage_selector = '/projects';
const addNewProject_selector = 'a > .cq-card';

export class ProjectPage {

    headerLogoIsPresent() {
        cy.get(headerLogo_selector).should('be.visible');
    }

    gravatarIsPresent() {
        cy.get(gravatar_selector).should("be.visible");
    }

    gravatarIsNotPresent() {
        cy.get(gravatar_selector).should("not.exist");
    }

    urlProjectPage() {
        commonPages.urlPage(urlProjectPage_selector);
    }

    clickAddNewProjectCard() {
        cy.get(addNewProject_selector).contains('Add New Project').should('be.visible').click();
    }

    selectProject(nameProject) {
        cy.get('.cq-container > :nth-child(1)').contains(nameProject).should('be.visible').click();
    }

}

export const projectPage = new ProjectPage();