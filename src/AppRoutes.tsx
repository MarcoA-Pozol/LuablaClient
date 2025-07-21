import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingView } from './pages/LandingView.tsx';
import { AppView } from './pages/AppView.tsx';
import { AuthView } from './pages/AuthView.tsx';
import { ProfileView } from './pages/ProfileView.tsx';
import { NotificationsView } from "./pages/NotificationsView.tsx";
import { PageNotFoundView } from './pages/PageNotFoundView.tsx';
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";
import { DecksListsProvider } from "./contexts/DecksListsContext.tsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingView/>}/>
                <Route path="/auth" element={<AuthView/>}></Route>
                <Route path="/app" element={
                    <ProtectedRoute>
                        <DecksListsProvider>
                            <AppView/>
                        </DecksListsProvider>
                    </ProtectedRoute>
                }/>                
                <Route path="/profile" element={<ProtectedRoute><ProfileView/></ProtectedRoute>}/>
                <Route path="/notifications" element={<ProtectedRoute><NotificationsView/></ProtectedRoute>}/>
                <Route path="*" element={<PageNotFoundView/>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;