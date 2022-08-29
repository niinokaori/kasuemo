import { Handler } from "aws-lambda";
import { WebClient } from "@slack/web-api";
// Create service client module using ES6 syntax.
import { S3Client,PutObjectCommand,GetObjectCommand } from "@aws-sdk/client-s3";
import consumers from 'stream/consumers'
// Set the AWS Region.
const REGION = "ap-northeast-1"; //e.g. "us-east-1"
// Create an Amazon S3 service client object.
const s3Client = new S3Client({ region: REGION });

export const handler: Handler = async (event, context) => {
  console.log(event, context);
    
  const oldEmojiList = Object.keys(removeAlias(await getOldEmojiList()));
  const latestEmojiList = Object.keys(removeAlias(await getLatestEmojiList()));
  const addedEmoji = latestEmojiList.filter(x => !oldEmojiList.includes(x));
  const removedEmoji = oldEmojiList.filter(x => !latestEmojiList.includes(x)).length;
  const allEmoji = latestEmojiList.length;
  console.log(addedEmoji);
  console.log(removedEmoji);
  console.log(allEmoji)
};

async function getOldEmojiList() {
  const command = new GetObjectCommand({ Bucket: "kasuemo", Key: "EmojiList" });
  const response = await s3Client.send(command);
  if (!response.Body) { throw new Error("Empty Object"); }
  // @ts-ignore
  const objectText = await consumers.text(response.Body);
  const oldEmojiList = JSON.parse(objectText);
  return oldEmojiList;
}

function removeAlias(oldEmojiList: any) {
  return Object.keys(oldEmojiList.emoji).reduce<{ [key: string]: string; }>((emojiList, current) => {
    if (oldEmojiList.emoji[current].startsWith('http')) {
      emojiList[current] = oldEmojiList.emoji[current];
    }
    return emojiList;
  }, {});
}

async function upload (emoji:Array<string>){
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
}

async function getLatestEmojiList() {
  const token = process.env.SLACK_TOKEN;
  const web = new WebClient(token);
  const emoji = await web.emoji.list();
  return emoji;
}
