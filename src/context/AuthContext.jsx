import { createContext, useContext } from "react";
const AuthContext = createContext(null);
const useAuthContext = () => {
  const userContext = useContext(AuthContext);
  return userContext;
};
export { AuthContext, useAuthContext };
