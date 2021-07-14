/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";

// Selectors
const field_userName_selector = '#first-name';
const field_oldPassword_selector = ':nth-child(2) > .form-control';
const field_newPassword_selector = ':nth-child(3) > .form-control';
const field_confirmPassword_selector = ':nth-child(4) > .form-control';
const update_button_selectr = '.mt-4 > .btn';
const account_inform_selector = '.w-100 > .d-flex';
const notification_message_selector = ".cq-notification";
const userName_validation_selector = ':nth-child(1) > .invalid-feedback';
const password_validation_selector = ':nth-child(4) > .invalid-feedback';
const updatePlan_button_selector = '.dc_subscription_upgrade_plan';
const unsubscribe_button_selector = '.dc_subscription_delete_acc';
const modal_confirm_unsub_selector = '.modal-body';
const back_modal_button = '.d-flex > .mr-3';
const confirm_unsub_button_selector = '.btn-danger';

// Test Data
const testData = require('../fixtures/testData.json');

export class AccountSettingsPageObject {

    // General Tab

    generalTabIsPresent() {
        cy.contains(testData.accountSettingsPage.nameTab[0]).should('be.visible').click();
        commonPages.urlPage(testData.accountSettingsPage.urlTab[0]);
    }

    changeUserName(old_user_name, new_user_name) {
        cy.get(field_userName_selector).should('have.value', old_user_name).should('be.visible').clear()
          .type(new_user_name).should('have.value', new_user_name);
    }

    enterOldPassword(old_pass) {
        cy.get(field_oldPassword_selector).should('have.attr', 'placeholder', 'Old password').should('be.visible')
          .type(old_pass).should('have.value', old_pass);
    }

    enterNewPassword(new_pass) {
        cy.get(field_newPassword_selector).should('have.attr', 'placeholder', 'New password').should('be.visible')
        .type(new_pass).should('have.value', new_pass);
        cy.get(field_confirmPassword_selector).should('have.attr', 'placeholder', 'Confirm new password').should('be.visible')
        .type(new_pass).should('have.value', new_pass);
    }

    clickUpdateButton() {
        cy.clickElement(update_button_selectr);
    }

    checkUpdateMessage(message) {
        cy.get(notification_message_selector).contains(message).should('be.visible');
    }

    checkUpdateUserName(user_name) {
        cy.get(account_inform_selector).contains(user_name).should('be.visible');
    }

    clickOnUserInfo() {
        cy.clickElement(account_inform_selector);
    }

    checkValidationName() {
        cy.get(userName_validation_selector).contains('Enter a valid first name').should('be.visible');
    }

    checkValidationPass() {
        cy.get(password_validation_selector).contains('These passwords don`t match').should('be.visible');
    }

    enterDifferentPassword(new_pass, inv_pass) {
        cy.get(field_newPassword_selector).should('have.attr', 'placeholder', 'New password').should('be.visible')
        .type(new_pass).should('have.value', new_pass);
        cy.get(field_confirmPassword_selector).should('have.attr', 'placeholder', 'Confirm new password').should('be.visible')
        .type(inv_pass).should('have.value', inv_pass);
    }

    // Subscription Tab

    subTabIsPresent() {
        cy.contains(testData.accountSettingsPage.nameTab[1]).should('be.visible').click();
        commonPages.urlPage(testData.accountSettingsPage.urlTab[1]);
    }

    clickUpgradePlanButton() {
        cy.clickElement(updatePlan_button_selector);
    }

    clickUnsubButton() {
        cy.clickElement(unsubscribe_button_selector);
    }

    checkModalUnsubIsPresent() {
        cy.get(modal_confirm_unsub_selector).contains('Are you sure that').should('be.visible');
        cy.get(back_modal_button).contains('Back').should('be.visible');
        cy.get(confirm_unsub_button_selector).contains('Unsubscribe').should('be.visible');
    }

    closedModalUnsub() {
        cy.clickElement(back_modal_button);
        cy.wait(1500);
        cy.get(modal_confirm_unsub_selector).should('not.exist');
    }

}

export const accountSettingsPageObject = new AccountSettingsPageObject();