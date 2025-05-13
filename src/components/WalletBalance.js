// components/WalletBalance.js
const WalletBalance = ({ balance }) => {
  return (
    <div className="balance-amount">
      Wallet Balance: <span className="amount">₹{balance}</span>
      <span data-testid="wallet-balance" id="wallet-balance" style={{ position: 'absolute', opacity: 0 }}>{balance}</span>
    </div>
  );
};

export default WalletBalance;
