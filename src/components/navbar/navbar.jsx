import "./navbar.css";
import rocket from "../../assets/icon.svg";
import menu from "../../assets/menu.svg";
export default function Navbar({ setSidebarOpen }) {
  return (
    <div className="navbar-container">
      <img src={rocket} style={{ height: "100%" }} />
      <b id="roboto">Premium Access Closer</b>
      <img
        onClick={() => setSidebarOpen(true)}
        src={menu}
        style={{ height: "80%", marginRight: "10px", cursor: "pointer" }}
      />
    </div>
  );
}
