export type Application = {
  id: number;
  company: string;
  role: string;
  status: "Applied" | "Interview" | "Offer" | "Rejected";
  resumeId?: number;
  createdAt: string;
};