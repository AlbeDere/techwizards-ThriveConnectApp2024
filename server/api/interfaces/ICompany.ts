import { Document } from "mongoose";
import { IJobSeeker } from "./IJobSeeker";
import { IFeedback } from "./IFeedback";

export interface ICompany extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  companyCulture: string;
  wellBeingMetrics: string;
  jobTitle: string;
  skillsRequired: string[];
  experienceRequired: string;
  companyProfile_summary: string;
  companyProfile_embedding: Number[];
  // Array of matched job seeker IDs
  matchingList: Array<{ jobSeekerId: IJobSeeker["_id"]; score: number }>;
  feedback: IFeedback["_id"][];
}
