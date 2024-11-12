import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";

export const embeddingllm = new GoogleGenerativeAIEmbeddings({
  model: "text-embedding-004",
  apiKey: "AIzaSyDNyEWlJm4SKI571n8mJlnMr_9s8VFpcY4",
});
