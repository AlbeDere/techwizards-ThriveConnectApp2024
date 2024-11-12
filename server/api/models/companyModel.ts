import mongoose, { Schema } from "mongoose";
import { ICompany } from "../interfaces/ICompany";

const companySchema = new Schema<ICompany>({
  name: {
    type: String,
    required: [true, "Company name is required"],
    minlength: [2, "Company name must be at least 2 characters long"],
    maxlength: [100, "Company name cannot exceed 100 characters"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
    trim: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    default: "company",
    enum: {
      values: ["company"],
      message: "{VALUE} is not a valid role",
    },
  },
  companyCulture: {
    type: String,
    required: [true, "Company culture is required"],
  },
  wellBeingMetrics: {
    type: String,
    required: [true, "Well-being metrics are required"],
  },
  jobTitle: {
    type: String,
    required: [true, "Job title is required"],
  },
  skillsRequired: {
    type: [String],
    validate: {
      validator: function (skills: string[]) {
        return skills.length > 0;
      },
      message: "At least one skill must be provided",
    },
    required: [true, "Skills are required"],
  },
  experienceRequired: {
    type: String,
    required: [true, "Experience is required"],
  },
  companyProfile_summary: {
    type: String,
  },
  companyProfile_embedding: {
    type: [Number],
    default: [],
    validate: {
      validator: function (embedding: number[]) {
        return (
          embedding.length === 0 ||
          embedding.every((num) => typeof num === "number")
        );
      },
      message: "Company profile embedding must be an array of numbers",
    },
  },
  matchingList: {
    type: [
      {
        jobSeekerId: { type: Schema.Types.ObjectId, ref: "JobSeeker" },
        score: { type: Number, required: true },
      },
    ],
    default: [],
  },
  feedback: {
    type: [
      {
        type: Schema.Types.ObjectId,
        ref: "Feedback",
      },
    ],
    default: [],
  },
});

// JSON serialization for companySchema
companySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const CompanyModel = mongoose.model<ICompany>("Company", companySchema);
