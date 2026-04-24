import Navbar from "../components/Navbar";
import { useApplications } from "../context/ApplicationContext";

function DashboardPage() {
  const { applications } = useApplications();

  return (
    <div>
      <Navbar />
      <h2>Dashboard</h2>
      <p>Total applications: {applications.length}</p>

      {applications.map((app) => (
        <div key={app.id}>
          {app.company} – {app.role}
        </div>
      ))}
    </div>
  );
}

export default DashboardPage;
