import { Document } from "mongoose";
import { ICompany } from "./ICompany";

export interface IFeedback extends Document {
  companyId: ICompany["_id"];
  feedbackText: string;
  sentimentScore: number;
}
