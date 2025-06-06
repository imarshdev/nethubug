import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/navbar";
import Services from "./components/services/services";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="container">
      <Navbar />
      <Services />
    </div>
  );
}

export default App;
