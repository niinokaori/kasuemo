import { Handler } from "aws-lambda";
import { WebClient } from "@slack/web-api";

export const handler: Handler = (event, context) => {
  console.log(event, context);
  
  // Read a token from the environment variables
  const token = process.env.SLACK_TOKEN;

  // Initialize
  const web = new WebClient(token);
};
