import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import Landing from "@/pages/Landing";
import Login from "@/pages/Login";
import Submit from "@/pages/Submit";
import MyTickets from "@/pages/MyTickets";
import Admin from "@/pages/Admin";

const pageVariants: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
  exit:    { opacity: 0, y: -8, transition: { duration: 0.2, ease: "easeIn" } },
};

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ minHeight: "100vh" }}
      >
        <Routes location={location}>
          <Route path="/"            element={<Landing />} />
          <Route path="/login"       element={<Login />} />
          <Route path="/submit"      element={<Submit />} />
          <Route path="/my-tickets"  element={<MyTickets />} />
          <Route path="/admin"       element={<Admin />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AnimatedRoutes />
    </BrowserRouter>
  );
}