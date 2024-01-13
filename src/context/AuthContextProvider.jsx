import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { createContext, useContext } from "react";

const AuthContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  const userContext = useContext(AuthContext);
  return userContext;
};


const AuthContextProvider = ({ children }) => {
  const [currentUser, setcurrentUser] = useState(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) setcurrentUser(user);
    });

    return () => {
      // Cleanup function to unsubscribe when the component unmounts
      unsubscribe();
    };
  }, []);
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};

export default AuthContextProvider;
