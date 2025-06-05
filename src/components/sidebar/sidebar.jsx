import "./sidebar.css";
import close from "../../assets/close.svg";
export default function SideBar({ setSidebarOpen, sidebarOpen }) {
  return (
    <div className={`side-container ${sidebarOpen ? "open" : ""}`}>
      <p className="heading">SideBar</p>
      <div className="close-button" onClick={() => setSidebarOpen(false)}>
        <img src={close} style={{ height: "20px" }} />
      </div>
    </div>
  );
}
