import AppRoutes from './AppRoutes';
import './App.css'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import type { AuthContextType } from './types/AuthView/authContext';

// CHECK authenticated user
export const AuthContext = createContext<AuthContextType>({ authUser: null, setAuthUser: () => null });
export const useAuth = () => useContext(AuthContext);

function App() {
  const [authUser, setAuthUser] = useState<any | null>(null);

  useEffect(() => {

    const checkAuth = async () => {
      try{
        const response = await axios.get("http://localhost:8600/api/auth/checkAuth", {
          withCredentials: true
        });
    
        if (response.status === 200) {
          console.log("Auth user data:", response.data);
          setAuthUser(response.data)
        }
      } catch (error) {
        console.error("User is not authenticated or server failed:", error);
        setAuthUser(null);
      }
    };

    checkAuth();
  }, []);

  return (
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
          <AppRoutes/>
      </AuthContext.Provider>
  );
};

export default App;