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
        <span className="logo">CareerLens</span>

        <div className="nav-links">
          <Link className={linkClass("/dashboard")} to="/dashboard">
            Dashboard
          </Link>

          <Link className={linkClass("/applications")} to="/applications">
            Applications
          </Link>

          <button
            onClick={handleLogout}
            className="nav-link"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;