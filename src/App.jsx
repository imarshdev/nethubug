import TopBar from "./components/blocks/0.topbar";
import Dashboard from "./components/blocks/1.dashboard";
import Income from "./components/blocks/2.income";

export default function App() {
  return (
    <div className="container">
      <TopBar />
      <div className="content">
        <Dashboard />
        <Income />
      </div>
    </div>
  );
}
