import bcrypt from "bcryptjs";
import { ICompany } from "../interfaces/ICompany";
import {
  ApiError,
  BadRequestError,
  InternalServerError,
  NotFoundError,
} from "../errors/ApiError";
import { CompanyModel } from "../models/companyModel";
import { embeddingllm } from "../langchain/llms";
import { createCompanyProfileSummary } from "../langchain/summaries/summarizeCompany";

// Service to create a company
export const createCompany = async (
  companyData: Partial<ICompany>
): Promise<ICompany> => {
  const {
    name,
    email,
    password,
    companyCulture,
    wellBeingMetrics,
    jobTitle,
    skillsRequired,
    experienceRequired,
  } = companyData;

  if (
    !name ||
    !email ||
    !password ||
    !companyCulture ||
    !wellBeingMetrics ||
    !jobTitle ||
    !skillsRequired ||
    !experienceRequired
  ) {
    throw new BadRequestError("Missing required fields");
  }

  const existingCompany = await CompanyModel.findOne({ email });
  if (existingCompany) {
    throw new BadRequestError("Email already in use");
  }

  try {
    const companyProfileSummary = await createCompanyProfileSummary(
      companyData
    );
    const companyProfileEmbeddings = await embeddingllm.embedQuery(
      companyProfileSummary
    );

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new company
    const newCompany = new CompanyModel({
      name,
      email,
      password: hashedPassword,
      companyCulture,
      wellBeingMetrics,
      jobTitle,
      skillsRequired,
      experienceRequired,
      companyProfile_summary: companyProfileSummary,
      companyProfile_embedding: companyProfileEmbeddings,
      role: "company",
    });

    return await newCompany.save();
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError(error.message);
  }
};

// Service to get a company by ID
export const getCompanyById = async (id: string): Promise<ICompany | null> => {
  try {
    const company = await CompanyModel.findById(id);
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    return company;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError("Failed to retrieve company");
  }
};

// Service to update a company's profile
export const updateCompanyProfile = async (
  id: string,
  updatedCompanyData: Partial<ICompany>
): Promise<ICompany | null> => {
  try {
    const company = await CompanyModel.findById(id);
    if (!company) {
      throw new NotFoundError("Company not found");
    }

    const {
      name,
      email,
      password,
      companyCulture,
      wellBeingMetrics,
      jobTitle,
      skillsRequired,
      experienceRequired,
    } = updatedCompanyData;

    if (
      !name ||
      !email ||
      !companyCulture ||
      !wellBeingMetrics ||
      !jobTitle ||
      !skillsRequired ||
      !experienceRequired
    ) {
      throw new BadRequestError("Missing required fields");
    }

    const companyProfileSummary = await createCompanyProfileSummary(
      updatedCompanyData
    );
    const companyProfileEmbeddings = await embeddingllm.embedQuery(
      companyProfileSummary
    );

    company.name = name;
    company.email = email;
    company.companyCulture = companyCulture;
    company.wellBeingMetrics = wellBeingMetrics;
    company.jobTitle = jobTitle;
    company.skillsRequired = skillsRequired;
    company.experienceRequired = experienceRequired;
    company.companyProfile_summary = companyProfileSummary;
    company.companyProfile_embedding = companyProfileEmbeddings;

    if (password) {
      company.password = await bcrypt.hash(password, 10);
    }

    return await company.save();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError("Failed to update company profile");
  }
};

// Service to delete a company by ID
export const deleteCompanyById = async (
  id: string
): Promise<ICompany | null> => {
  try {
    const company = await CompanyModel.findByIdAndDelete(id);
    if (!company) {
      throw new NotFoundError("Company not found");
    }
    return company;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError(error.message);
  }
};

// Service to fetch all companies with pagination
export const fetchAllCompanies = async (): Promise<ICompany[]> => {
  try {
    const companies = await CompanyModel.find();
    return companies;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new InternalServerError(error.message);
  }
};
