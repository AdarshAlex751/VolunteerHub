import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <div className="border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        {/* Logo / Title */}
        <Link
          to="/"
          className="text-base font-semibold tracking-tight text-slate-900"
        >
          Volunteerhub Dashboard
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              {/* Nav links */}
              <NavLink to="/events" active={isActive("/events")}>
                Events
              </NavLink>

              <NavLink to="/announcements" active={isActive("/announcements")}>
                Announcements
              </NavLink>

              {user.role === "admin" && (
                <NavLink to="/admin" active={isActive("/admin")}>
                  Admin
                </NavLink>
              )}

              {/* User pill */}
              <div className="hidden sm:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 shadow-sm">
                <span>{user.name}</span>
                <span className="text-slate-400">•</span>
                <span className="capitalize">{user.role}</span>
              </div>

              {/* Logout */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.12 }}
                onClick={logout}
                className="rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <NavLink to="/login" active={isActive("/login")}>
                Login
              </NavLink>
              <NavLink to="/register" active={isActive("/register")}>
                Register
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* Reusable nav link */
function NavLink({ to, active, children }) {
  return (
    <Link
      to={to}
      className={[
        "relative text-sm font-medium transition",
        active
          ? "text-slate-900"
          : "text-slate-600 hover:text-slate-900",
      ].join(" ")}
    >
      {children}

      {/* Active underline */}
      {active && (
        <motion.span
          layoutId="nav-underline"
          className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full bg-slate-900"
        />
      )}
    </Link>
  );
}
