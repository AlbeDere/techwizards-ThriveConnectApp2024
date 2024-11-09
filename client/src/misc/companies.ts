export interface Company {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: "company";
  companyCulture: string;
  wellBeingMetrics: string;
  jobTitle: string;
  skillsRequired: string[];
  experienceRequired: string;
  companyProfile_summary?: string;
  companyProfile_embedding: number[];
  matchingList: {
    jobSeekerId: string;
    score: number;
  }[];
  feedback: string[];
}
