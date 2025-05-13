import { useState, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import './App.css';
import WalletBalance from './components/WalletBalance';
import AddExpenseForm from './components/AddExpenseForm';
import AddBalanceForm from './components/AddBalanceForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';

function App() {
  // State for expenses, balance, and modal visibility
  const [expenses, setExpenses] = useState([]);
  const [balance, setBalance] = useState(7000);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [expenseToEdit, setExpenseToEdit] = useState(null);

  // Load data from localStorage on component mount
  useEffect(() => {
    try {
      const savedExpenses = localStorage.getItem('expenses');

      // Always set balance to 7000 regardless of what's in localStorage
      setBalance(7000);
      localStorage.setItem('balance', '7000');
      console.log('Set wallet balance to 7000');

      if (savedExpenses) {
        const parsedExpenses = JSON.parse(savedExpenses);
        setExpenses(parsedExpenses);
        console.log('Loaded expenses from localStorage:', parsedExpenses);
      }
    } catch (error) {
      console.error('Error loading from localStorage:', error);
    }
  }, []);

  // Save data to localStorage whenever expenses or balance changes
  useEffect(() => {
    try {
      localStorage.setItem('expenses', JSON.stringify(expenses));
      localStorage.setItem('balance', balance.toString());
      console.log('Data saved to localStorage:', { expenses, balance });
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [expenses, balance]);

  // Add a new expense
  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now().toString(),
      amount: Number(expense.amount),
      date: expense.date,
      type: 'expense'
    };

    setExpenses([newExpense, ...expenses]);
    setBalance(prevBalance => prevBalance - newExpense.amount);
    setShowExpenseModal(false);
  };

  // Add income to balance
  const addIncome = (amount) => {
    const newIncome = {
      id: Date.now().toString(),
      title: 'Income',
      amount: amount,
      date: new Date().toISOString().split('T')[0],
      category: 'Income',
      type: 'income'
    };

    console.log('Adding income transaction:', newIncome);
    setExpenses([newIncome, ...expenses]);

    const newBalance = balance + amount;
    console.log('Updating balance from', balance, 'to', newBalance);
    setBalance(newBalance);
    setShowIncomeModal(false);
  };

  // Delete an expense
  const deleteExpense = (id) => {
    const expenseToDelete = expenses.find(expense => expense.id === id);

    if (expenseToDelete) {
      // If it's an expense, add the amount back to balance
      // If it's income, subtract the amount from balance
      const balanceAdjustment = expenseToDelete.type === 'expense' ?
        expenseToDelete.amount : -expenseToDelete.amount;

      setBalance(prevBalance => prevBalance + balanceAdjustment);
      setExpenses(expenses.filter(expense => expense.id !== id));
    }
  };

  // Edit an expense
  const editExpense = (updatedExpense) => {
    const originalExpense = expenses.find(expense => expense.id === updatedExpense.id);
    const amountDifference = originalExpense.amount - Number(updatedExpense.amount);

    setExpenses(expenses.map(expense =>
      expense.id === updatedExpense.id ?
        { ...updatedExpense, amount: Number(updatedExpense.amount) } :
        expense
    ));

    setBalance(prevBalance => prevBalance + amountDifference);
    setExpenseToEdit(null);
    setShowExpenseModal(false);
  };

  // Handle edit button click
  const handleEditExpense = (expense) => {
    setExpenseToEdit(expense);
    setShowExpenseModal(true);
  };

  // Get all transactions (expenses and incomes)
  const allTransactions = expenses;

  // Filter expenses by category
  const getExpensesByCategory = (category) => {
    return expenses.filter(expense =>
      expense.type === 'expense' && expense.category === category
    );
  };

  // Get total expenses
  const getTotalExpenses = () => {
    return expenses
      .filter(transaction => transaction.type === 'expense')
      .reduce((total, expense) => total + expense.amount, 0);
  };

  // Get total income
  const getTotalIncome = () => {
    return expenses
      .filter(transaction => transaction.type === 'income')
      .reduce((total, income) => total + income.amount, 0);
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="app-container">
        <header className="app-header">
          <h1>Expense Tracker</h1>
        </header>

        <div className="dashboard">
          <div className="dashboard-card wallet-card" data-testid="wallet-card">
            <WalletBalance balance={balance} />
            <div id="balance-value" className="balance-value" data-testid="balance-value">{balance}</div>
            <div id="wallet-balance-display" className="wallet-balance-display" data-testid="wallet-balance-display">{balance}</div>
            <button
              type="button"
              className="btn btn-income"
              onClick={() => setShowIncomeModal(true)}
              data-testid="add-income-btn"
              id="add-income-btn"
            >
              + Add Income
            </button>
          </div>

          <div className="dashboard-card expenses-card">
            <div className="expenses-amount">
              Expenses: <span className="amount">₹{getTotalExpenses()}</span>
            </div>
            <button
              type="button"
              className="btn btn-expense"
              onClick={() => {
                setExpenseToEdit(null);
                setShowExpenseModal(true);
              }}
              data-testid="add-expense-btn"
              id="add-expense-btn"
            >
              + Add Expense
            </button>
          </div>

          <div className="dashboard-card chart-card">
            <div className="pie-chart-container">
              <ExpenseSummary
                totalExpenses={getTotalExpenses()}
                totalIncome={getTotalIncome()}
                foodExpenses={
                  getExpensesByCategory('Food').reduce((sum, exp) => sum + exp.amount, 0) +
                  getExpensesByCategory('Dinner').reduce((sum, exp) => sum + exp.amount, 0) +
                  getExpensesByCategory('Lunch').reduce((sum, exp) => sum + exp.amount, 0) +
                  getExpensesByCategory('Brunch').reduce((sum, exp) => sum + exp.amount, 0)
                }
                travelExpenses={
                  getExpensesByCategory('Travel').reduce((sum, exp) => sum + exp.amount, 0) +
                  getExpensesByCategory('Hotel Stay').reduce((sum, exp) => sum + exp.amount, 0)
                }
                entertainmentExpenses={
                  getExpensesByCategory('Entertainment').reduce((sum, exp) => sum + exp.amount, 0) +
                  getExpensesByCategory('Gym').reduce((sum, exp) => sum + exp.amount, 0)
                }
              />
            </div>
          </div>
        </div>

        <h2 className="section-heading" id="transactions-heading">Recent Transactions</h2>
        <div className="transactions-container" id="transactions-container">
          <ExpenseList
            expenses={allTransactions}
            onDelete={deleteExpense}
            onEdit={handleEditExpense}
          />
        </div>

        {showExpenseModal && (
          <AddExpenseForm
            addExpense={addExpense}
            editExpense={editExpense}
            expenseToEdit={expenseToEdit}
            balance={balance}
            onClose={() => {
              setShowExpenseModal(false);
              setExpenseToEdit(null);
            }}
          />
        )}

        {showIncomeModal && (
          <AddBalanceForm
            onAddIncome={addIncome}
            onClose={() => setShowIncomeModal(false)}
          />
        )}
      </div>
    </SnackbarProvider>
  );
}

export default App;