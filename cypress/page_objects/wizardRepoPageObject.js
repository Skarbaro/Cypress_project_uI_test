/// <reference types = "Cypress"/>

const helper = require('../support/helper');

// Selectors
const blockProjectField_selector = '.col-xl-9 > .cq-card';
const onboardingSteps_selector = '.cq-onboarding-steps-container';
const systemNotification_selector = '.cq-notification';
const fileldSshKey_selector = '#key';
const fieldUrlRepo_selector = '#url';
const fieldBranchRepo_selector = '#branch';
const addRepoButton_selector = '.cq-btn-lightgrey';
const warning_http_message = '.repo-private-hint';
const checkbox_privateRepo_selector ='#private-repo';

export class WizardRepoPage {

    blockProject() {
        cy.get(blockProjectField_selector).contains('Follow there quick steps to add the repository').should('be.visible');
    }

    onbording() {
        cy.get(onboardingSteps_selector).should('be.visible');
    }

    enterNameProject(nameProject) {
        cy.log(nameProject);
        cy.contains('Select or create project').should('have.length', 1).type(nameProject);
    }

    wizardRepoUpPageIsNotPresent() {
        cy.get(blockProjectField_selector).should('not.exist');
        cy.get(onboardingSteps_selector).should('not.exist');
    }

    messageSSHkeyWasCopiedIsVisible() {
        cy.get(systemNotification_selector).should('be.visible', 'have.css', 'background-color', 'rgb(139, 191, 73)')
        .contains('SSH key was copied to a clipboard');
    }

    enterUrlAndBranch(url, branch) {
        cy.get(fieldUrlRepo_selector).type(url).should('be.visible', 'have.value', url);
        cy.get(fieldBranchRepo_selector).focus();
        cy.get(fieldBranchRepo_selector).type(branch).should('be.visible', 'have.value', branch);
    }

    selectCheakBoxPrivateRepo() {
        cy.get(checkbox_privateRepo_selector).should('be.visible').check();
    }

    checkSshKeyIsVisible() {
        cy.get(fileldSshKey_selector).contains('ssh-rsa').should('be.visible');
    }

    messageProjectCreatedIsVisible(nameProject) {
        cy.get(systemNotification_selector).should('be.visible', 'have.css', 'background-color', 'rgb(139, 191, 73)')
        .contains(`Project "${nameProject}" created successfully`);
    }

    messageRepoAddIsVisible(url, branch) {
        cy.get(systemNotification_selector).should('be.visible', 'have.css', 'background-color', 'rgb(139, 191, 73)')
        .contains(`"${url}" / "${branch}" added successfully`);
    }

    messageRepoIsNotAdd(message_text) {
        cy.get(systemNotification_selector).should('be.visible', 'have.css', 'background-color', 'rgb(244, 80, 69)')
        .contains(message_text);
    }

    clickAddRepoButton() {
        cy.clickElement(addRepoButton_selector);
    }

    checkRepoPrivateHint(message_http) {
        cy.get(warning_http_message).contains(message_http);
    }

}

export const wizardRepoPage = new WizardRepoPage();