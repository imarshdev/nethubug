import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Services from "./components/services/services";
import SideBar from "./components/sidebar/sidebar";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="container">
      <Navbar setSidebarOpen={setSidebarOpen} />
      <Services />
      <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
    </div>
  );
}

export default App;
