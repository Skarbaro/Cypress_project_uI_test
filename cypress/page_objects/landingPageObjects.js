/// <reference types = "Cypress"/>

// Selectors
const buttonSignIn_selector = '.sign-buttons > [href="/auth/signin"] > .btn';
const buttonSignUp_selector = '.sign-buttons > [href="/auth/signup"] > .btn';
const buttonGetStarted1_selector = ':nth-child(8) > .container-xl > .cq_free_propose_btn > a';
const buttonGetStarted2_selector = ':nth-child(17) > .container-xl > .cq_free_propose_btn > a';
const mainIntroSelf_selector = '.intro';
const freePropose_btn_1_selector = '.cq__free_propose_btn_1 > .btn';
const freePropose_btn_2_selector = '.cq__free_propose_btn_2 > a > .btn';

// Faq block
const collapseCardBody = [
    '#collapseZero > .card-body',
    '#collapseOne > .card-body',
    '#collapseTwo > .card-body',
    '#collapseThree > .card-body',
    '#collapseFour > .card-body',
    '#collapseFive > .card-body',
    '#collapseSix > .card-body'
]
const headingTabFag = [
    '#headingZero > .mb-0 > .btn',
    '#headingOne > .mb-0 > .btn',
    '#headingTwo > .mb-0 > .btn',
    '#headingThree > .mb-0 > .btn',
    '#headingFour > .mb-0 > .btn',
    '#headingFive > .mb-0 > .btn',
    '#headingSix > .mb-0 > .btn'
]
const descriptonTab = [
    'We are using our tool for three years',
    'Software developer, Team Leader, QA Engineer.',
    'how to get the most ROI for the money paid',
    'please request the code review by contacting us',
    'We’re taking privacy seriously',
    'Please check the pricing and contact us if you have any questions.',
    'Code Quality Rating ™'
]

// Roles Tabs
const tabRoles = [
    '#dc-business-owner-tab > h3',
    '#dc-delivery-manager-tab > h3',
    '#dc-technical-leader-tab > h3'
]
const nameRoles = [
    'Business Owner',
    'Delivery Manager',
    'Technical Leader'
]
const mainBlockTabs = [
    '#dc-business-owner > .container > .row',
    '#dc-delivery-manager > .container > .row',
    '#dc-technical-leader > .container > .row'
]
// Block "Unlock the hidden potential in your workforce"
const tab_powerful_insights_selector = '#dc-powerful-insights-tab > h3';
const tab_aio_dashboard_selector = '#dc-aio-dashboard-tab > h3';
const tab_cq_rank_selector = '#dc-cq-rank-tab > h3';
const tab_td_under_control_selector = '#dc-td-under-control-tab > h3';
const tab_commit_analysis_selector = '#dc-commit-analysis-tab > h3';
const tabName = [
    'Get Powerful Insights',
    'All-In-One Dashboard',
    'Code Quality Rank',
    'TD Under Control',
    'In-Depth Commit Analysis'
]
const body_powerful_insights_selector = '#dc-powerful-insights > .container > .row > .dc-check-my-project-container > .dc-check-my-project-container-title-dt';
const body_aio_dashboard_selector = '#dc-aio-dashboard > .container > .row > .dc-check-my-project-container > .dc-check-my-project-container-title-dt';
const body_cq_rank_selector = '#dc-cq-rank > .container > .row > .dc-check-my-project-container > .dc-check-my-project-container-title-dt';
const body_td_under_control_selector = '#dc-td-under-control > .container > .row > .dc-check-my-project-container > .dc-check-my-project-container-title-dt';
const body_commit_analysis_selector = '#dc-commit-analysis > .container > .row > .dc-check-my-project-container > .dc-check-my-project-container-title-dt';
const content_UnlockWork_tab = [
    'Get powerful insights and deliver a better product',
    'All-in-one dashboard',
    'Code Quality Rank',
    'Keep your technical debt under control',
    'In-depth commit analysis'
]
const link_learnMore_selector = '.dc-learn-more';

export class LandingPage {
    
    truToBeTrue() {
        expect(true).to.be.true;
    }

    buttonSignIn() {
        cy.get(buttonSignIn_selector).should('be.visible').click();
    }

    buttonSignUp() {
        cy.get(buttonSignUp_selector).should('be.visible').click();
    }

    buttonGetStarted1() {
        cy.get(buttonGetStarted1_selector).should('be.visible').should('have.attr', 'href', '/auth/signup').click();
    }

    buttonGetStarted2() {
        cy.get(buttonGetStarted2_selector).should('be.visible').should('have.attr', 'href', '/auth/signup').click();
    }

    mainIntro() {
        cy.get(mainIntroSelf_selector).should('be.visible');
    }

    // Test metod Roles block
    mainContentRoles() {
        cy.navigatingTabs(tabRoles[0], nameRoles[0]);
        cy.get(mainBlockTabs[0]).contains(nameRoles[0]).should('be.visible');
        cy.get('#dc-business-owner > .container > .row > .dc-check-my-project-container > .check-project-wrapper > a > .btn').contains('TRY FOR FREE').should('be.visible');
        cy.navigatingTabs(tabRoles[1], nameRoles[1]);
        cy.get(mainBlockTabs[1]).contains(nameRoles[1]).should('be.visible');
        cy.get('#dc-delivery-manager > .container > .row > .dc-check-my-project-container > .check-project-wrapper > a > .btn').contains('TRY FOR FREE').should('be.visible');
        cy.navigatingTabs(tabRoles[2], nameRoles[2])
        cy.get('#dc-technical-leader > .container > .row > .dc-check-my-project-container > .check-project-wrapper > a > .btn').contains('TRY FOR FREE').should('be.visible');
        cy.get(mainBlockTabs[2]).contains(nameRoles[2]).should('be.visible');
    }

    // test metod "Unlock the hidden potential in your workforce"
    mainContentUnlockWork() {
        cy.navigatingTabs(tab_powerful_insights_selector, tabName[0]);
        cy.get(body_powerful_insights_selector).contains(content_UnlockWork_tab[0]).should('be.visible');
        cy.navigatingTabs(tab_aio_dashboard_selector, tabName[1]);
        cy.get(body_aio_dashboard_selector).contains(content_UnlockWork_tab[1]).should('be.visible');
        cy.navigatingTabs(tab_cq_rank_selector, tabName[2]);
        cy.get(body_cq_rank_selector).contains(content_UnlockWork_tab[2]).should('be.visible');
        cy.get(link_learnMore_selector).contains('LEARN MORE').should('be.visible').should('have.attr', 'href', '/code-quality')
        cy.navigatingTabs(tab_td_under_control_selector, tabName[3]);
        cy.get(body_td_under_control_selector).contains(content_UnlockWork_tab[3]).should('be.visible');
        cy.navigatingTabs(tab_commit_analysis_selector, tabName[4]);
        cy.get(body_commit_analysis_selector).contains(content_UnlockWork_tab[4]).should('be.visible');
    }

    selectCodeQualityRank() {
        cy.navigatingTabs(tab_cq_rank_selector, tabName[2]);
        cy.get(link_learnMore_selector).contains('LEARN MORE').should('be.visible').should('have.attr', 'href', '/code-quality').click();
    }

    // Test Title
    mainContentTitle(array) {
        cy.contains(array).should('be.visible');
    }

    // Test FAQ menu
    mainFaqMenu() {
        cy.openTabFag(headingTabFag[0], collapseCardBody[0], descriptonTab[0]).wait(1000);
        cy.openTabFag(headingTabFag[1], collapseCardBody[1], descriptonTab[1]).wait(1000);
        cy.openTabFag(headingTabFag[2], collapseCardBody[2], descriptonTab[2]).wait(1000);
        cy.openTabFag(headingTabFag[3], collapseCardBody[3], descriptonTab[3]).wait(1000);
        cy.openTabFag(headingTabFag[4], collapseCardBody[4], descriptonTab[4]).wait(1000);
        cy.openTabFag(headingTabFag[5], collapseCardBody[5], descriptonTab[5]).wait(1000);
        cy.openTabFag(headingTabFag[6], collapseCardBody[6], descriptonTab[6])
    }

    selectPlanTrial() {
        cy.get(freePropose_btn_1_selector).should('be.visible').click();
        cy.get('.cq-plan-selector > :nth-child(1) > .btn').should('be.visible').click();
        cy.contains('Free to try').should('be.visible');
        cy.get(freePropose_btn_2_selector).contains('START USING').should('be.visible').click();
    }

    selectPlanCommercial() {
        cy.get(freePropose_btn_1_selector).should('be.visible').click();
        cy.get('.cq__commercial_propose > .btn').should('be.visible').click();
        cy.contains('$12/mo').should('be.visible');
        cy.get(freePropose_btn_2_selector).contains('TRY FOR FREE').should('be.visible').click(); 
    }

    mainFaqMenuBloc() {
        this.mainFaqMenu;
    }

    // Trending Topic Blog
    checkLinkTopic(nameArticle, url) {
        cy.contains(nameArticle).should('be.visible').should('have.attr', 'href', url)
    }

    linksPageLending(linksLending, url) {
        cy.contains(linksLending).should('be.visible').should('have.attr', 'href', url).click();
    }

}

export const landingPage = new LandingPage();