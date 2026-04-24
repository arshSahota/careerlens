import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>
      <strong>CareerLens</strong>{" "}
      <Link to="/dashboard">Dashboard</Link>{" "}
      <Link to="/applications">Applications</Link>{" "}
      <Link to="/resumes">Resumes</Link>
    </nav>
  );
}

export default Navbar;