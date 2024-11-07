import { Document } from "mongoose";

export interface IJobSeeker extends Document {
  name: string;
  skills: string[];
  position: string;
  experience: string;
  wellBeingPreferences: string[];
  skills_summary: string;
  wellBeingPreferences_summary: string;
  skills_embedding: Number[];
  wellBeingPreferences_embedding: Number[];
}
