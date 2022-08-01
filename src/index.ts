import { Handler } from "aws-lambda";
import { WebClient } from "@slack/web-api";
// Create service client module using ES6 syntax.
import { S3Client,PutObjectCommand } from "@aws-sdk/client-s3";
// Set the AWS Region.
const REGION = "ap-northeast-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });


export const handler: Handler = async (event, context) => {
  console.log(event, context);
  
  // Read a token from the environment variables
  const token = process.env.SLACK_TOKEN;
  
  // Initialize
  const web = new WebClient(token);
  const emoji = await web.emoji.list();
  console.log(Object.values(emoji.emoji!).filter(emoji => emoji.startsWith("alias:")).length);
  // Set the parameters.
  const bucketParams = {
   Bucket: "kasuemo",
   // Specify the name of the new object. For example, 'index.html'.
   // To create a directory for the object, use '/'. For example, 'myApp/package.json'.
   Key: "EmojiList",
   // Content of the new object.
   Body: JSON.stringify(emoji),
  };
  try {
    const data = await s3Client.send(new PutObjectCommand(bucketParams));
    console.log(
      "Successfully uploaded object: " +
        bucketParams.Bucket +
        "/" +
        bucketParams.Key
    );
  } catch (err) {
    console.log("Error", err);
  }
};
