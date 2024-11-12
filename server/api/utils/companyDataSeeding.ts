/*
import {
    ChatGoogleGenerativeAI,
    GoogleGenerativeAIEmbeddings,
  } from "@langchain/google-genai";
  import { StructuredOutputParser } from "@langchain/core/output_parsers";
  import { MongoClient } from "mongodb";
  import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
  import mongoose from "mongoose";
  import { z } from "zod";
  import { createCompanyValueSummary } from "../langchain/summaries/summarizeCompany";
  import "dotenv/config";
  import { connectMongoose, MONGO_DB_URL } from "./connectMongoose";
  import { ICompany } from "../interfaces/ICompany";
  
const client = new MongoClient(MONGO_DB_URL);

const llm = new ChatGoogleGenerativeAI({
  model: "gemini-1.5-pro-latest",
  apiKey: process.env.GOOGLE_API_KEY as string,
  temperature: 0.7,
});

// Define the schema for direct LLM output parsing
const CompanySchema = z.object({
  name: z.string(),
  companyCulture: z.string(),
  wellBeingMetrics: z.string(),
});
*/