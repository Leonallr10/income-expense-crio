// App.js
import React, { useState, useEffect } from 'react';
import { SnackbarProvider } from 'notistack';
import AddBalanceForm from './components/AddBalanceForm';
import AddExpenseForm from './components/AddExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseSummary from './components/ExpenseSummary';
import ExpenseTrends from './components/ExpenseTrends';
import WalletBalance from './components/WalletBalance';
import './App.css';

const App = () => {
  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [showAddBalanceModal, setShowAddBalanceModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [totalExpenses, setTotalExpenses] = useState(0);

  // Load expenses and balance from localStorage
  useEffect(() => {
    const storedBalance = localStorage.getItem('walletBalance');
    const storedExpenses = JSON.parse(localStorage.getItem('expenses'));
    if (storedBalance) setBalance(Number(storedBalance));
    if (storedExpenses) setExpenses(storedExpenses);
  }, []);

  // Calculate total expenses
  useEffect(() => {
    const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);
    setTotalExpenses(total);
  }, [expenses]);

  // Update localStorage whenever balance or expenses change
  useEffect(() => {
    localStorage.setItem('walletBalance', balance);
    localStorage.setItem('expenses', JSON.stringify(expenses));
  }, [balance, expenses]);

  // Add an expense
  const addExpense = (expense) => {
    const newExpense = {
      ...expense,
      id: Date.now(),
      amount: Number(expense.amount)
    };
    setExpenses([...expenses, newExpense]);
    setBalance(prevBalance => prevBalance - Number(expense.amount));
    setShowAddExpenseModal(false);
  };

  // Delete an expense
  const deleteExpense = (id) => {
    const deletedExpense = expenses.find(exp => exp.id === id);
    const updatedExpenses = expenses.filter(exp => exp.id !== id);
    setExpenses(updatedExpenses);
    setBalance(prevBalance => prevBalance + Number(deletedExpense.amount));
  };

  // Start editing an expense
  const startEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowAddExpenseModal(true);
  };

  // Save edited expense
  const saveEditedExpense = (updatedExpense) => {
    const oldAmount = expenses.find(exp => exp.id === updatedExpense.id).amount;
    const newAmount = Number(updatedExpense.amount);

    const updatedExpenses = expenses.map(exp =>
      exp.id === updatedExpense.id ? {...updatedExpense, amount: newAmount} : exp
    );

    setExpenses(updatedExpenses);
    setBalance(prevBalance => prevBalance + oldAmount - newAmount);
    setEditingExpense(null);
    setShowAddExpenseModal(false);
  };

  // Add income to wallet balance
  const addIncome = (amount) => {
    setBalance(prevBalance => prevBalance + Number(amount));
    setShowAddBalanceModal(false);
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <div className="app-container">
        <h1>Expense Tracker</h1>

        <div className="dashboard">
          <div className="wallet-card card">
            <WalletBalance balance={balance} />
            <button
              type="button"
              className="btn btn-income"
              onClick={() => setShowAddBalanceModal(true)}
              id="add-income-button"
              style={{ display: 'block', margin: '10px auto' }}
            >
              + Add Income
            </button>
          </div>

          <div className="expenses-card card">
            <div className="expenses-amount">
              Expenses: <span className="amount">₹{totalExpenses.toFixed(2)}</span>
            </div>
            <button
              type="button"
              className="btn btn-expense"
              onClick={() => {
                setEditingExpense(null);
                setShowAddExpenseModal(true);
              }}
              id="add-expense-button"
              style={{ display: 'block', margin: '10px auto' }}
            >
              + Add Expense
            </button>
          </div>

          <div className="summary-card card">
            <ExpenseSummary expenses={expenses} />
          </div>
        </div>

        <div className="content-section">
          <div className="transactions-container card">
            <h2 className="section-title">Recent Transactions</h2>
            <ExpenseList
              expenses={expenses}
              onDelete={deleteExpense}
              onEdit={startEditExpense}
            />
          </div>

          <div className="trends-container card">
            <h2 className="section-title">Top Expenses</h2>
            <ExpenseTrends expenses={expenses} />
          </div>
        </div>

        {showAddBalanceModal && (
          <AddBalanceForm
            onAddIncome={addIncome}
            onClose={() => setShowAddBalanceModal(false)}
          />
        )}

        {showAddExpenseModal && (
          <AddExpenseForm
            addExpense={addExpense}
            balance={balance}
            editExpense={saveEditedExpense}
            expenseToEdit={editingExpense}
            onClose={() => {
              setShowAddExpenseModal(false);
              setEditingExpense(null);
            }}
          />
        )}
      </div>
    </SnackbarProvider>
  );
};

export default App;
