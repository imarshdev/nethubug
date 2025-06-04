// utils/getPaymentDate.js
export const getPaymentDate = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-indexed (0 = Jan, 1 = Feb...)

  // Get the last day of the current month
  const lastDay = new Date(year, month + 1, 0).getDate(); // day 0 of next month = last day of this month
  const monthName = now.toLocaleString("default", { month: "long" });

  return { day: lastDay, month: monthName };
};
