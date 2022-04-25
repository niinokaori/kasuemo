import { Handler } from "aws-lambda";

export const handler: Handler = (event, context) => {
  console.log(event, context);
};
