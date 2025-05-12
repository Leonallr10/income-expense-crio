// cypress/e2e/spec.cy.js
describe('Expense Tracker Tests', () => {
  beforeEach(() => {
    // Clear localStorage before each test
    cy.clearLocalStorage();
    // Visit the app
    cy.visit('/');
  });

  it('should have a heading with "Expense Tracker"', () => {
    cy.get('h1').should('contain', 'Expense Tracker');
  });

  it('should display wallet balance with default value', () => {
    cy.contains('Wallet Balance').should('exist');
    cy.contains('₹5000.00').should('exist');
  });

  it('should have a button to add income and it should be styled correctly', () => {
    cy.get('[data-testid="add-income-button"]').should('exist');
    cy.get('[data-testid="add-income-button"]').should('contain', '+ Add Income');
    cy.get('[data-testid="add-income-button"]').should('have.css', 'background-color');
  });

  it('should have a button to add expense and it should be styled correctly', () => {
    cy.contains('+ Add Expense').should('exist');
    cy.contains('+ Add Expense').should('have.css', 'background-color');
  });

  it('should be responsive for mobile view', () => {
    // Test for mobile viewport
    cy.viewport('iphone-6');
    cy.contains('Expense Tracker').should('be.visible');
    cy.contains('Wallet Balance').should('be.visible');
    cy.contains('+ Add Income').should('be.visible');
    cy.contains('+ Add Expense').should('be.visible');
  });

  it('Adds an income successfully', () => {
    // Initial balance should be 5000
    cy.contains('₹5000.00').should('exist');

    // Click on Add Income button
    cy.contains('+ Add Income').click();

    // Fill the income form
    cy.get('input[placeholder="Income Amount"]').type('1000');
    cy.contains('button', 'Add Balance').click();

    // Check if balance is updated
    cy.contains('₹6000.00').should('exist');
  });

  it('Displays added expense in the transaction list', () => {
    // Click on Add Expense button
    cy.contains('+ Add Expense').click();

    // Fill the expense form
    cy.get('input[placeholder="Title"]').type('Test Expense');
    cy.get('input[placeholder="Price"]').type('500');
    cy.get('select').select('Food');
    cy.get('input[type="date"]').type('2023-01-01');
    cy.contains('button', 'Add Expense').click();

    // Check if expense is added to the list
    cy.contains('Test Expense').should('exist');
    cy.contains('₹500.00').should('exist');
  });

  it('Displays added food and travel expenses in the transaction list', () => {
    // Add Food expense
    cy.contains('+ Add Expense').click();
    cy.get('input[placeholder="Title"]').type('Food Expense');
    cy.get('input[placeholder="Price"]').type('300');
    cy.get('select').select('Food');
    cy.get('input[type="date"]').type('2023-01-01');
    cy.contains('button', 'Add Expense').click();

    // Add Travel expense
    cy.contains('+ Add Expense').click();
    cy.get('input[placeholder="Title"]').type('Travel Expense');
    cy.get('input[placeholder="Price"]').type('200');
    cy.get('select').select('Travel');
    cy.get('input[type="date"]').type('2023-01-02');
    cy.contains('button', 'Add Expense').click();

    // Check if both expenses are added to the list
    cy.contains('Food Expense').should('exist');
    cy.contains('Travel Expense').should('exist');
  });

  it('Displays added travel and entertainment expenses in the transaction list', () => {
    // Add Travel expense
    cy.contains('+ Add Expense').click();
    cy.get('input[placeholder="Title"]').type('Travel Expense');
    cy.get('input[placeholder="Price"]').type('200');
    cy.get('select').select('Travel');
    cy.get('input[type="date"]').type('2023-01-01');
    cy.contains('button', 'Add Expense').click();

    // Add Entertainment expense
    cy.contains('+ Add Expense').click();
    cy.get('input[placeholder="Title"]').type('Entertainment Expense');
    cy.get('input[placeholder="Price"]').type('400');
    cy.get('select').select('Entertainment');
    cy.get('input[type="date"]').type('2023-01-02');
    cy.contains('button', 'Add Expense').click();

    // Check if both expenses are added to the list
    cy.contains('Travel Expense').should('exist');
    cy.contains('Entertainment Expense').should('exist');
  });

  it('Displays added food, travel, and entertainment expenses in the transaction list', () => {
    // Add Food expense
    cy.contains('+ Add Expense').click();
    cy.get('input[placeholder="Title"]').type('Food Expense');
    cy.get('input[placeholder="Price"]').type('300');
    cy.get('select').select('Food');
    cy.get('input[type="date"]').type('2023-01-01');
    cy.contains('button', 'Add Expense').click();

    // Add Travel expense
    cy.contains('+ Add Expense').click();
    cy.get('input[placeholder="Title"]').type('Travel Expense');
    cy.get('input[placeholder="Price"]').type('200');
    cy.get('select').select('Travel');
    cy.get('input[type="date"]').type('2023-01-02');
    cy.contains('button', 'Add Expense').click();

    // Add Entertainment expense
    cy.contains('+ Add Expense').click();
    cy.get('input[placeholder="Title"]').type('Entertainment Expense');
    cy.get('input[placeholder="Price"]').type('400');
    cy.get('select').select('Entertainment');
    cy.get('input[type="date"]').type('2023-01-03');
    cy.contains('button', 'Add Expense').click();

    // Check if all expenses are added to the list
    cy.contains('Food Expense').should('exist');
    cy.contains('Travel Expense').should('exist');
    cy.contains('Entertainment Expense').should('exist');
  });

  it('Persists data in localStorage', () => {
    // Add an expense
    cy.contains('+ Add Expense').click();
    cy.get('input[placeholder="Title"]').type('Test Expense');
    cy.get('input[placeholder="Price"]').type('500');
    cy.get('select').select('Food');
    cy.get('input[type="date"]').type('2023-01-01');
    cy.contains('button', 'Add Expense').click();

    // Reload the page
    cy.reload();

    // Check if the expense is still there
    cy.contains('Test Expense').should('exist');
    cy.contains('₹500.00').should('exist');

    // Check if localStorage has the expense
    cy.window().then((win) => {
      const expenses = JSON.parse(win.localStorage.getItem('expenses'));
      expect(expenses).to.have.length(1);
      expect(expenses[0].title).to.equal('Test Expense');
      expect(Number(expenses[0].amount)).to.equal(500);
    });
  });
});
