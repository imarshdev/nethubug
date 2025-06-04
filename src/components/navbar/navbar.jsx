import "./navbar.css";
import rocket from "../../assets/icon.svg";
export default function Navbar() {
  return (
    <div className="navbar-container">
      <img src={rocket} style={{ height: "100%" }} />
      <b id="roboto">Premium Access Closer to you</b>
    </div>
  );
}
