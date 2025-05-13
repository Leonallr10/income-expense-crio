// components/ExpenseList.js
import { FaUtensils, FaPlane, FaShoppingBag, FaFilm, FaBook, FaHeartbeat, FaFileInvoiceDollar, FaQuestion, FaMoneyBillWave } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin6Line } from 'react-icons/ri';

const ExpenseList = ({ expenses, onDelete, onEdit }) => {
  // Show all transactions without pagination
  const currentExpenses = expenses;

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
      case 'Dinner':
        return <FaUtensils />;
      case 'Lunch':
        return <FaUtensils />;
      case 'Brunch':
        return <FaUtensils />;
      case 'Hotel Stay':
        return <FaPlane />;
      case 'Gym':
        return <FaHeartbeat />;
      default:
        return <FaQuestion />;
    }
  };

  return (
    <div data-testid="transaction-list-container" id="transactions">
      <h3>Transactions</h3>
      <ul className="transaction-list">
        {currentExpenses.length > 0 ? (
          currentExpenses.map((transaction) => (
            <li
              key={transaction.id}
              className={`transaction-item ${transaction.type === 'income' ? 'income' : 'expense'}`}
              data-testid={`transaction-${transaction.id}`}
              data-category={transaction.category}
              data-type={transaction.type}
              id={`transaction-${transaction.category}-${transaction.id}`}
            >
              <div className="transaction-info">
                <div className="transaction-icon">
                  {getCategoryIcon(transaction.category, transaction.type)}
                </div>
                <div className="transaction-details">
                  <div className="transaction-title">{transaction.title}</div>
                  <div className="transaction-date">{transaction.date}</div>
                  <div className="transaction-category">{transaction.category}</div>
                </div>
              </div>
              <div
                className={`transaction-amount ${transaction.type === 'income' ? 'income-amount' : 'expense-amount'}`}
                data-testid={`amount-${transaction.id}`}
                id={`amount-${transaction.id}`}
              >
                ₹{transaction.amount || 0}
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
