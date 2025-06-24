import AppRoutes from './AppRoutes';
import './App.css'
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

// Manage authUser globally with a wrapper to send props without explicity defining them
type AuthContextType = {
  authUser: any|null;
  setAuthUser: React.Dispatch<React.SetStateAction<any | null>>;
};

type UserHasPickedLanguageContextType = {
  userHasPickedLanguage: boolean;
  setUserHasPickedLanguage: React.Dispatch<React.SetStateAction<boolean>>
}

// CHECK authenticated user
export const AuthContext = createContext<AuthContextType>({ authUser: null, setAuthUser: () => null });
export const useAuth = () => useContext(AuthContext);

// CHECK user has picked a language
export const UserHasPickedLanguageContext = createContext<UserHasPickedLanguageContextType>({ userHasPickedLanguage: false, setUserHasPickedLanguage: () => {}});
export const useCheckUserHasPickedLanguage = () => useContext(UserHasPickedLanguageContext);

// CHECK is email verified

function App() {
  const [authUser, setAuthUser] = useState<any | null>(null);
  const [userHasPickedLanguage, setUserHasPickedLanguage] = useState<boolean>(false);

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

    const checkIsEmailVerified = async () => {
      try {
        console.log("Email is verified");
      } catch (error) {
        console.log("Email is not verified");
      }
    }

    const checkUserHasPickedLanguage = async () => {
      try {
        const response = await axios.get("http://localhost:8600/api/auth/checkUserHasPickedLanguage", {withCredentials:true})
        if (response.status === 200) {
          const data = await response.data;
          if (data.userHasPickedLanguage === true) {
            setUserHasPickedLanguage(true);
          } else {
            setUserHasPickedLanguage(false);
          }

        }
      } catch (error) {

      }
    }

    checkAuth();
    checkIsEmailVerified();
    checkUserHasPickedLanguage();
  }, []);

  return (
      <AuthContext.Provider value={{ authUser, setAuthUser }}>
        <UserHasPickedLanguageContext.Provider value={{ userHasPickedLanguage, setUserHasPickedLanguage }}>
          <AppRoutes/>
        </UserHasPickedLanguageContext.Provider>
      </AuthContext.Provider>
  );
};

export default App;