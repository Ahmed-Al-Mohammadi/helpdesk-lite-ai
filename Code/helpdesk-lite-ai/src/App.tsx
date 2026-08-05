import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from '@/context/AppContext';
import { PageTransition } from '@/components/Animations';
import LandingPage from '@/pages/LandingPage';
import LoginPage from '@/pages/LoginPage';
import SubmitPage from '@/pages/SubmitPage';
import MyTicketsPage from '@/pages/MyTicketsPage';
import AdminPage from '@/pages/AdminPage';

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><LandingPage /></PageTransition>} />
        <Route path="/login" element={<PageTransition><LoginPage /></PageTransition>} />
        <Route path="/submit" element={<PageTransition><SubmitPage /></PageTransition>} />
        <Route path="/my-tickets" element={<PageTransition><MyTicketsPage /></PageTransition>} />
        <Route path="/admin" element={<PageTransition><AdminPage /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
