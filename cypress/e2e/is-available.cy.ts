beforeEach(() => {
  cy.intercept("GET", "api/auth/user", { fixture: "user.json" }).as("checkUserAuth");
  cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" }).as("getIngredients");

  window.localStorage.setItem("refreshToken", JSON.stringify("test-refreshToken"));
  window.localStorage.setItem("accessToken", JSON.stringify("test-accessToken"));
});

describe('service is available', () => {
  it('should be available on localhost:3000', () => {
    cy.visit('http://localhost:3000');
  });
});
