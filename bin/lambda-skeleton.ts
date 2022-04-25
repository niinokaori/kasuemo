#!/usr/bin/env node

import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { LambdaSkeletonStack } from "../lib/lambda-skeleton-stack";

const app = new cdk.App();
new LambdaSkeletonStack(app, "LambdaSkeletonStack", {});
