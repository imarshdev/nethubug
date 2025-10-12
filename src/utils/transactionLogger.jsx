export const logTransaction = (setTransactions, type, amount, description, date) => {
  const newTransaction = {
    id: Date.now().toString(),
    type,
    amount,
    description,
    date,
  };
  setTransactions((prev) => [newTransaction, ...prev])
};
