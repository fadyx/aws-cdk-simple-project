import { join } from "path";

import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";

export class SpaceStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLambdaFunction = new LambdaFunction(
      this,
      "helloLambdaFunction",
      {
        runtime: Runtime.NODEJS_14_X,
        code: Code.fromAsset(join(__dirname, "..", "services", "hello")),
        handler: "hello.handler",
      }
    );
  }
}
