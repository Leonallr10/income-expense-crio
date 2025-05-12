// components/WalletBalance.js
import React from 'react';

const WalletBalance = ({ balance }) => {
  return (
    <div className="balance-amount">
      Wallet Balance: <span className="amount">₹{balance.toFixed(2)}</span>
    </div>
  );
};

export default WalletBalance;
