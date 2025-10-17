import "../../../components/styles/budget.css";
import { useBudgetManager } from "../helper/usebudgethelper";

export default function WishlistPage() {
  const { wishlist, markWishlistBought, deleteWishlistItem } = useBudgetManager();
  const formatUGX = (amt) => new Intl.NumberFormat("en-UG", { style: "currency", currency: "UGX", minimumFractionDigits: 0 }).format(amt || 0);

  return (
    <div className="budget-allocator">
      <h2>Wishlist Items</h2>
      <table className="budget-table">
        <thead>
          <tr>
            <th><p>Item</p></th>
            <th><p>Price</p></th>
            <th><p>Actions</p></th>
          </tr>
        </thead>
        <tbody>
          {wishlist.length === 0 ? (
            <tr><td colSpan={3}><p>No wishlist items</p></td></tr>
          ) : (
            wishlist.map((w) => (
              <tr key={w.id} style={{ textDecoration: w.status === "bought" ? "line-through" : "none" }}>
                <td><p>{w.description}</p></td>
                <td><p>{formatUGX(w.amount)}</p></td>
                <td style={{ display: "flex", gap: "8px" }}>
                  {w.status !== "bought" && <button onClick={() => markWishlistBought(w.id)}>Bought</button>}
                  <button onClick={() => deleteWishlistItem(w.id)}>Delete</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}