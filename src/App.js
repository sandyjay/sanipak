import Login from "./pages/Login.tsx";
import Dashboard from "./pages/Dashboard.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BIRecords from "./pages/BIRecords.js";
import TrainingMaterials from "./pages/TrainingMaterials.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login to='/login' replace />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/bi-records' element={<BIRecords />} />
        <Route path='/training-materials' element={<TrainingMaterials />} />
      </Routes>
    </Router>
  );
}

export default App;
