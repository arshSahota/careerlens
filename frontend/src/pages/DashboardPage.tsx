import Navbar from "../components/Navbar";
import { useApplications } from "../context/ApplicationContext";

function DashboardPage() {
  const { applications } = useApplications();

  const counts = {
    Applied: applications.filter(a => a.status === "Applied").length,
    Interview: applications.filter(a => a.status === "Interview").length,
    Offer: applications.filter(a => a.status === "Offer").length,
    Rejected: applications.filter(a => a.status === "Rejected").length,
  };

  return (
    <>
      <Navbar />
      <div className="page">
        <h2>Dashboard</h2>

        <div className="card">
          <p>Total applications: {applications.length}</p>
          <p>Applied: {counts.Applied}</p>
          <p>Interview: {counts.Interview}</p>
          <p>Offers: {counts.Offer}</p>
          <p>Rejected: {counts.Rejected}</p>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
