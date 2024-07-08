import express from "express";
import bodyParser from "body-parser";
import { detectIntent } from "./dialogflow";
import { logError } from "./logger";

const app = express();
const port = process.env.PORT || 6000;

app.use(bodyParser.json());

app.post("/query", async (req, res) => {
  const { query } = req.body;
  try {
    const result = await detectIntent(query);
    res.json(result);
  } catch (error) {
    console.log(error);
    await logError("Error handling query", error);
    res.status(500).json({
      error: "Internal Server Error",
      message:
        "There was an error processing your request. Please try again later.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
