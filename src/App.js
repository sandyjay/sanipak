import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import BIRecords from "./pages/BIRecords.js";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.tsx";
import TrainingMaterials from "./pages/TrainingMaterials.js";
import AdminPage from "./pages/AdminPage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login to='/login' replace />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/bi-records' element={<BIRecords />} />
        <Route path='/training-materials' element={<TrainingMaterials />} />
      </Routes>
    </Router>
  );
}

export default App;
