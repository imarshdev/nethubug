export default function Expenses() {
  const FixedCosts = [];
  const VariableCosts = [];
  const Savings = {};
  return (
    <>
      <h1>Expenses</h1>
      <p style={{ margin: 2 }}>50%, 30%, 20% Allocation</p>
      <span>Total:</span>
      <span>Fixed Costs:</span>
      <span>Variable Costs:</span>
      <span>Savings:</span>
      <br />
      <b style={{ margin: 2 }}>Fixed Costs</b>
      <p style={{ margin: 2 }}>Bike payment</p>
      <p style={{ margin: 2 }}>Rent</p>
      <p style={{ margin: 2 }}>Food</p>
      <p style={{ margin: 2 }}>Internet</p>
      <br />
      <b style={{ margin: 2 }}>Variable Costs</b>
      <p style={{ margin: 2 }}>Girlfriend</p>
      <p style={{ margin: 2 }}>Cinema</p>
      <p style={{ margin: 2 }}>Letterboxd</p>
      <p style={{ margin: 2 }}>Books</p>
      <p style={{ margin: 2 }}>New Hoodie</p>
      <br />
      <b style={{ margin: 2 }}>Savings: </b>
    </>
  );
}
