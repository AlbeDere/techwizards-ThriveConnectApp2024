export interface IMatchResult {
  jobSeekerId: string;
  companyId: string;
  score: number;
}

export interface IMatchingState {
  matches: IMatchResult[];
  processedPairs: number;
  errors: string[];
  currentThought: string;
  reasoning: string[];
}
