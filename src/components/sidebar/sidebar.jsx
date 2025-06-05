import "./sidebar.css";
import close from "../../assets/close-white.svg";
export default function SideBar({ setSidebarOpen, sidebarOpen }) {
  return (
    <div className={`side-container ${sidebarOpen ? "open" : ""}`}>
      <div className="topper">
        <h3 className="heading">Account</h3>
        <div className="close-account" onClick={() => setSidebarOpen(false)}>
          <img src={close} style={{ height: "20px" }} />
        </div>
      </div>
      <div className="lower"></div>
    </div>
  );
}
