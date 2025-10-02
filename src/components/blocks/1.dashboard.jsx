import "../styles/dash.css";
export default function Dashboard() {
  return (
    <div className="dashboard">
      <h3>Hello Marsh !</h3>
      <p>
        Current Balance: <span>0.00</span>{" "}
        <span style={{ fontSize: "9px" }}>(cash, savings, other accounts)</span>
      </p>
      <p>
        Daily Income: <span>0.00</span>{" "}
      </p>
      <p>
        Monthly Total Income: <span>0.00</span>{" "}
      </p>
      <p>
        Descretion Expenditure Balance: <span>0.00</span>{" "}
      </p>
    </div>
  );
}
