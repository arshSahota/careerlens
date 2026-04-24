import { useNavigate } from "react-router-dom";
import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    // fake login
    localStorage.setItem("loggedIn", "true");
    navigate("/dashboard");
  }

  return (
    <div style={{ padding: "40px" }}>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
