import { useState } from "react";
import Navbar from "../components/Navbar";
import { useApplications } from "../context/ApplicationContext";
import type { Application } from "../types/Application";

function ApplicationsPage() {
  const { applications, addApplication } = useApplications();
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newApplication: Application = {
      id: Date.now(),
      company,
      role,
      status: "Applied",
      createdAt: new Date().toISOString(),
    };

    addApplication(newApplication);
    setCompany("");
    setRole("");
  }

  return (
    <div>
      <Navbar />
      <h2>Applications</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Company"
          value={company}
          required
          onChange={(e) => setCompany(e.target.value)}
        />
        <br /><br />
        <input
          placeholder="Role"
          value={role}
          required
          onChange={(e) => setRole(e.target.value)}
        />
        <br /><br />
        <button type="submit">Add Application</button>
      </form>

      <hr />

      {applications.map((app) => (
        <div key={app.id}>
          <strong>{app.company}</strong> – {app.role} ({app.status})
        </div>
      ))}
    </div>
  );
}

export default ApplicationsPage;