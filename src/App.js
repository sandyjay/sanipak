import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import BIRecords from "./pages/BIRecords.js";
import Dashboard from "./pages/Dashboard.js";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import TrainingMaterials from "./pages/TrainingMaterials.js";
import AdminPage from "./pages/AdminPage.js";
import { useStore } from "./store";

const ProtectedRoute = ({ user, children }) => !user ? <Navigate to="/" replace /> : children;

function App() {
  const [{ user }] = useStore();
  const auth = !!user?.idToken

  return (
    <Router>
      <Routes>
        <Route
          path="/admin"
          element={
            <ProtectedRoute user={auth}>
              <AdminPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute user={auth}>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* <Route path="/" element={user ?
          <Navigate to="/dashboard" replace /> :
          <Login to="/login"  />} /> */}
        <Route path="/" element={<Login to="/login" replace />} />
        <Route path="/register" element={<Register to="/register" replace />} />
        <Route
          path="/bi-records"
          element={
            <ProtectedRoute user={auth}>
              <BIRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/training-materials"
          element={
            <ProtectedRoute user={auth}>
              <TrainingMaterials />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
