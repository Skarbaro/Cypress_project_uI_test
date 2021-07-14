/// <reference types = "Cypress"/>

import { commonPages } from "./commonPageObjects";
import { wizardRepoPage } from "./wizardRepoPageObject";

// Selectors
const blockRepoList = '.col-xl-9 > .cq-card';
const urlRepoPage_selector = 'project/settings/repos';
const removeButton_selector = '.btn-danger';
const optionRepo_xpath = 'img[src$="/images/menu-options-dark.svg"]';
const systemNotification_selector = '.cq-notification';
const progressLabel_selector = '.progress-label';
const addRepo_button = '.text-center > :nth-child(2) > .btn';

export class ReposPageObject {

    blockRepoListIsVisible() {
        cy.get(blockRepoList).should('be.visible');
    }

    checkStatusRepo() {
        cy.get(".col-status > img").should('be.visible', 'have.img', '/images/status-success.svg');
    }

    checkUrlRepoPage() {
        commonPages.urlPage(urlRepoPage_selector);
    }

    clickOptionRepo() {
        cy.clickElement(optionRepo_xpath);
    }

    selectDeleteRepo() {
        cy.contains('Delete').should('be.visible').click();
    }

    clickRemoveButton() {
        cy.clickElement(removeButton_selector);
    }

    messageRepoDeletingIsVisible(url, branch) {
        cy.get(systemNotification_selector).should('be.visible', 'have.css', 'background-color', 'rgb(139, 191, 73)')
        .contains(`"${url}" / "${branch}" placed in a queue for deletion`);
    }

    checkRemoveStatusRepo() {
        cy.get('@scanner_backend')
        .should((xhr) => {
            expect(xhr.url).to.match(/\/scanner_backend$/)
            expect(xhr.method).to.equal('POST')
            expect(xhr.response.body.result['0'], 'response body').to.include(
                {
                    status: 10
                }
            )
        })
    }

    checkScanedStatusRepo() {
        cy.get(progressLabel_selector).contains('100%').should('be.visible');
    }

    addRepo(url, branch) {
        cy.clickElement(addRepo_button);
        wizardRepoPage.enterUrlAndBranch(url, branch);
        wizardRepoPage.clickAddRepoButton();
    }

}

export const reposPageObject = new ReposPageObject();