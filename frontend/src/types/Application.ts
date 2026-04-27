// src/types/Application.ts

export type ApplicationStatus =
  | "Applied"
  | "Interview"
  | "Offer"
  | "Rejected";

export interface Application {
  id: string;
  company: string;
  role: string;
  jobDescription?: string;
  status: ApplicationStatus;
  createdAt: string;
}