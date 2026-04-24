import Navbar from "../components/Navbar";
import { useApplications } from "../context/ApplicationContext";

function DashboardPage() {
  const { applications } = useApplications();

  const counts = {
    Applied: applications.filter((a) => a.status === "Applied").length,
    Interview: applications.filter((a) => a.status === "Interview").length,
    Offer: applications.filter((a) => a.status === "Offer").length,
    Rejected: applications.filter((a) => a.status === "Rejected").length,
  };

  return (
    <div>
      <Navbar />
      <h2>Dashboard</h2>

      <p>Total applications: {applications.length}</p>

      <ul>
        <li>Applied: {counts.Applied}</li>
        <li>Interview: {counts.Interview}</li>
        <li>Offer: {counts.Offer}</li>
        <li>Rejected: {counts.Rejected}</li>
      </ul>
    </div>
  );
}

export default DashboardPage;