import { createContext, useContext, useEffect, useState } from "react";
import type { Application } from "../types/Application";

type ApplicationContextType = {
  applications: Application[];
  addApplication: (app: Application) => void;
  updateApplicationStatus: (id: string, status: Application["status"]) => void;
  removeApplication: (id: string) => void;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export function ApplicationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [applications, setApplications] = useState<Application[]>([]);

  // ✅ Load from localStorage (TEMP until Supabase)
  useEffect(() => {
    const stored = localStorage.getItem("applications");
    if (stored) {
      setApplications(JSON.parse(stored));
    }
  }, []);

  // ✅ Persist
  useEffect(() => {
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications]);

  function addApplication(app: Application) {
    setApplications((prev) => [...prev, app]);
  }

  function updateApplicationStatus(
    id: string,
    status: Application["status"]
  ) {
    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  }

  function removeApplication(id: string) {
    setApplications((prev) => prev.filter((app) => app.id !== id));
  }

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        addApplication,
        updateApplicationStatus,
        removeApplication,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplications must be used within an ApplicationProvider"
    );
  }
  return context;
}