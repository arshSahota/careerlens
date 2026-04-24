import { useState } from "react";
import Navbar from "../components/Navbar";
import { useApplications } from "../context/ApplicationContext";
import type { Application } from "../types/Application";

function ApplicationsPage() {
  const {
    applications,
    resumes,
    addApplication,
    updateApplication,
  } = useApplications();

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
          <strong>{app.company}</strong> – {app.role}

          <br />

          <select
            value={app.resumeId ?? ""}
            onChange={(e) =>
              updateApplication({
                ...app,
                resumeId: Number(e.target.value),
              })
            }
          >
            <option value="">Select resume</option>
            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.name}
              </option>
            ))}
          </select>
        </div>
      ))}
    </div>
  );
}

export default ApplicationsPage;
