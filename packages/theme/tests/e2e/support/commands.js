/* eslint-disable no-undef */
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
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('interceptApi', (url, data) => {
  cy.intercept('POST', '/api/sylius/' + url, (req) => {
    req.url = '/api/sylius/' + url;
    req.reply({ body: data });
  });
});

Cypress.Commands.add('el', (selector, children, options) => {
  return children
    ? cy.get(`[data-e2e="${selector}"] ${children}`, options)
    : cy.get(`[data-e2e="${selector}"]`, options);
});

Cypress.Commands.add('vsfUiEl', (selector, children, options) => {
  return children
    ? cy.get(`[data-testid="${selector}"] ${children}`, options)
    : cy.get(`[data-testid="${selector}"]`, options);
});
