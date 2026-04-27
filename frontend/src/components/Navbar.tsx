import { Link, useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  function linkClass(path: string) {
    return location.pathname === path ? "nav-link active" : "nav-link";
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="logo">
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: "10px",
              background:
                "linear-gradient(135deg, var(--primary), var(--accent))",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: 800,
              fontSize: "1rem",
            }}
          >
            C
          </span>
          CareerLens
        </div>

        {/* Navigation */}
        <div className="nav-links">
          <Link className={linkClass("/dashboard")} to="/dashboard">
            Dashboard
          </Link>

          <Link className={linkClass("/applications")} to="/applications">
            Applications
          </Link>

          <button onClick={handleLogout} className="nav-link">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
