import { config } from "dotenv";
import { ChatGroq } from "@langchain/groq";
import { AIMessage, HumanMessage } from "@langchain/core/messages";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "@langchain/core/prompts";
import { MongoClient, ObjectId } from "mongodb";
import { IMatchingState, IMatchResult } from "./matchingTypes";
import { IJobSeeker } from "../../../interfaces/IJobSeeker";
import { ICompany } from "../../../interfaces/ICompany";
import { SYSTEM_TEMPLATE } from "../../prompts/prompts";

config();

class JobMatchingAgent {
  private static async cosineSimilarity(
    vectorA: number[],
    vectorB: number[]
  ): Promise<number> {
    if (vectorA.length !== vectorB.length) {
      throw new Error("Vectors must have the same length");
    }

    const dotProduct = vectorA.reduce(
      (acc, val, i) => acc + val * vectorB[i],
      0
    );
    const magnitudeA = Math.sqrt(
      vectorA.reduce((acc, val) => acc + val * val, 0)
    );
    const magnitudeB = Math.sqrt(
      vectorB.reduce((acc, val) => acc + val * val, 0)
    );

    return (dotProduct / (magnitudeA * magnitudeB) + 1) * 50;
  }

  private static async processMatches(
    client: MongoClient,
    jobSeeker: IJobSeeker,
    company: ICompany
  ): Promise<IMatchResult | null> {
    try {
      const matchingScore = await this.cosineSimilarity(
        jobSeeker.jobSeekerProfile_embedding.map(Number),
        company.companyProfile_embedding.map(Number)
      );

      // Only proceed if matching score is above 80
      if (matchingScore > 80) {
        const db = client.db("ThriveConnectApp");

        // Update JobSeeker's matchingList with companyId and score
        await db.collection("jobseekers").updateOne(
          { _id: jobSeeker._id as ObjectId },
          {
            $addToSet: {
              matchingList: {
                companyId: company._id,
                score: matchingScore,
              },
            },
          }
        );

        // Update Company's matchingList with jobSeekerId and score
        await db.collection("companies").updateOne(
          { _id: company._id as ObjectId },
          {
            $addToSet: {
              matchingList: {
                jobSeekerId: jobSeeker._id,
                score: matchingScore,
              },
            },
          }
        );
      }

      return {
        jobSeekerId: (jobSeeker._id as ObjectId).toString(),
        companyId: (company._id as ObjectId).toString(),
        score: matchingScore,
      };
    } catch (error) {
      console.error("Error processing match:", error);
      return null;
    }
  }

  private static logStep(step: string, content: string) {
    console.log(`\n=== ${step.toUpperCase()} ===`);
    console.log(content.trim());
  }

  private static async generateAnalysis(
    state: IMatchingState
  ): Promise<string> {
    const model = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY as string,
      modelName: "mixtral-8x7b-32768",
    });

    const prompt = ChatPromptTemplate.fromMessages([
      ["system", SYSTEM_TEMPLATE],
      new MessagesPlaceholder("messages"),
    ]);

    const highMatches = state.matches.filter((m) => m.score > 80).length;
    const avgScore =
      state.matches.length > 0
        ? state.matches.reduce((acc, m) => acc + m.score, 0) /
          state.matches.length
        : 0;

    const message = new HumanMessage(`
      Matching Results:
      - Total pairs processed: ${state.processedPairs}
      - Successful matches (>80% compatibility): ${highMatches}
      - Average matching score: ${avgScore.toFixed(2)}%
      - Errors encountered: ${state.errors.length}
    `);

    const formattedPrompt = await prompt.formatMessages({
      time: new Date().toISOString(),
      messages: [message],
    });

    const result = await model.invoke(formattedPrompt);
    const content = result.content as string;

    // Extract and log reasoning steps
    const parts = content.split("===");
    const reasoning = parts[0].trim();
    const finalResponse = parts[1]?.trim() || reasoning;

    const thoughtMatch = reasoning.match(/THOUGHT: (.*?)(?=ACTION:|$)/s);
    const actionMatch = reasoning.match(/ACTION: (.*?)(?=REFLECTION:|$)/s);
    const reflectionMatch = reasoning.match(/REFLECTION: (.*?)(?=(\n===|$))/s);

    if (thoughtMatch?.[1]) this.logStep("Thought", thoughtMatch[1]);
    if (actionMatch?.[1]) this.logStep("Action", actionMatch[1]);
    if (reflectionMatch?.[1]) this.logStep("Reflection", reflectionMatch[1]);

    return finalResponse;
  }

  public static async runMatchingAgent(
    client: MongoClient,
    threadId: string
  ): Promise<string> {
    console.log("🤖 Starting matching agent with thread ID:", threadId);

    const state: IMatchingState = {
      matches: [],
      processedPairs: 0,
      errors: [],
      currentThought: "",
      reasoning: [],
    };

    try {
      const db = client.db("ThriveConnectApp");

      // Fetch profiles
      const [jobSeekers, companies] = await Promise.all([
        db
          .collection<IJobSeeker>("jobseekers")
          .find({ jobSeekerProfile_embedding: { $exists: true, $ne: [] } })
          .toArray(),
        db
          .collection<ICompany>("companies")
          .find({ companyProfile_embedding: { $exists: true, $ne: [] } })
          .toArray(),
      ]);

      // Process matches
      const matchPromises = jobSeekers.flatMap((jobSeeker) =>
        companies.map((company) =>
          this.processMatches(client, jobSeeker, company)
        )
      );

      const matches = (await Promise.all(matchPromises)).filter(
        (match): match is IMatchResult => match !== null
      );

      state.matches = matches;
      state.processedPairs = matches.length;

      // Generate analysis
      const analysis = await this.generateAnalysis(state);
      return analysis;
    } catch (error) {
      console.error("Error in matching agent:", error);
      return "An error occurred during the matching process. Please check the logs for details.";
    }
  }
}

export { JobMatchingAgent };
