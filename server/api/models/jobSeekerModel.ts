import mongoose, { Schema } from "mongoose";
import { IJobSeeker } from "../interfaces/IJobSeeker";

const jobSeekerSchema = new Schema<IJobSeeker>({
  name: {
    type: String,
    required: [true, "Name is required"],
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
    default: "jobseeker",
    enum: {
      values: ["jobseeker"],
      message: "{VALUE} is not a valid role",
    },
  },
  skills: {
    type: [String],
    required: [true, "Skills are required"],
    validate: {
      validator: function (skills: string[]) {
        return skills.length > 0;
      },
      message: "At least one skill must be provided",
    },
  },
  position: {
    type: String,
    required: [true, "Position is required"],
    minlength: [2, "Position must be at least 2 characters long"],
    maxlength: [100, "Position cannot exceed 100 characters"],
    trim: true,
  },
  experience: {
    type: String,
  },
  wellBeingPreferences: {
    type: [String],
    required: [true, "Well-being preferences are required"],
    validate: {
      validator: function (preferences: string[]) {
        return preferences.length > 0;
      },
      message: "At least one well-being preference must be provided",
    },
  },
  jobSeekerProfile_summary: {
    type: String,
  },
  jobSeekerProfile_embedding: {
    type: [Number],
    default: [],
    validate: {
      validator: function (embedding: number[]) {
        return (
          embedding.length === 0 ||
          embedding.every((num) => typeof num === "number")
        );
      },
      message: "Jobseeker profile embedding must be an array of numbers",
    },
  },
  matchingList: {
    type: [
      {
        companyId: { type: Schema.Types.ObjectId, ref: "Company" },
        score: { type: Number, required: true },
      },
    ],
    default: [],
  },
});

// JSON serialization for jobSeekerSchema
jobSeekerSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

export const JobSeekerModel = mongoose.model<IJobSeeker>(
  "JobSeeker",
  jobSeekerSchema
);
