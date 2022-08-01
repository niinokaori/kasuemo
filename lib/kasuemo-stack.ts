import * as path from "path";

import { Stack, StackProps } from "aws-cdk-lib";
import { Construct, ConstructOrder } from "constructs";
import * as Lambda from "aws-cdk-lib/aws-lambda";
import * as S3 from "aws-cdk-lib/aws-s3";

export class LambdaSkeletonStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new Lambda.Function(this, "index", {
      runtime: Lambda.Runtime.NODEJS_14_X,
      code: Lambda.Code.fromAsset(path.join(__dirname, "../src")),
      handler: "index.handler",
    });
    const s3 = new S3.Bucket(this, "kasuemo",{
      bucketName: `kasuemo`,
    })
      s3.grantReadWrite(lambda)
      
  }
}
