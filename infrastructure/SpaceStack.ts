import { join } from "path";

import { Stack, StackProps } from "aws-cdk-lib";
import { Construct, Node } from "constructs";
import {
  Code,
  Function as LambdaFunction,
  Runtime,
} from "aws-cdk-lib/aws-lambda";
import { LambdaIntegration, RestApi } from "aws-cdk-lib/aws-apigateway";
import { GenericTable } from "./GenericTable";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
export class SpaceStack extends Stack {
  private api = new RestApi(this, "SpaceApi");
  private spacesTable = new GenericTable("SpacesTable", "spaceId", this);

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

    const helloLambdaNodejsFunction = new NodejsFunction(
      this,
      "helloLambdaNodejs",
      {
        entry: join(__dirname, "..", "services", "node-lambda", "hello.ts"),
        handler: "handler",
      }
    );

    const helloLambdaIntegration = new LambdaIntegration(helloLambdaFunction);
    const helloLambdaResource = this.api.root.addResource("hello");
    helloLambdaResource.addMethod("GET", helloLambdaIntegration);
  }
}
