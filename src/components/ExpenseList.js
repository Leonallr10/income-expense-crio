// components/ExpenseList.js
import { useState } from 'react';
import { FaUtensils, FaPlane, FaShoppingBag, FaFilm, FaBook, FaHeartbeat, FaFileInvoiceDollar, FaQuestion, FaMoneyBillWave } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const [currentPage] = useState(1);
  const itemsPerPage = 5;

  // Get current expenses
  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  // Get icon based on category
  const getCategoryIcon = (category, type) => {
    if (type === 'income') {
      return <FaMoneyBillWave />;
    }

    switch(category) {
      case 'Food':
        return <FaUtensils />;
      case 'Travel':
        return <FaPlane />;
      case 'Shopping':
        return <FaShoppingBag />;
      case 'Entertainment':
        return <FaFilm />;
      case 'Education':
        return <FaBook />;
      case 'Health':
        return <FaHeartbeat />;
      case 'Bills':
        return <FaFileInvoiceDollar />;
      default:
        return <FaQuestion />;
    }
  };

  return (
    <div>
      <ul className="transaction-list">
        {currentExpenses.length > 0 ? (
          currentExpenses.map((transaction) => (
            <li
              key={transaction.id}
              className={`transaction-item ${transaction.type === 'income' ? 'income' : 'expense'}`}
            >
              <div className="transaction-info">
                <div className="transaction-icon">
                  {getCategoryIcon(transaction.category, transaction.type)}
                </div>
                <div className="transaction-details">
                  <div className="transaction-title">{transaction.title}</div>
                  <div className="transaction-date">{transaction.date}</div>
                </div>
              </div>
              <div className={`transaction-amount ${transaction.type === 'income' ? 'income-amount' : 'expense-amount'}`}>
                ₹{transaction.amount}
              </div>
              <div className="transaction-actions">
                <button
                  className="action-btn delete-btn"
                  onClick={() => onDelete(transaction.id)}
                  aria-label="Delete transaction"
                >
                  <RiDeleteBin6Line />
                </button>
                <button
                  className="action-btn edit-btn"
                  onClick={() => onEdit(transaction)}
                  aria-label="Edit transaction"
                >
                  <FiEdit />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="transaction-item">No transactions found</li>
        )}
      </ul>
    </div>
  );
};

export default ExpenseList;
