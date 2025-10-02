import React, { useState } from "react";
import "../styles/income.css"; // import the CSS file

export default function Income() {
  return (
    <>
      <IncomeTable />
    </>
  );
}

export function IncomeTable() {
  const [rows, setRows] = useState([
    { id: 1, source: "Job", amount: 500 },
    { id: 2, source: "Freelance", amount: 300 },
  ]);
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (id, field, value) => {
    setRows(
      rows.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const handleAddRow = () => {
    setRows([...rows, { id: Date.now(), source: "", amount: 0 }]);
  };

  const handleDeleteRow = (id) => {
    setRows(rows.filter((row) => row.id !== id));
  };

  return (
    <div className="income-container">
      <h2>Sources of Income</h2>

      {/* Display-only table */}
      <table className="income-table">
        <thead>
          <tr>
            <th>
              <p>Source</p>
            </th>
            <th>
              <p>Amount</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td>
                <p>{row.source}</p>
              </td>
              <td>
                <p>${row.amount}</p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn" onClick={() => setIsEditing(true)}>
        <b style={{ letterSpacing: "12px" }}>Edit</b>
      </button>

      {/* Overlay for editing */}
      {isEditing && (
        <div className="overlay">
          <div className="overlay-content">
            <h3>Edit Income Sources</h3>
            <table className="income-table">
              <thead>
                <tr>
                  <th>
                    <p>Source</p>
                  </th>
                  <th>
                    <p>Amount</p>
                  </th>
                  <th>
                    <p>Actions</p>
                  </th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td>
                      <input
                        type="text"
                        value={row.source}
                        onChange={(e) =>
                          handleChange(row.id, "source", e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={row.amount}
                        onChange={(e) =>
                          handleChange(row.id, "amount", Number(e.target.value))
                        }
                      />
                    </td>
                    <td>
                      <button
                        className="btn-delete"
                        onClick={() => handleDeleteRow(row.id)}
                      >
                        <p>
                          <b>Delete</b>
                        </p>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button className="btn" onClick={handleAddRow}>
              Add Source
            </button>

            <button className="btn" onClick={() => setIsEditing(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
