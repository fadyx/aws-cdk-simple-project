# Commands

# initializes cdk app

cdk init app --language typescript

# Synthesizes and prints the CloudFormation template for the specified stack(s)

cdk synth

# Deploys the CDK Toolkit staging stack

cdk bootstrap

# Deploys the specified stack

cdk deploy

# to deploy all stacks

cdk deploy --all

# to deploy with parameters

cdk deploy --parameters paramName=value

# Bundling

The main different options to bundle Lambda functions:

1. Webpack
2. Amazon Lambda Node.js library
