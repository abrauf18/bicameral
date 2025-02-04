import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./components/shared/Sidebar";
import DataAnalysis from "./components/modules/Analysis/DataAnalysis";

const App = () => {
  return (
    <Router>
      <div className="flex text-secondary-foreground max-h-full h-screen w-full" >
        <Sidebar />
        <Routes>
          <Route path="/" element={<DataAnalysis />} />
          <Route path="/campaigns" element={<h1>Campaigns Page</h1>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;