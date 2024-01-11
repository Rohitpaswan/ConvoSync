import "./App.css";
import Home from "./pages/home/Home";
import {  Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { useAuthContext } from "./context/AuthContext";

function App() {
  const user = useAuthContext();
  const ProtectedRoute = ({ children }) => {
    if (!user) {
    return  <Navigate to="/login" />;
    }
  };

  return (
    <>
      <Routes>
        <Route path="/">
          <Route
           index
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="Signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
