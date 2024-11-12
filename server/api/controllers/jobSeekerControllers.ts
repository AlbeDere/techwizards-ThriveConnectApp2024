import { Request, Response, NextFunction } from "express";
import {
  createJobSeeker,
  getAllJobSeekers,
  getJobSeekerById,
  updateJobSeekerById,
  deleteJobSeekerById,
} from "../services/jobSeekerServices";

// Create Job Seeker
export const createJobSeekerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobSeeker = await createJobSeeker(req.body);
    res.status(201).json(jobSeeker);
  } catch (error) {
    next(error);
  }
};

export const getAllJobSeekersController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobSeekers = await getAllJobSeekers();
    res.status(200).json(jobSeekers);
  } catch (error) {
    next(error);
  }
};

export const getJobSeekerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobSeeker = await getJobSeekerById(req.params.id);
    res.status(200).json(jobSeeker);
  } catch (error) {
    next(error);
  }
};

export const updateJobSeekerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const jobSeeker = await updateJobSeekerById(req.params.id, req.body);
    res.status(200).json(jobSeeker);
  } catch (error) {
    next(error);
  }
};

export const deleteJobSeekerByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await deleteJobSeekerById(req.params.id);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
