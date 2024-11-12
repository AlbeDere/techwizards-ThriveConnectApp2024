import mongoose from "mongoose";
import { httpServer } from ".";
import { MongoClient } from "mongodb";
import { JobMatchingAgent } from "./langchain/agents/matchingAgent/agents";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 3003;
const mongoUrl = process.env.MONGO_DB_URL as string;

if (!mongoUrl) {
  throw new Error("MongoDB URL not found in .env");
}

// MongoDB client to use in matching agent
const client = new MongoClient(mongoUrl);

// Function to start listening for changes in a collection
const startChangeStream = async (collectionName: string) => {
  try {
    const database = client.db("ThriveConnectApp"); // Ensure we are in the correct DB
    const collection = database.collection(collectionName); // Watch the specified collection

    // Start a change stream to watch for insertions of new companies or jobseekers
    const changeStream = collection.watch();

    // Listen to changes and trigger actions based on the event type
    changeStream.on("change", async (change) => {
      // Log only insert operations for clarity and debugging
      if (change.operationType === "insert") {
        console.log(`New document inserted into ${collectionName} collection.`);

        // Optionally log the inserted document for debugging
        // (Be mindful of privacy and data size)
        console.log("Inserted Document: ", change.fullDocument);

        try {
          // Trigger the matching agent whenever a new company or jobseeker is inserted
          const analysis = await JobMatchingAgent.runMatchingAgent(
            client,
            collectionName
          );
          console.log(
            `Matching analysis after new document in ${collectionName}:`,
            analysis
          );
        } catch (error) {
          console.error("Error in matching process:", error);
        }
      }
    });
  } catch (error) {
    console.error(`Error starting change stream for ${collectionName}:`, error);
  }
};

// Connect to MongoDB and start the change stream for both collections
client
  .connect()
  .then(() => {
    // Start watching changes in both the 'companies' and 'jobseekers' collections
    startChangeStream("companies"); // Listen to 'companies' collection
    startChangeStream("jobseekers"); // Listen to 'jobseekers' collection
    console.log(
      "Change streams started to listen for new companies and jobseekers."
    );
  })
  .catch((error) => {
    console.error("Error starting change streams:", error);
  });

// Connect to the MongoDB database for the rest of the app functionality (mongoose)
mongoose
  .connect(mongoUrl, {
    dbName: "ThriveConnectApp", // Ensure mongoose connects to the right database
  })
  .then(() => {
    httpServer.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  });
