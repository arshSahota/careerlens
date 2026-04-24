import { createContext, useContext, useEffect, useState } from "react";
import type { Application } from "../types/Application";

type ApplicationContextType = {
  applications: Application[];
  addApplication: (app: Application) => void;
  updateApplication: (app: Application) => void;
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
  const [hydrated, setHydrated] = useState(false);

  // ✅ Load once
  useEffect(() => {
    const stored = localStorage.getItem("applications");
    if (stored) {
      setApplications(JSON.parse(stored));
    }
    setHydrated(true);
  }, []);

  // ✅ Save after load
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications, hydrated]);

  function addApplication(app: Application) {
    setApplications((prev) => [...prev, app]);
  }

  function updateApplication(updated: Application) {
    setApplications((prev) =>
      prev.map((app) => (app.id === updated.id ? updated : app))
    );
  }

  return (
    <ApplicationContext.Provider
      value={{ applications, addApplication, updateApplication }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplications() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error("useApplications must be used within ApplicationProvider");
  }
  return context;
}