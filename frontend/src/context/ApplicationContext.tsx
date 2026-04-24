import { createContext, useContext, useEffect, useState } from "react";
import type { Application } from "../types/Application";

type ApplicationContextType = {
  applications: Application[];
  addApplication: (app: Application) => void;
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
  const [hydrated, setHydrated] = useState(false); // ✅ IMPORTANT FLAG

  // ✅ LOAD once on app start
  useEffect(() => {
    const stored = localStorage.getItem("applications");
    if (stored) {
      setApplications(JSON.parse(stored));
    }
    setHydrated(true); // ✅ mark load as complete
  }, []);

  // ✅ SAVE only AFTER hydration
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("applications", JSON.stringify(applications));
  }, [applications, hydrated]);

  function addApplication(app: Application) {
    setApplications((prev) => [...prev, app]);
  }

  return (
    <ApplicationContext.Provider value={{ applications, addApplication }}>
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