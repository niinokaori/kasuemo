import { Handler } from "aws-lambda";
import { WebClient } from "@slack/web-api";

export const handler: Handler = async (event, context) => {
  console.log(event, context);
  
  // Read a token from the environment variables
  const token = process.env.SLACK_TOKEN;
  
  // Initialize
  const web = new WebClient(token);
  const emoji = await web.emoji.list();
  console.log(Object.values(emoji.emoji!).filter(emoji => emoji.startsWith("alias:")).length);
};
