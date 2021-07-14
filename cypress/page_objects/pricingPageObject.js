/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";
import { landingPage } from "./landingPageObjects";

// Selectors
const progressBar_selector = '.flex-column > .mt-3';
const url_pricing_selector = '/pricing'
const linkPricingPage_selector = '.d-flex > [href="/pricing"';
const company_container_selector = '.container-fluid > .row > :nth-child(1)';
const enterprise_container_selector = '.container-fluid > .row > :nth-child(2)';
const tryForFree_button_selector = ':nth-child(1) > .h-100 > .card-body > [style="margin-top: 1.75rem;"]';
const requestDemo_button_selector = ':nth-child(2) > .h-100 > .card-body > [style="margin-top: 1.75rem;"]';

const collapseCardBody = [
    '#collapseZero > .card-body',
    '#collapseOne > .card-body',
    '#collapseTwo > .card-body',
    '#collapseThree > .card-body'
]

const headingTabFag = [
    '#headingZero > .mb-0 > .btn',
    '#headingOne > .mb-0 > .btn',
    '#headingTwo > .mb-0 > .btn',
    '#headingThree > .mb-0 > .btn'
]

const descriptonTab = [
    'Duecode for 30 days',
    'Data security is one of the most',
    'We use Stripe to process your payment.',
    'This date is listed on your billing page.'
]

export class PracingPage {

    pricigPageIsPresent() {
        cy.get(progressBar_selector).contains('Built for Enterprise. Packaged for any team').should('be.visible');
        commonPages.urlPage(url_pricing_selector);
    }

    goToPageNotSignIn(name_link) {
        landingPage.linksPageLending(name_link);
    }

    checkCompanyBlockUserNotSignIn() {
        cy.get(company_container_selector).contains('Company').should('be.visible');
        cy.get(tryForFree_button_selector).contains('Try for free').should('be.visible');
    }

    checkCompanyBlockUserSignIn() {
        cy.get(company_container_selector).contains('Company').should('be.visible');
        cy.get(tryForFree_button_selector).contains('Subscribe').should('be.visible');
    }

    checkEnterpriseBlock() {
        cy.get(enterprise_container_selector).contains('Enterprise').should('be.visible');
        cy.get(requestDemo_button_selector).contains('Request demo').should('be.visible');
    }

    checkPlanList(name) {
        cy.contains(name).should('be.visible');
    }

    clickTryForFreeButton() {
        cy.clickElement(tryForFree_button_selector);
    }

    clickSubscribeButton() {
        cy.clickElement(tryForFree_button_selector);
    }

    clickRequestDemoPageButton() {
        cy.clickElement(requestDemo_button_selector);
    }

    pricingFaqMenu() {
        cy.openTabFag(headingTabFag[0], collapseCardBody[0], descriptonTab[0]).wait(1000);
        cy.openTabFag(headingTabFag[1], collapseCardBody[1], descriptonTab[1]).wait(1000);
        cy.openTabFag(headingTabFag[2], collapseCardBody[2], descriptonTab[2]).wait(1000);
        cy.openTabFag(headingTabFag[3], collapseCardBody[3], descriptonTab[3]);
    }

}

export const pracingPage = new PracingPage();