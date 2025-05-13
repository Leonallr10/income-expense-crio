// components/WalletBalance.js
const WalletBalance = ({ balance }) => {
  return (
    <div className="balance-amount">
      Wallet Balance: <span className="amount">₹{balance}</span>
    </div>
  );
};

export default WalletBalance;
