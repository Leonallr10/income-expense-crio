// components/WalletBalance.js
const WalletBalance = ({ balance }) => {
  return (
    <div className="balance-amount">
      Wallet Balance: <span className="amount">₹{balance}</span>
      <span data-testid="wallet-balance" id="wallet-balance">{balance}</span>
    </div>
  );
};

export default WalletBalance;
