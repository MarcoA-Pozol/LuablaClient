import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingView } from './pages/LandingView.tsx';
import { AppView } from './pages/AppView.tsx';
import { AuthView } from './pages/AuthView.tsx';
import { ProfileView } from './pages/ProfileView.tsx';
import { PageNotFoundView } from './pages/PageNotFoundView.tsx';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingView/>}/>
                <Route path="/app" element={<AppView/>}/>
                <Route path="/auth" element={<AuthView/>}/>
                <Route path="/profile" element={<ProfileView/>}/>
                <Route path="*" element={<PageNotFoundView/>} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;