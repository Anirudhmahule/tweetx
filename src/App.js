// App.js
import "./index.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Feed from "./pages/Feed";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <Router>
      <Routes>
        {/* Protected Routes */}
        <Route path="/" element={<ProtectedRoute element={<Feed />} />} />
        <Route path="/users" element={<ProtectedRoute element={<Users />} />} />
        <Route
          path="/profile"
          element={<ProtectedRoute element={<Profile />} />}
        />

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
