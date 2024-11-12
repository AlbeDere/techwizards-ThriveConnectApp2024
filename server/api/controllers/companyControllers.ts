import { Request, Response, NextFunction } from "express";
import {
  createCompany,
  deleteCompanyById,
  fetchAllCompanies,
  getCompanyById,
  updateCompanyProfile,
} from "../services/companyServices";

// Controller to create a company
export const createCompanyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const company = await createCompany(req.body);
    res.status(201).json(company);
  } catch (error) {
    next(error);
  }
};

// Controller to get a company by ID
export const getCompanyByIdHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const company = await getCompanyById(req.params.id);
    res.status(200).json(company);
  } catch (error) {
    next(error);
  }
};

// Controller to update a company's profile
export const updateCompanyProfileHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const updatedCompany = await updateCompanyProfile(req.params.id, req.body);
    res.status(200).json(updatedCompany);
  } catch (error) {
    next(error);
  }
};

// Controller to delete a company by ID
export const deleteCompanyHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const deletedCompany = await deleteCompanyById(req.params.id);
    res.status(200).json(deletedCompany);
  } catch (error) {
    next(error);
  }
};

// Controller to fetch all companies
export const getAllCompanies = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const companies = await fetchAllCompanies();
    res.status(200).json(companies);
  } catch (error) {
    next(error);
  }
};
