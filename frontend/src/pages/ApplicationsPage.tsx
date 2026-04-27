import { useState } from "react";
import Navbar from "../components/Navbar";
import { useApplications } from "../context/ApplicationContext";
import type { ApplicationStatus } from "../types/Application";

function ApplicationsPage() {
  const {
    applications,
    loading,
    addApplication,
    updateApplicationStatus,
    deleteApplication,
  } = useApplications();

  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    await addApplication({
      company,
      role,
      jobDescription,
    });

    setCompany("");
    setRole("");
    setJobDescription("");
    setSubmitting(false);
  }

  return (
    <>
      <Navbar />
      <div className="page">
        <h2>Applications</h2>

        {/* Add Application Form */}
        <div className="card">
          <form onSubmit={handleSubmit}>
            <input
              placeholder="Company"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
            />

            <input
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />

            <textarea
              placeholder="Job description (optional)"
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={5}
            />

            <button type="submit" disabled={submitting}>
              {submitting ? "Adding..." : "Add Application"}
            </button>
          </form>
        </div>

        {/* Loading state */}
        {loading && <p>Loading applications...</p>}

        {/* Empty state */}
        {!loading && applications.length === 0 && (
          <p>No applications yet. Add your first one above.</p>
        )}

        {/* Applications list */}
        {applications.map((app) => (
          <div className="card" key={app.id}>
            <strong>{app.company}</strong>
            <div style={{ color: "#475569" }}>{app.role}</div>

            <select
              value={app.status}
              onChange={(e) =>
                updateApplicationStatus(
                  app.id,
                  e.target.value as ApplicationStatus
                )
              }
            >
              <option value="Applied">Applied</option>
              <option value="Interview">Interview</option>
              <option value="Offer">Offer</option>
              <option value="Rejected">Rejected</option>
            </select>

            <button
              style={{ marginTop: "8px" }}
              onClick={() => deleteApplication(app.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default ApplicationsPage;
