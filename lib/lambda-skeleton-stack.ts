import * as path from "path";

import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as Lambda from "aws-cdk-lib/aws-lambda";

export class LambdaSkeletonStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambda = new Lambda.Function(this, "sample", {
      runtime: Lambda.Runtime.NODEJS_14_X,
      code: Lambda.Code.fromAsset(path.join(__dirname, "../src")),
      handler: "sample.handler",
    });
  }
}
