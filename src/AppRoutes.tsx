import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LandingView } from './pages/LandingView.tsx';
import { FlashcardsView } from './pages/FlashcardsView.tsx';
import { HubView } from "./pages/HubView.tsx";
import { ExamsView } from "./pages/ExamsView.tsx";
import { ModulesView } from './pages/ModulesView.tsx';
import { AdminView } from "./pages/AdminView.tsx";
import { AuthView } from './pages/AuthView.tsx';
import { ProfileView } from './pages/ProfileView.tsx';
import { PageNotFoundView } from './pages/PageNotFoundView.tsx';
import { ProtectedRoute } from "./components/General/ProtectedRoute.tsx";
import DecksListsProvider from "./contexts/DecksListsContext.tsx";
import LanguagesProvider from "./contexts/LanguagesContext.tsx";
import SocialDataProvider from "./contexts/SocialDataContext.tsx";
import PostsProvider from "./contexts/PostsContext.tsx";

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingView/>}/>
                <Route path="/admin" element={
                    <ProtectedRoute>
                        <AdminView/>
                    </ProtectedRoute>}/>
                <Route path="/auth" element={<AuthView/>}/>
                <Route path="/flashcards" element={
                    <ProtectedRoute>
                        <LanguagesProvider>
                            <SocialDataProvider>
                                <DecksListsProvider>
                                    <FlashcardsView/>
                                </DecksListsProvider>
                            </SocialDataProvider>
                        </LanguagesProvider>
                    </ProtectedRoute>
                }/>       
                <Route path="/hub" element={
                    <ProtectedRoute>
                        <LanguagesProvider>
                            <SocialDataProvider>
                                <PostsProvider>    
                                    <HubView/>
                                </PostsProvider>    
                            </SocialDataProvider>
                        </LanguagesProvider>
                    </ProtectedRoute>
                }/>  
                <Route path="/exams" element={
                    <ProtectedRoute>
                        <LanguagesProvider>
                            <SocialDataProvider>
                                <DecksListsProvider>
                                    <ExamsView/>
                                </DecksListsProvider>
                            </SocialDataProvider>
                        </LanguagesProvider>
                    </ProtectedRoute>
                }/>  
                <Route path="/modules" element={
                    <ProtectedRoute>
                        <LanguagesProvider>
                            <SocialDataProvider>
                                <DecksListsProvider>
                                    <ModulesView/>
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