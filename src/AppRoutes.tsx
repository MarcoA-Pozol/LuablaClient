import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingView } from './pages/LandingView.tsx';
import { AppView } from './pages/AppView.tsx';
import { AdminView } from "./pages/AdminView.tsx";
import { AuthView } from './pages/AuthView.tsx';
import { ProfileView } from './pages/ProfileView.tsx';
import { PageNotFoundView } from './pages/PageNotFoundView.tsx';
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import DecksListsProvider from "./contexts/DecksListsContext.tsx";
import LanguagesProvider from "./contexts/LanguagesContext.tsx";
import SocialDataProvider from "./contexts/SocialDataContext.tsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingView/>}/>
                <Route path="/admin" element={<AdminView/>}/>
                <Route path="/auth" element={<AuthView/>}/>
                <Route path="/app" element={
                    <ProtectedRoute>
                        <LanguagesProvider>
                            <SocialDataProvider>
                                <DecksListsProvider>
                                    <AppView/>
                                </DecksListsProvider>
                            </SocialDataProvider>
                        </LanguagesProvider>
                    </ProtectedRoute>
                }/>                
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <LanguagesProvider>
                            <SocialDataProvider>
                                <DecksListsProvider>
                                    <ProfileView/>
                                </DecksListsProvider>
                            </SocialDataProvider>
                        </LanguagesProvider>
                    </ProtectedRoute>
                }/>
                <Route path="*" element={<PageNotFoundView/>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;