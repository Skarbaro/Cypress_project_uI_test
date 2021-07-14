/// <reference types = "Cypress" />

import { commonPages } from '../page_objects/commonPageObjects';
import { landingPage } from '../page_objects/landingPageObjects';
import { signUpPage } from '../page_objects/signUpPageObject';
import { wizardRepoPage } from '../page_objects/wizardRepoPageObject';
import { iterationPageObject } from '../page_objects/iterationPageObject';
import { reposPageObject } from '../page_objects/reposPageObject';
import { pracingPage } from '../page_objects/pricingPageObject';
import { billingPage } from '../page_objects/billingPageObject';

const helper = require('../support/helper');
const nameProject = `${helper.randomString("alpha", 5)}-automationtest`;
const testData = require('../fixtures/testData.json');
const totalPrice = `${helper.totalPay(12, 1)}`;

context('Onboarding flow', () => {

    beforeEach(function () {
        cy.server();
        cy.route('POST', '/rpc/cquser').as('CQUser');
        cy.route('POST', '/rpc/project').as('Project');
        cy.route('POST', '/rpc/add_repo').as('addRepo');
        cy.route('POST', '/rpc/scanner_backend').as('scanner_backend');
        commonPages.visitPage();
        landingPage.buttonSignUp();
    })

    it('test "SignUp, Onboarding flow"', () => {
        cy.log('Registration new user');
        signUpPage.registrationNewUser();
        cy.wait('@CQUser').should('have.property', 'status', 200).then(console.log);

        cy.log('Step 1 onbording "create project"');
        wizardRepoPage.enterNameProject(nameProject);
        commonPages.clickOnboardStepButton(testData['step_1']);
        cy.wait('@Project').should('have.property', 'status', 200).then(console.log);
        wizardRepoPage.messageProjectCreatedIsVisible(nameProject);;
        
        cy.log('Step 2 onbording "add Repository"');
        wizardRepoPage.selectCheakBoxPrivateRepo();
        cy.wait(1500);
        wizardRepoPage.enterUrlAndBranch(testData['urlRepo'], testData['branchRepo']);
        //commonPages.clickOnboardStepButton(testData['step_3']);

        cy.log('Step 3 onbording "Open SSH key and oopy"');
        wizardRepoPage.checkSshKeyIsVisible();
        commonPages.clickOnboardStepButton(testData['step_2']);
        cy.wait('@addRepo').should('have.property', 'status', 200).then(console.log);
        wizardRepoPage.messageSSHkeyWasCopiedIsVisible();
        
        cy.log('Add repo after copy ssh key');
        wizardRepoPage.clickAddRepoButton();
        cy.wait('@addRepo').should('have.property', 'status', 200).then(console.log);
        wizardRepoPage.messageRepoAddIsVisible(testData['urlRepo'], testData['branchRepo']);
        
        cy.log('Step 4 onbording "add Period"');
        cy.wait(10000);
        iterationPageObject.checkUrlIterationPage();
        iterationPageObject.elementIterationPageIsVisible();
        commonPages.clickOnboardStepButton(testData['step_4']);
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);
        cy.wait('@scanner_backend').should('have.property', 'status', 200).then(console.log);
        iterationPageObject.messageIterationCreatedIsVisible();
        
        cy.log('Step 5 onbording "Comleted onboarding"');
        reposPageObject.checkUrlRepoPage();
        reposPageObject.blockRepoListIsVisible();
        commonPages.onboardingCompleteIsVisible();
        reposPageObject.checkStatusRepo();

        cy.log('Pricing page, user is sign in. check the transition to the form of payment');
        commonPages.goToPricingPageSignIn();
        cy.log('/// Pricing page is present');
        pracingPage.pricigPageIsPresent();
        cy.log('/// Click on the "Subscribe" button');
        pracingPage.clickSubscribeButton();
        cy.log('/// The form of payment');
        billingPage.billingPageIsPresent();
        billingPage.checkFormPaymentIsPresent();
        billingPage.checkPrice(totalPrice);
    })

    it('negative test "Sign Up, blank fields"', () => {
        signUpPage.clickSingUpButton();
        signUpPage.allInvalidFeedbackIsPresent();
        wizardRepoPage.wizardRepoUpPageIsNotPresent();
    })

    afterEach(() => {
        commonPages.clearCookies();
        commonPages.clearLocalStorage();
    })

})