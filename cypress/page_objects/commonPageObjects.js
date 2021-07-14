/// <reference types = "Cypress"/>

// Selectors
const headerLogo_selector = '.dc-header-logo';
const onboardingCreateProjectButton = '.cq-onboarding-button > .btn';
const dashboardMenu_selector = '.mr-1 > .btn';
const dashboardSetting_selector = '[title="Settings"] > .nav-link > span';
const dashboardCommits_selector = '[title="Commits"] > .nav-link';
const dashboardDev_selector = '[title="Developers"] > .nav-link';
const dashboardViolations_selector = '[title="Violations"] > .nav-link';
const dashboardOverview_selector = '[title="Overview"] > .nav-link';
const dateFilterButton_selector = '.d-block > .mr-3';
const closeFilterDate_selector = ':nth-child(11) > .bm-menu-wrap > .bm-menu > .bm-item-list > .align-items-center > .btn > span';
const overallDate_button_selector = ':nth-child(11) > .bm-menu-wrap > .bm-menu > .bm-item-list > :nth-child(2) > .cq-collapsible__contentInner > .cq-collapsible__body > .cq-collapsible__body_content > .d-flex > :nth-child(12) > .cq-filter-toggle-btn > .cq-ellipsis';
const link_pricingPage_selector = '.navbar-nav > .nav-item > .nav-link';
const gravatarUser_selector = '.cq-current-project-toggle';
const dropdownMenu_accountSettings_selector = '[style="max-height: 250px; overflow-y: auto;"] > :nth-child(1) > :nth-child(2)';
const loader_selector = '.css-mkjcas';

export class CommonPages {
    clearCookies() {
        cy.clearCookies();
    }

    clearLocalStorage() {
        cy.clearLocalStorage();
    }

    visitPage() {
        cy.visit('/', {
            failOnStatusCode: false
        })
        cy.get('body').then(($body) => {
            // div[class="modal fade show"]
            if ($body.find('.popmechanic-close').length > 0) {
                cy.log('Modal window was appeared and was closed');
                cy.get('.exit-content-controls > button[type="button"]').eq(0).click();
            } else {
                cy.log('Modal window has not been appeared');
            }
        });
    }

    headerLogoIsPresent() {
        cy.get(headerLogo_selector).should('be.visible').click();
    }

    urlPage(url) {
        cy.url().should('include', url);
    }

    clickOnboardStepButton(nameOnboardButton) {
        cy.contains(nameOnboardButton).clickElement(onboardingCreateProjectButton);
    }

    onboardingCompleteIsVisible() {
        cy.get(".cq-onboarding-info-header").contains("Onboarding completed!").should("be.visible");
    }

    waitLoaderNotBeVisible() {
        cy.get(loader_selector).should('not.be.visible')
    }

    // Dashboard menu

    clickDashboardSettingsMenu() {
        cy.clickElement(dashboardMenu_selector);
        cy.wait(3000);
        cy.clickElement(dashboardSetting_selector);
    }

    selectDashboardDevelopersPage() {
        cy.clickElement(dashboardMenu_selector);
        cy.clickElement(dashboardDev_selector);
    }

    selectDashboardCommitsPage() {
        cy.clickElement(dashboardMenu_selector);
        cy.clickElement(dashboardCommits_selector);
    }

    selectDashboardViolationsPage() {
        cy.clickElement(dashboardMenu_selector);
        cy.clickElement(dashboardViolations_selector);
    }

    selectDashboardOverviewPage() {
        cy.clickElement(dashboardMenu_selector);
        cy.clickElement(dashboardOverview_selector);
    }

    // Date Filter

    selectOverAllDate() {
        cy.get(dateFilterButton_selector).should('be.visible').click();
        cy.wait(3000);
        cy.get(overallDate_button_selector).contains('Overall').should('be.visible').click();
        cy.get(closeFilterDate_selector).contains('Close').should('be.visible').click();
    }

    // Pricing page

    goToPricingPageSignIn() {
        cy.get(link_pricingPage_selector).contains('Pricing').should('be.visible');
        cy.clickElement(link_pricingPage_selector);
    }

    // Account settings page

    goToAccountSettingsPage() {
        cy.get(gravatarUser_selector).should('be.visible').click();
        cy.get(dropdownMenu_accountSettings_selector).contains('Account Settings').should('be.visible').click();
    }

}

export const commonPages = new CommonPages();