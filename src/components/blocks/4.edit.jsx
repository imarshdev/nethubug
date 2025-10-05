export default function Edit({ setPage }) {
  const clearLocalStorage = () => {
    if (window.confirm("Are you sure you want to clear all saved data?")) {
      localStorage.clear();
      alert("All local storage data cleared!");
      // Optional: redirect back to Home
      setPage("Home");
      window.location.reload(); // refresh to reset state
    }
  };

  return (
    <div className="edit-page" style={{marginTop: "50px"}}>
      <h1>Edit Settings</h1>
      <button
        style={{
          padding: "10px 20px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={clearLocalStorage}
      >
        Clear All Local Storage
      </button>
    </div>
  );
}

