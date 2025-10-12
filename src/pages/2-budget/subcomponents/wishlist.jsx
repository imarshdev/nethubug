import "../../../components/styles/budget.css";

export default function WishlistPage({ wishlist, budgetManager }) {
  const formatUGX = (amount) =>
    new Intl.NumberFormat("en-UG", {
      style: "currency",
      currency: "UGX",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount || 0);

  return (
    <div className="budget-allocator">
      <h2>Wishlist Items</h2>
      <table className="budget-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {wishlist.length === 0 ? (
            <tr>
              <td colSpan={3}>No wishlist items</td>
            </tr>
          ) : (
            wishlist.map((w) => (
              <tr
                key={w.id}
                style={{
                  textDecoration:
                    w.status === "bought" ? "line-through" : "none",
                }}
              >
                <td data-label="Item">{w.description}</td>
                <td data-label="Price">{formatUGX(w.amount)}</td>
                <td
                  data-label="Actions"
                  style={{ display: "flex", gap: "8px" }}
                >
                  {w.status !== "bought" && (
                    <button
                      onClick={() => budgetManager.markWishlistBought(w.id)}
                    >
                      Mark as Bought
                    </button>
                  )}
                  <button
                    onClick={() => budgetManager.deleteWishlistItem(w.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
