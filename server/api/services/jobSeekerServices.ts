import bcrypt from "bcrypt";
import { JobSeekerModel } from "../models/jobSeekerModel";
import { IJobSeeker } from "../interfaces/IJobSeeker";
import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from "../errors/ApiError";
import { createJobSeekerProfileSummary } from "../langchain/summaries/summarizeJobseeker";
import { embeddingllm } from "../langchain/llms";

export const createJobSeeker = async (
  jobSeekerData: Partial<IJobSeeker>
): Promise<IJobSeeker> => {
  const {
    name,
    email,
    password,
    skills,
    position,
    experience,
    wellBeingPreferences,
  } = jobSeekerData;

  if (
    !name ||
    !email ||
    !password ||
    !skills ||
    !position ||
    !experience ||
    !wellBeingPreferences
  ) {
    throw new BadRequestError("Missing required fields");
  }

  const existingJobSeeker = await JobSeekerModel.findOne({ email });

  if (existingJobSeeker) {
    throw new BadRequestError("Email already exists");
  }

  try {
    const jobSeekerProfileSummary = await createJobSeekerProfileSummary(
      jobSeekerData
    );

    const jobSeekerProfileEmbeddings = await embeddingllm.embedQuery(
      jobSeekerProfileSummary
    );

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Job Seeker
    const newJobSeeker = new JobSeekerModel({
      name,
      email,
      password: hashedPassword,
      skills,
      position,
      experience,
      wellBeingPreferences,
      jobSeekerProfile_summary: jobSeekerProfileSummary,
      jobSeekerProfile_embedding: jobSeekerProfileEmbeddings,
      role: "jobseeker",
    });

    return await newJobSeeker.save();
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

// Get All Job Seekers
export const getAllJobSeekers = async (): Promise<IJobSeeker[]> => {
  try {
    return await JobSeekerModel.find({});
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

// Get Job Seeker by ID
export const getJobSeekerById = async (id: string): Promise<IJobSeeker> => {
  try {
    const jobSeeker = await JobSeekerModel.findById(id);
    if (!jobSeeker) {
      throw new NotFoundError("Job Seeker not found");
    }
    return jobSeeker;
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

// Update Job Seeker by ID
export const updateJobSeekerById = async (
  id: string,
  updatedJobSeekerData: Partial<IJobSeeker>
): Promise<IJobSeeker | null> => {
  try {
    const jobSeeker = await JobSeekerModel.findById(id);
    if (!jobSeeker) {
      throw new NotFoundError("Job Seeker not found");
    }

    const {
      name,
      email,
      password,
      skills,
      position,
      experience,
      wellBeingPreferences,
    } = updatedJobSeekerData;

    if (
      !name ||
      !email ||
      !skills ||
      !position ||
      !experience ||
      !wellBeingPreferences
    ) {
      throw new BadRequestError("Missing required fields");
    }

    const jobSeekerProfileSummary = await createJobSeekerProfileSummary(
      updatedJobSeekerData
    );

    const jobSeekerProfileEmbeddings = await embeddingllm.embedQuery(
      jobSeekerProfileSummary
    );

    jobSeeker.name = name;
    jobSeeker.email = email;
    if (password) {
      jobSeeker.password = await bcrypt.hash(password, 10);
    }
    jobSeeker.skills = skills;
    jobSeeker.position = position;
    jobSeeker.experience = experience;
    jobSeeker.wellBeingPreferences = wellBeingPreferences;
    jobSeeker.jobSeekerProfile_summary = jobSeekerProfileSummary;
    jobSeeker.jobSeekerProfile_embedding = jobSeekerProfileEmbeddings;

    return await jobSeeker.save();
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};

// Delete Job Seeker by ID
export const deleteJobSeekerById = async (id: string): Promise<void> => {
  try {
    const jobSeeker = await JobSeekerModel.findByIdAndDelete(id);
    if (!jobSeeker) {
      throw new NotFoundError("Job Seeker not found");
    }
  } catch (error: any) {
    throw new InternalServerError(error.message);
  }
};
