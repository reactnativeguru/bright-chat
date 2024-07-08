const dialogflow = require("@google-cloud/dialogflow").v2;
import * as dotenv from "dotenv";
import { logError } from "./logger";

dotenv.config();

// Instantiate a DialogFlow client.
const sessionClient = new dialogflow.SessionsClient();
const projectId = process.env.PROJECT_ID;

export const detectIntent = async (query: string) => {
  const sessionId = Math.random().toString(36).substring(7);
  console.log(`projectId: ${projectId}`);
  console.log(`sessionId: ${sessionId}`);
  // Define session path
  const sessionPath = sessionClient.projectAgentSessionPath(
    projectId,
    sessionId
  );

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: query,
        languageCode: "en-GB",
      },
    },
    queryParams: {
      sentimentAnalysisRequestConfig: {
        analyzeQueryTextSentiment: true,
      },
    },
  };

  try {
    // Send request and log result
    const responses = await sessionClient.detectIntent(request);
    console.log("Detected intent");
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    if (result.intent) {
      console.log(`  Intent: ${result.intent.displayName}`);
    } else {
      console.log("  No intent matched.");
    }
    if (result.sentimentAnalysisResult) {
      console.log("Detected sentiment");
      console.log(
        `  Score: ${result.sentimentAnalysisResult.queryTextSentiment.score}`
      );
      console.log(
        `  Magnitude: ${result.sentimentAnalysisResult.queryTextSentiment.magnitude}`
      );
    } else {
      console.log("No sentiment Analysis Found");
    }
    return result;
  } catch (error) {
    await logError("Failed to detect intent", error);
    throw new Error("Dialogflow request failed");
  }
};
