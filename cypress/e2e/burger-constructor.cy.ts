/// <reference types="cypress" />

beforeEach(() => {
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('checkUserAuth');
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('sendOrder');

  window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
  window.localStorage.setItem('accessToken', JSON.stringify('test-accessToken'));
  cy.visit('http://localhost:3000');
});

describe('ingredient details in a modal window', () => {
  it('the modal should be opened and closed correctly', () => {
    cy.get('[data-testid="ingredient-group"]').contains('Краторная булка N-200i').should('exist').click();
    cy.get('[data-testid="modal"]').should('exist');
    cy.get('[data-testid="modal-close"]').should('exist').click();
    cy.get('[data-testid="modal"]').should('not.exist');
  });

  it('the URL and content of the modal should be correct', () => {
    cy.get('[data-testid="ingredient-group"]').contains('Краторная булка N-200i').click();
    cy.url().should('contain', 'ingredients/643d69a5c3f7b9001cfa093c');
    cy.get('[data-testid="modal"]').should('contain.text', 'Детали ингредиента').and('contain.text', 'Краторная булка N-200iКалории, ккал420Белки, г80Жиры, г24Углеводы, г53');
  });
});

describe('adding an ingredient to the constructor', () => {
  it('adding bun works correctly', () => {
    cy.get('[data-testid="ingredient-group"]').contains('Краторная булка N-200i').trigger('dragstart');
    cy.get('[data-testid="constructor-drop-target"]').trigger('drop');
    cy.get('[data-testid="constructor-item-bun"]:first').contains('Краторная булка N-200i (верх)').should('exist');
    cy.get('[data-testid="constructor-item-bun"]:last').contains('Краторная булка N-200i (низ)').should('exist');
  });

  it('adding ingredient works correctly', () => {
    cy.get('[data-testid="ingredient-group"]').contains('Соус Spicy-X').trigger('dragstart');
    cy.get('[data-testid="constructor-drop-target"]').trigger('drop');
    cy.get('[data-testid="constructor-drop-target"]').contains('Соус Spicy-X').should('exist');
  });
});

describe('creating an order', () => {
  it('order creation works correctly', () => {
    cy.get('[data-testid="ingredient-group"]').contains('Краторная булка N-200i').trigger('dragstart');
    cy.get('[data-testid="constructor-drop-target"]').trigger('drop');

    cy.get('[data-testid="ingredient-group"]').contains('Соус традиционный галактический').trigger('dragstart');
    cy.get('[data-testid="constructor-drop-target"]').trigger('drop');

    cy.get('[data-testid="ingredient-group"]').contains('Мясо бессмертных моллюсков Protostomia').trigger('dragstart');
    cy.get('[data-testid="constructor-drop-target"]').trigger('drop');

    cy.get('[data-testid="ingredient-group"]').contains('Плоды Фалленианского дерева').trigger('dragstart');
    cy.get('[data-testid="constructor-drop-target"]').trigger('drop');

    cy.get('[data-testid="ingredient-group"]').contains('Хрустящие минеральные кольца').trigger('dragstart');
    cy.get('[data-testid="constructor-drop-target"]').trigger('drop');

    cy.get('[data-testid="ingredient-group"]').contains('Хрустящие минеральные кольца').trigger('dragstart');
    cy.get('[data-testid="constructor-drop-target"]').trigger('drop');

    cy.get('[data-testid="ingredient-group"]').contains('Хрустящие минеральные кольца').trigger('dragstart');
    cy.get('[data-testid="constructor-drop-target"]').trigger('drop');

    cy.get('button').contains('Оформить заказ').click();
    cy.get('[data-testid=order-number]').contains('34536').should('exist');
  });
});
