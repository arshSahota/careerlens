import Navbar from "../components/Navbar";
import { useApplications } from "../context/ApplicationContext";

function DashboardPage() {
  const { applications, loading } = useApplications();

  const counts = {
    applied: applications.filter((a) => a.status === "Applied").length,
    interview: applications.filter((a) => a.status === "Interview").length,
    offer: applications.filter((a) => a.status === "Offer").length,
    rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  const total = applications.length;

  const interviewProgress =
    total === 0 ? 0 : Math.round((counts.interview / total) * 100);

  const recentApplications = applications.slice(0, 5);

  return (
    <>
      <Navbar />
      <div className="dashboard-page">
        <h1 className="dashboard-title">Dashboard</h1>

        {loading && <p>Loading dashboard...</p>}

        {!loading && total === 0 && (
          <div className="empty-state">
            <h2>No applications yet</h2>
            <p>
              Start by adding your first job application to track your progress.
            </p>
          </div>
        )}

        {!loading && total > 0 && (
          <>
            {/* Stats cards */}
            <div className="stats-grid">
              <div className="stat-card">
                <h3>Total</h3>
                <p className="stat-number">{total}</p>
              </div>

              <div className="stat-card">
                <h3>Applied</h3>
                <p className="stat-number">{counts.applied}</p>
              </div>

              <div className="stat-card">
                <h3>Interview</h3>
                <p className="stat-number">{counts.interview}</p>
              </div>

              <div className="stat-card success">
                <h3>Offers</h3>
                <p className="stat-number">{counts.offer}</p>
              </div>

              <div className="stat-card danger">
                <h3>Rejected</h3>
                <p className="stat-number">{counts.rejected}</p>
              </div>
            </div>

            {/* Progress section */}
            <div className="card progress-card">
              <h3>Interview Rate</h3>
              <p>{interviewProgress}% of applications reached interview</p>

              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${interviewProgress}%` }}
                />
              </div>
            </div>

            {/* Recent applications */}
            <div className="card">
              <h3>Recent Applications</h3>

              <ul className="recent-list">
                {recentApplications.map((app) => (
                  <li key={app.id} className="recent-item">
                    <div>
                      <strong>{app.company}</strong>
                      <span className="recent-role">{app.role}</span>
                    </div>

                    <span className={`status-badge ${app.status.toLowerCase()}`}>
                      {app.status}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default DashboardPage;