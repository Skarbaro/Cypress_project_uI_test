/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";
import { iterationPageObject } from "./iterationPageObject";
import { projectPage } from "./projectPageObject";
import { signInPage } from "./signInPageObject";

// Selectors

const search_field_selector = '.cq-search-input';
const supportFaq_field_selector = '.col-xl-3 > .cq-card';
const main_field_settings_selector = '.col-xl-9 > .cq-card';
const notification_message_selector = ".cq-notification";
const imgSSH_faq_selector = ".iframe-onboarding-passed";
const addRepo_button_selector = ".text-md-right > .btn";

// SSH key tab
const sshKey_field_selector = '#ssh-key';
const copyButton_ssh_selector = 'form > .btn';

// Invite tab
const inviteButton_selector = '.text-md-right > .btn';
const userList_selector = '.cq-fake-tbody > .cq-fake-tr';
const name_invite_user_selector = '#first-name';
const invite_email_selector = '#email';
const create_invite_user_button = '.text-right > .btn';

// rules tab
const filtersButton_selector = '.flex-wrap-reverse > .d-block > .btn';
const occurenceFirstRule_selector = '.expanded > .col-occurence';
const rule_wrapper_selector = '.cq-rule-explanation-wrapper';

// Iteration tab
const progress_iteration_selector = '.progress-label';
const week_iteration_selector = '.mt-2 > :nth-child(1)';
const options_iteration_selector = '#iteration-options > .btn';
const dropdown_edit_iterations_selextor = '.dropdown-menu > :nth-child(1) > span';
const dropdown_delete_iterations_selector = '.dropdown-menu > :nth-child(2) > span';
const remove_button = '.btn-danger';
const add_iteration_button = '.text-center > :nth-child(2) > .btn';
const create_update_iteration_button = '.btn-primary';
const back_iteration_buttton = '.btn-outline-primary';

// Report tab
const checkbox_dayReport_selector = ':nth-child(1) > .col-day > .form-group > .form-check-input';
const checkbox_weekReport_selector = ':nth-child(1) > .col-week > .form-group > .form-check-input';
const commiter_report_selector = '.cq-fake-tbody > .cq-fake-tr > .col-committer';
const email_commiter_selector = '.cq-fake-tbody > .cq-fake-tr > .col-email';
const repo_list_selector = '.col-xl-9 > .cq-card > .cq-card-body > :nth-child(1)';

// Test Data
const testData = require('../fixtures/testData.json');
const name_rule = testData.ruleDescription['name_java:S112'];
const name_repo = testData.searchData['repoName_1'];
const name_dev = testData.metrics_QATestLab['dev_name'];

export class SettingsPage {




    // Settings page

    goToSettingsPage() {
        cy.log('Sign in user')
        signInPage.authorization(testData.Account1[0], testData.Account1[1]);
        cy.wait('@CQUser').should('have.property', 'status', 200).then(console.log)
        cy.wait('@Project').should('have.property', 'status', 200).then(console.log);
        cy.log('Select project');
        projectPage.selectProject(testData.Account1[3]);
        cy.log('Go to Setting page');
        commonPages.clickDashboardSettingsMenu();
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);
        settingsPage.settingsPageIsPresent();
        settingsPage.checkUrlFaqIsPresent();
    }

    settingsPageIsPresent() {
        cy.get(main_field_settings_selector).should('be.visible');
        cy.get(supportFaq_field_selector).contains('Support FAQ').should('be.visible');
    }

    // Support FAQ

    checkUrlFaqIsPresent() {
        cy.get(imgSSH_faq_selector).should('be.visible');
        cy.contains(testData.supportFaqNameLink['gitHub']).should('be.visible').should('have.attr', 'href', testData.SupportFAQurl['GitHub']);
        cy.contains(testData.supportFaqNameLink['gitLab']).should('be.visible').should('have.attr', 'href', testData.SupportFAQurl['GitLAb']);
        cy.contains(testData.supportFaqNameLink['bitbuc']).should('be.visible').should('have.attr', 'href', testData.SupportFAQurl['Bitbucket']);
        cy.contains(testData.supportFaqNameLink['own_serv']).should('be.visible').should('have.attr', 'href', testData.SupportFAQurl['Own_Server']);
        cy.contains(testData.supportFaqNameLink['community']).should('be.visible').should('have.attr', 'href', testData.SupportFAQurl['community']);
        cy.contains(testData.supportFaqNameLink['email']).should('be.visible').should('have.attr', 'href', testData.SupportFAQurl['email']);
    }

    // Repository Tab

    repoTabIsPresent() {
        cy.contains(testData.settingsTabsName.nameTab[0]).should('be.visible').click();
        commonPages.urlPage(`/project/settings${testData.settingsTabsName.url[0]}`);
    }

    repoTabIsNotPresent() {
        cy.contains(testData.settingsTabsName.nameTab[0]).should('not.exist');
        cy.url().should('not.contain', `/project/settings${testData.settingsTabsName.url[0]}`);
    }

    searchRepo() {
        cy.get(search_field_selector).should('have.length', 1)
          .type(name_repo).should('have.value', name_repo);
    }

    checkSearchRepo() {
        cy.get(repo_list_selector).contains(testData.searchData['repoName_1']).should('be.visible');
        cy.get(repo_list_selector).contains(testData.searchData['repoName_2']).should('not.exist');
    }

    clickAddRepoButton() {
        cy.contains('Add repository').clickElement(addRepo_button_selector);
    }
    
    // SSH Tab

    sshKeyTabIsPresent() {
        cy.contains(testData.settingsTabsName.nameTab[1]).should('be.visible').click();
        commonPages.urlPage(`/project/settings${testData.settingsTabsName.url[1]}`);
    }

    checkSshTabElmentIsPresent() {
        cy.get(sshKey_field_selector).contains('ssh-rsa').should('be.visible');
        cy.get(copyButton_ssh_selector).contains('Copy').should('be.visible');
    }

    checkCopySSHkey() {
        cy.get(copyButton_ssh_selector).click().should('be.visible');
    }

    // User Tab

    usersTabIsPresent() {
        cy.contains(testData.settingsTabsName.nameTab[2]).should('be.visible').click();
        commonPages.urlPage(`/project/settings${testData.settingsTabsName.url[2]}`);
    }

    checkInviteTabElementIsPresent() {
        cy.get(inviteButton_selector).contains('+ Invite user').should('be.visible');
        cy.get(search_field_selector).should('be.visible');
        cy.get(userList_selector).contains(testData.Account1[0]).should('be.visible');
    }

    openInviteUserForm() {
        cy.get(inviteButton_selector).should('be.visible').click();
    }

    enterDataInviteUserForm(name, email, project, permission) {
        cy.get(name_invite_user_selector).should('have.attr', 'placeholder', 'Your name').should('be.visible')
          .type(name).should('have.value', name);
        cy.get(invite_email_selector).should('have.attr', 'placeholder', 'Email').should('be.visible')
          .type(email).should('have.value', email);
        cy.contains('Select projects...').should('be.visible').click();
        // cy.get('#react-select-7-option-0').focus();
        cy.contains(project).should('be.visible').click({ force: true });
        cy.contains('Select permissions...').should('be.visible').click();
        cy.contains(permission).should('be.visible').click();
    }
    
    clickInviteUserButton() {
        cy.get(create_invite_user_button).should('be.visible').click();
    }

    checkUserWasInvited() {
        cy.get(notification_message_selector).contains(testData.notification['inv_user']).should('be.visible');
    }

    searchInvUser() {
        cy.get(search_field_selector).should('have.length', 1)
          .type(name_dev).should('have.value', name_dev);
    }

    selectDeleteInvUser() {
        cy.get('.cq-fake-tbody > :nth-child(1) > .col-actions').should('be.visible').click();
        cy.contains('Delete').should('be.visible').click();
        cy.get(remove_button).should('be.visible').click();
    }

    checkInvUserDeleted() {
        cy.get(notification_message_selector).contains(testData.notification['del_inv_user']);
    }

    // Rules Tab

    searchRule() {
        cy.get(search_field_selector).should('have.length', 1)
          .type(name_rule).should('have.value', name_rule);
    }

    rulesTabIsPresent() {
        cy.contains(testData.settingsTabsName.nameTab[3]).should('be.visible').click();
        commonPages.urlPage(`/project/settings${testData.settingsTabsName.url[3]}`);
    }

    checkRulesTabElementsIsPresent() {
        cy.get(filtersButton_selector).contains('Filters').should('be.visible');
        cy.get(search_field_selector).should('be.visible').should('have.attr', 'placeholder', 'Search rule');
        cy.contains(testData.ruleDescription['name_java:S112']).should('be.visible').click();
        cy.get(rule_wrapper_selector).contains(testData.ruleDescription['java:S112']).should('be.visible');
        cy.get(occurenceFirstRule_selector).should('be.visible');
    }

    // Iteration Tab

    iterationsTabIsPresent() {
        cy.contains(testData.settingsTabsName.nameTab[4]).should('be.visible').click();
        commonPages.urlPage(`/project/settings${testData.settingsTabsName.url[4]}`);
    }

    checkIterationTabElementsIsPresent() {
        cy.get(progress_iteration_selector).contains('Progress').should('be.visible');
        cy.get(week_iteration_selector).contains('Every 1 week').should('be.visible');
        cy.get(options_iteration_selector).should('be.visible');
    }

    selectEditIteration() {
        cy.get(options_iteration_selector).should('be.visible').click();
        cy.get(dropdown_edit_iterations_selextor).contains('Edit').should('be.visible').click();
    }

    returnToIterationsTab() {
        cy.get(back_iteration_buttton).should('be.visible').click();
    }

    deleteIteration() {
        cy.get(options_iteration_selector).should('be.visible').click();
        cy.get(dropdown_delete_iterations_selector).contains('Delete').should('be.visible').click();
        cy.get(remove_button).should('be.visible').click();
        cy.get(notification_message_selector).contains(testData.notification['delete_iteration']).should('be.visible');
    }

    addIteration() {
        cy.get(add_iteration_button).should('be.visible').click();
        iterationPageObject.elementIterationPageIsVisible();
        cy.get(create_update_iteration_button).should('be.visible').click();
        cy.get(notification_message_selector).contains(testData.notification['delete_iteration']).should('be.visible');
    }

    // Reports Tab

    reportsTabIsPresent() {
        cy.contains(testData.settingsTabsName.nameTab[5]).should('be.visible').click();
        commonPages.urlPage(`/project/settings${testData.settingsTabsName.url[5]}`);
    }

    searchDevReports() {
        cy.get(search_field_selector).should('have.length', 1)
        .type(name_dev).should('have.value', name_dev);
    }

    checkReportsTabElementsIsPresent() {
        cy.get(search_field_selector).should('have.attr', 'placeholder', 'Search name or email');
        cy.get(commiter_report_selector).contains(testData.metrics_QATestLab['dev_name']).should('be.visible');
        cy.get(email_commiter_selector).should('be.visible');
        cy.get(checkbox_dayReport_selector).should('be.visible');
        cy.get(checkbox_weekReport_selector).should('be.visible');
    }

    selectCheckboxDay() {
        cy.get(checkbox_dayReport_selector).should('be.visible').check({ force: true }).should('be.checked');
        cy.get(notification_message_selector).contains(testData.notification['report_notif']).should('be.visible');
    }

    uncheckCheckboxDay() {
        cy.get(checkbox_dayReport_selector).should('be.visible').uncheck({ force: false }).should('not.be.checked');;
        cy.get(notification_message_selector).contains(testData.notification['report_notif']).should('be.visible');
    }

    selectCheckboxWeek() {
        cy.get(checkbox_weekReport_selector).should('be.visible').check({ force: true }).should('be.checked');
        cy.get(notification_message_selector).contains(testData.notification['report_notif']).should('be.visible');
    }

    uncheckCheckboxWeek() {
        cy.get(checkbox_weekReport_selector).should('be.visible').uncheck({ force: false }).should('not.be.checked');;
        cy.get(notification_message_selector).contains(testData.notification['report_notif']).should('be.visible');
    }


}

export const settingsPage = new SettingsPage();