import { useState } from "react";
import Navbar from "../components/Navbar";
import { useApplications } from "../context/ApplicationContext";
import type { Application } from "../types/Application";

const STATUS_OPTIONS: Application["status"][] = [
  "Applied",
  "Interview",
  "Offer",
  "Rejected",
];

function ApplicationsPage() {
  const { applications, addApplication, updateApplication } =
    useApplications();

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
        <div key={app.id} style={{ marginBottom: "12px" }}>
          <strong>{app.company}</strong> – {app.role}

          <br />

          <select
            value={app.status}
            onChange={(e) =>
              updateApplication({
                ...app,
                status: e.target.value as Application["status"],
              })
            }
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default ApplicationsPage;
