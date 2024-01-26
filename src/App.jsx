import "./App.css";
import "./commonclass.css"
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup/Signup";
import Login from "./pages/login/Login";
import { useAuthContext } from "./context/AuthContextProvider";
import Sidebar from "./components/sidebar/Sidebar";
import ChatArea from "./components/chatArea/ChatArea";


function App() {
  const currentUser = useAuthContext();
  // eslint-disable-next-line react/prop-types
  const ProtectedRoute = ({ children }) => {
    console.log('cureent', currentUser);
    if (!currentUser) {
      return <Navigate to="/login" />;
    }
    // If currentUser is authenticated, render the protected content
    return children;
  };

  return (
    <>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              <ProtectedRoute>
                <Sidebar/>
              </ProtectedRoute>
            }
          />
          <Route path="chats" element={<ChatArea/>}/>
          <Route path="Signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
