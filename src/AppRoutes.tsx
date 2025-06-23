import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingView } from './pages/LandingView.tsx';
import { AppView } from './pages/AppView.tsx';
import { AuthView } from './pages/AuthView.tsx';
import { ProfileView } from './pages/ProfileView.tsx';
import { PageNotFoundView } from './pages/PageNotFoundView.tsx';
import { ProtectedRoute } from "./components/ProtectedRoute.tsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/app" element={<ProtectedRoute><AppView/></ProtectedRoute>}/>                
                <Route path="/" element={<LandingView/>}/>
                <Route path="/auth" element={<AuthView/>}/>
                <Route path="/profile" element={<ProfileView/>}/>
                <Route path="*" element={<PageNotFoundView/>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;