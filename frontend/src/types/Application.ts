// frontend/src/types/Application.ts

export type Application = {
  id: number;
  company: string;
  role: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  createdAt: string;
};