import { createContext, useContext, useEffect, useState } from "react";
import type { Application } from "../types/Application";
import type { Resume } from "../types/Resume";

type ApplicationContextType = {
  applications: Application[];
  resumes: Resume[];
  addApplication: (app: Application) => void;
  updateApplication: (app: Application) => void;
  addResume: (resume: Resume) => void;
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
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [hydrated, setHydrated] = useState(false);

  // ✅ Load once
  useEffect(() => {
    const storedApps = localStorage.getItem("applications");
    const storedResumes = localStorage.getItem("resumes");

    if (storedApps) setApplications(JSON.parse(storedApps));
    if (storedResumes) setResumes(JSON.parse(storedResumes));

    setHydrated(true);
  }, []);

  // ✅ Save after hydration
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem("applications", JSON.stringify(applications));
    localStorage.setItem("resumes", JSON.stringify(resumes));
  }, [applications, resumes, hydrated]);

  function addApplication(app: Application) {
    setApplications((prev) => [...prev, app]);
  }

  function updateApplication(updated: Application) {
    setApplications((prev) =>
      prev.map((app) => (app.id === updated.id ? updated : app))
    );
  }

  function addResume(resume: Resume) {
    setResumes((prev) => [...prev, resume]);
  }

  return (
    <ApplicationContext.Provider
      value={{ applications, resumes, addApplication, updateApplication, addResume }}
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