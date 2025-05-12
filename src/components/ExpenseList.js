// components/ExpenseList.js
import React, { useState } from 'react';
import { FaUtensils, FaPlane, FaShoppingBag, FaFilm, FaBook, FaHeartbeat, FaFileInvoiceDollar, FaQuestion } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Get current expenses
  const indexOfLastExpense = currentPage * itemsPerPage;
  const indexOfFirstExpense = indexOfLastExpense - itemsPerPage;
  const currentExpenses = expenses.slice(indexOfFirstExpense, indexOfLastExpense);

  // Calculate total pages
  const totalPages = Math.ceil(expenses.length / itemsPerPage);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Get icon based on category
  const getCategoryIcon = (category) => {
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

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <ul className="transaction-list">
        {currentExpenses.length > 0 ? (
          currentExpenses.map((expense) => (
            <li key={expense.id} className="transaction-item">
              <div className="transaction-info">
                <div className="transaction-icon">
                  {getCategoryIcon(expense.category)}
                </div>
                <div className="transaction-details">
                  <div className="transaction-title">{expense.title}</div>
                  <div className="transaction-date">{formatDate(expense.date)}</div>
                </div>
              </div>
              <div className="transaction-amount">₹{expense.amount.toFixed(2)}</div>
              <div className="transaction-actions">
                <button
                  className="action-btn edit-btn"
                  onClick={() => onEdit(expense)}
                  aria-label="Edit expense"
                >
                  <FiEdit />
                </button>
                <button
                  className="action-btn delete-btn"
                  onClick={() => onDelete(expense.id)}
                  aria-label="Delete expense"
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="transaction-item">No expenses found</li>
        )}
      </ul>

      {totalPages > 1 && (
        <div className="pagination">
          <button
            className="page-btn"
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
          >
            &lt;
          </button>

          <button className="page-btn active">{currentPage}</button>

          <button
            className="page-btn"
            onClick={() => paginate(currentPage < totalPages ? currentPage + 1 : totalPages)}
            disabled={currentPage === totalPages}
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default ExpenseList;
