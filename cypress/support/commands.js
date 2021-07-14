// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import 'cypress-wait-until';
const uuid  = require('uuid');
const moment = require('moment');

Cypress.Commands.add("login", () => { 
    cy.clearCookies()
    cy.clearLocalStorage()
    cy.get('[name="email"]').type(Cypress.env('userName'))
    cy.get('[name="password"]').type(Cypress.env('password'), {log: false})
    cy.get('[type="submit"]').click()
    cy.url().should('include', '/projects')
    cy.xpath('//div[@class="cq-avatar "]').should('be.visible')
})

Cypress.Commands.add("alpha_numeric", () => { 
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 10; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
})

Cypress.Commands.add("logout", () => { 
    cy.get('.cq-avatar').should('be.visible').click();
    cy.xpath('//button/div[contains(text(), "Sign Out")]').should('be.visible').click();
    cy.get('.cq-signin').should('be.visible');
    cy.clearCookies();
    cy.clearLocalStorage();
})

Cypress.Commands.add("createUser", () => { 
    cy.xpath('//a[@href="/auth/signup"]').click();
        cy.get('#first-name').should('be.visible').type('Roman');
        cy.get('#last-name').should('be.visible').type('Veremeienko');
        cy.alpha_numeric().then((email) => {
            const email_string = email;
        cy.get('#email').should('be.visible').type(`${email_string}testemail@gmail.com`);
        })
        cy.alpha_numeric().then((pass) => {
            const password = pass;
        cy.xpath('//input[@type="password"]').eq(0).should('be.visible').type(password);
        cy.xpath('//input[@type="password"]').eq(1).should('be.visible').type(password);
        })
        cy.xpath('//button[contains(text(), "Sign Up")]').should('be.visible').click();
        cy.xpath('//a[@href="/wizard/project"]').should('be.visible').and('have.attr', 'href');
})

Cypress.Commands.add("createProject", () => { 
    cy.get('a[href="/wizard/project"]').should('be.visible').click();
    cy.get('#name').should('be.visible').type('Automation Test');
    cy.get('button[type="submit"]').should('be.visible').click().wait(2000);
})

Cypress.Commands.add("loginAPI", () => { 
    cy.request({
        method: 'POST',
        url: 'http://sindex.qarea.org:10003/rpc/user',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Length': '175',
            'Content-Type': 'application/json',
            'Cookie':'__stripe_mid=a8782bea-1447-429a-bc59-366e756e7f67; __stripe_sid=50e7e657-8bd6-48cf-a33e-0abb9a2a03a3',
            'Host': 'sindex.qarea.org:10003',
            'Origin': 'http://sindex.qarea.org:10003',
            'Pragma': 'no-cache',
            'Referer': 'http://sindex.qarea.org:10003/auth/signin',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36'
        },
        body: {
            id:uuid.v4(),
            jsonrpc:"2.0",
            method:"API.LoginUser",
            params:
            {
                login:"veremeienkorm@hotmail.com",
                password:"^M0ItvUQ*ri3",
                remember:true
            }
        }
    }).then((response) => {
        return response;
    })

})

Cypress.Commands.add("getCommitsAPI", (id, token) => { 
    cy.request({
        method: 'POST',
        url: 'http://sindex.qarea.org:10003/rpc',
        headers: {
            'Accept': 'application/json',
            'Accept-Encoding': 'gzip, deflate',
            'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7,uk;q=0.6',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'Content-Length': '1209',
            'Content-Type': 'application/json',
            'Cookie':'__stripe_mid=a8782bea-1447-429a-bc59-366e756e7f67; __stripe_sid=50e7e657-8bd6-48cf-a33e-0abb9a2a03a3; Authorization=eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbiI6ZmFsc2UsImV4cCI6MTU3Mjg2MDI0OSwiaWF0IjoxNTcyODU5OTQ5LCJsaW0iOnsiUmVwb3NMaW1pdCI6MX0sInBlcm0iOnsiQWxsb3dUb01hbmFnZVByb2plY3RzIjp0cnVlLCJBbGxvd1RvTWFuYWdlUmVwb3MiOnRydWUsIkFsbG93VG9NYW5hZ2VVc2VycyI6dHJ1ZSwiQWxsb3dUb01hbmFnZVBheW1lbnRzIjp0cnVlfSwic3ViIjoiNWRhODRjMmJhZmNiM2ZjMjEzODExZmVhIn0.nhjvz7IOG57TFhUpEcqm4z8XdFrA3MYoewWsFEAEHcNtgBaN6c-7pkv1R3JEa85Yxot53IYsmaKcQRMtFFPPhJmIaySXCsUTFoCIDRaul1vcpN54d4dez3qoJqJlFyQtQ7zAXb0KSLrkP3rlQ-ynl3YUxFlkURorC6mfLN6Vo7CsT92IQ00kCaoEwk7X8FFGBPJUWkH8obVhgFRzDOwamTRy5SDdCms_zVqulADqeyIXLQ6JqwgIxZ93iVUfNz1-xEpQRUS0gI1qXuldmcFKQ2PFOiXKYB0M415MlvXRxek1Ic0Bat26whEisGb4ELBNtNF9Xe3GbQhg5F5e-U3HUA',
            'Host': 'sindex.qarea.org:10003',
            'Origin': 'http://sindex.qarea.org:10003',
            'Pragma': 'no-cache',
            'Referer': 'http://sindex.qarea.org:10003/project/analysis/developers',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.80 Safari/537.36'
        },
        body: {
            id:id,
            jsonrpc:"2.0",
            method:"CQService.GetCommitsList",
            params:{
                Context:{
                    Token:token,
                    Deadline:moment().unix(),
                    TimeOffset: new Date().getTimezoneOffset() * (-60),
                    TracingID:uuid.v4()
                },
            instance_token:`${Cypress.env('instance_token')}`,
            project_id:`${Cypress.env('project_id')}`,
            repository_id:`${Cypress.env('repository_id')}`,
            scale:"repository",
            filter:{
                start_date:null,
                end_date:null,
                order:{
                    field:"affected_lines",
                    direction:"desc"
                },
            users:[],
            commits:[],
            languages:[],
            merges_enabled:true
                }
            }
        }
    }).then((response) => {
        return response;
    })
})

Cypress.Commands.add('openTabFag', (tab, collapse, descripton) => {
    cy.get(tab).should('be.visible').click();
    cy.get(collapse).contains(descripton).should('be.visible');
    cy.wait(1500);
    cy.focused(tab).should('be.visible').click();
    cy.contains(descripton).should('not.be.visible');
})

Cypress.Commands.add('navigatingTabs', (panelSelector, roles) => {
    cy.get(`${panelSelector}`).should('be.visible').contains(roles).should('be.visible').click();
})

Cypress.Commands.add('clickElement', (name_element) => {
    cy.get(name_element).should('be.visible').click();
})