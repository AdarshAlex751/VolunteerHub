import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Events from "./pages/Events";
import Announcements from "./pages/Announcements";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminOnly from "./components/AdminOnly";

function Page({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      {/* Make navbar feel premium */}
      <div className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/70 backdrop-blur">
        <Navbar />
      </div>

      {/* Smooth route transitions */}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <Page>
                <Home />
              </Page>
            }
          />
          <Route
            path="/login"
            element={
              <Page>
                <Login />
              </Page>
            }
          />
          <Route
            path="/register"
            element={
              <Page>
                <Register />
              </Page>
            }
          />

          <Route
            path="/events"
            element={
              <ProtectedRoute>
                <Page>
                  <Events />
                </Page>
              </ProtectedRoute>
            }
          />

          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <Page>
                  <Announcements />
                </Page>
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminOnly>
                <Page>
                  <Admin />
                </Page>
              </AdminOnly>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
