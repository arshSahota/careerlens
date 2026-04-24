import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ApplicationsPage from "./pages/ApplicationsPage";
import ResumesPage from "./pages/ResumesPage";
import { ApplicationProvider } from "./context/ApplicationContext";

function App() {
  const isLoggedIn = localStorage.getItem("loggedIn");

  return (
    <ApplicationProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route
            path="/dashboard"
            element={isLoggedIn ? <DashboardPage /> : <Navigate to="/" />}
          />
          <Route
            path="/applications"
            element={isLoggedIn ? <ApplicationsPage /> : <Navigate to="/" />}
          />
          <Route
            path="/resumes"
            element={isLoggedIn ? <ResumesPage /> : <Navigate to="/" />}
          />
        </Routes>
      </BrowserRouter>
    </ApplicationProvider>
  );
}

export default App;