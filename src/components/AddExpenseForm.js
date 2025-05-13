// components/AddExpenseForm.js
import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';

const AddExpenseForm = ({ addExpense, editExpense, expenseToEdit, balance, onClose }) => {
  const [expense, setExpense] = useState({ title: '', price: '', category: '', date: '' });
  const { enqueueSnackbar } = useSnackbar();
  const isEditing = !!expenseToEdit;

  // If editing, populate form with expense data
  useEffect(() => {
    if (expenseToEdit) {
      setExpense({
        ...expenseToEdit,
        price: expenseToEdit.amount.toString()
      });
    }
  }, [expenseToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExpense({ ...expense, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate all fields are filled
    if (!expense.title || !expense.price || !expense.category || !expense.date) {
      enqueueSnackbar('Please fill all required fields', { variant: 'error' });
      return;
    }

    const amount = Number(expense.price);

    // Validate amount is a positive number
    if (isNaN(amount) || amount <= 0) {
      enqueueSnackbar('Please enter a valid amount', { variant: 'error' });
      return;
    }

    // For new expenses, check if amount exceeds balance
    if (!isEditing && amount > balance) {
      enqueueSnackbar('Amount exceeds wallet balance', { variant: 'error' });
      return;
    }

    // For editing, check if new amount would exceed balance
    if (isEditing) {
      const oldAmount = expenseToEdit.amount;
      const balanceAfterRemovingOld = balance + oldAmount;

      if (amount > balanceAfterRemovingOld) {
        enqueueSnackbar('New amount exceeds wallet balance', { variant: 'error' });
        return;
      }

      // Create a modified expense object with amount field for compatibility
      const modifiedExpense = {
        ...expense,
        amount: amount
      };
      editExpense(modifiedExpense);
      enqueueSnackbar('Expense updated successfully!', { variant: 'success' });
    } else {
      // Create a modified expense object with amount field for compatibility
      const modifiedExpense = {
        ...expense,
        amount: amount
      };
      console.log('Adding expense:', modifiedExpense);
      addExpense(modifiedExpense);
      enqueueSnackbar('Expense added successfully!', { variant: 'success' });
    }

    // Reset form
    setExpense({ title: '', price: '', category: '', date: '' });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">{isEditing ? 'Edit Expense' : 'Add Expense'}</h2>
        <form onSubmit={handleSubmit} data-testid="expense-form">
          <div className="form-group">
            <input
              type="text"
              name="title"
              placeholder="Title"
              value={expense.title}
              onChange={handleChange}
              className="form-control"
              data-testid="expense-title-input"
              id="title"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={expense.price}
              onChange={handleChange}
              className="form-control"
              data-testid="expense-amount-input"
              id="price"
              required
            />
          </div>
          <div className="form-group">
            <select
              name="category"
              value={expense.category}
              onChange={handleChange}
              className="form-control"
              data-testid="expense-category-select"
              id="category"
              required
            >
              <option value="">Select Category</option>
              <option value="Food">Food</option>
              <option value="Entertainment">Entertainment</option>
              <option value="Travel">Travel</option>
              <option value="Shopping">Shopping</option>
              <option value="Bills">Bills</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
              <option value="Dinner">Dinner</option>
              <option value="Lunch">Lunch</option>
              <option value="Hotel Stay">Hotel Stay</option>
              <option value="Brunch">Brunch</option>
              <option value="Gym">Gym</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <input
              type="date"
              name="date"
              value={expense.date}
              onChange={handleChange}
              className="form-control"
              data-testid="expense-date-input"
              id="date"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-expense" data-testid="submit-expense-btn" id="add-expense-submit">
              {isEditing ? 'Update Expense' : 'Add Expense'}
            </button>
            <button
              type="button"
              className="btn"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseForm;
