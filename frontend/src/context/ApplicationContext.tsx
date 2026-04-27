import { createContext, useContext, useEffect, useState } from "react";import { supabase } from "../lib/supabase";
import { useAuth } from "./AuthContext";
import type { Application } from "../types/Application";

type ApplicationContextType = {
  applications: Application[];
  loading: boolean;
  addApplication: (app: {
    company: string;
    role: string;
    jobDescription?: string;
  }) => Promise<void>;
  updateApplicationStatus: (
    id: string,
    status: Application["status"]
  ) => Promise<void>;
  deleteApplication: (id: string) => Promise<void>;
};

const ApplicationContext = createContext<ApplicationContextType | undefined>(
  undefined
);

export function ApplicationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { session } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session) {
      setApplications([]);
      setLoading(false);
      return;
    }

    async function fetchApplications() {
      setLoading(true);

      const { data, error } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setApplications(
          data.map((row) => ({
            id: row.id,
            company: row.company,
            role: row.role,
            status: row.status,
            jobDescription: row.job_description ?? "",
            createdAt: row.created_at,
          }))
        );
      }

      setLoading(false);
    }

    fetchApplications();
  }, [session]);

  async function addApplication(app: {
    company: string;
    role: string;
    jobDescription?: string;
  }) {
    if (!session) return;

    const { error } = await supabase.from("applications").insert({
      user_id: session.user.id,
      company: app.company,
      role: app.role,
      status: "Applied",
      job_description: app.jobDescription,
    });

    if (!error) {
      const { data } = await supabase
        .from("applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (data) {
        setApplications(
          data.map((row) => ({
            id: row.id,
            company: row.company,
            role: row.role,
            status: row.status,
            jobDescription: row.job_description ?? "",
            createdAt: row.created_at,
          }))
        );
      }
    }
  }

  async function updateApplicationStatus(
    id: string,
    status: Application["status"]
  ) {
    await supabase.from("applications").update({ status }).eq("id", id);

    setApplications((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, status } : app
      )
    );
  }

  async function deleteApplication(id: string) {
    await supabase.from("applications").delete().eq("id", id);

    setApplications((prev) =>
      prev.filter((app) => app.id !== id)
    );
  }

  return (
    <ApplicationContext.Provider
      value={{
        applications,
        loading,
        addApplication,
        updateApplicationStatus,
        deleteApplication,
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
      "useApplications must be used within ApplicationProvider"
    );
  }
  return context;
}
