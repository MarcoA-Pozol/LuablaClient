import AppRoutes from './AppRoutes';
import './App.css'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Manage authUser globally with a wrapper to send props without explicity defining them
type AuthContextType = {
  authUser: any;
  setAuthUser: React.Dispatch<React.SetStateAction<any>>;
};

export const AuthContext = createContext<AuthContextType>({ authUser: null, setAuthUser: () => {} });
export const useAuth = () => useContext(AuthContext);


function App() {
  const [authUser, setAuthUser] = useState<any>(null);

  useEffect(() => {

    const checkAuth = async () => {
      try{
        const response = await axios.get("http://localhost:8600/api/auth/checkAuth", {
          withCredentials: true
        });
    
        if (response.status === 200) {
          setAuthUser(response.data.username)
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