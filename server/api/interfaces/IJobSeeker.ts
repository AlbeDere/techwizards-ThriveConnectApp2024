import { Document } from "mongoose";
import { ICompany } from "./ICompany";

export interface IJobSeeker extends Document {
  name: string;
  email: string;
  password: string;
  role: string;
  skills: string[];
  position: string;
  experience: string;
  wellBeingPreferences: string[];
  jobSeekerProfile_summary?: string;
  jobSeekerProfile_embedding: Number[];
  // Array of matched company IDs
  matchingList: Array<{ companyId: ICompany["_id"]; score: number }>;
}
