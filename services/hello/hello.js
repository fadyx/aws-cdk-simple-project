exports.handler = async (event, context) => {
  const response = {
    statusCode: 200,
    body: "Hello from Lambda!",
  };

  return response;
};
