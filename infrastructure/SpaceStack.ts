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
import { PolicyStatement } from "aws-cdk-lib/aws-iam";

export class SpaceStack extends Stack {
  private api = new RestApi(this, "SpaceApi");
  private spacesTable = new GenericTable("SpacesTable", "spaceId", this);

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const helloLambdaNodejsFunction = new NodejsFunction(
      this,
      "helloLambdaNodejs",
      {
        entry: join(__dirname, "..", "services", "node-lambda", "hello.ts"),
        handler: "handler",
      }
    );

    const s3PolicyStatement = new PolicyStatement();
    s3PolicyStatement.addActions("s3:ListAllMyBuckets");
    s3PolicyStatement.addResources("*");

    helloLambdaNodejsFunction.addToRolePolicy(s3PolicyStatement);

    // api lambda integration
    const helloLambdaIntegration = new LambdaIntegration(
      helloLambdaNodejsFunction
    );
    const helloLambdaResource = this.api.root.addResource("hello");
    helloLambdaResource.addMethod("GET", helloLambdaIntegration);
  }
}
