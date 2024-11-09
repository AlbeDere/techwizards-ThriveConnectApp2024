export interface JobSeeker {
  id: string;
  name: string;
  email: string;
  role: "jobseeker";
  skills: string[];
  position: string;
  experience?: string;
  wellBeingPreferences: string[];
  jobSeekerProfile_summary?: string;
  jobSeekerProfile_embedding: number[];
  matchingList: {
    companyId: string;
    score: number;
  }[];
}
