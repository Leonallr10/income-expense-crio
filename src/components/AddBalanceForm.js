// components/AddBalanceForm.js
import React, { useState } from 'react';
import { useSnackbar } from 'notistack';

const AddBalanceForm = ({ onAddIncome, onClose }) => {
  const [income, setIncome] = useState('');
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (income && !isNaN(income) && Number(income) > 0) {
      const incomeAmount = Number(income);
      console.log('Adding income:', incomeAmount);
      onAddIncome(incomeAmount);
      setIncome('');
      enqueueSnackbar('Income added successfully!', { variant: 'success' });
    } else {
      enqueueSnackbar('Please enter a valid amount', { variant: 'error' });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="modal-title">Add Balance</h2>
        <form onSubmit={handleSubmit} data-testid="income-form">
          <div className="form-group">
            <input
              type="number"
              placeholder="Income Amount"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              className="form-control"
              data-testid="income-input"
              id="income-amount"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-income" data-testid="add-income-button" id="add-income-submit">Add Balance</button>
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

export default AddBalanceForm;
