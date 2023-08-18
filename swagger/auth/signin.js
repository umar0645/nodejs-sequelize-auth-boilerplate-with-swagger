module.exports = {
  post: {
    tags: ["Auth"],
    description: "Singin API",
    parameters: [],
    security: {},
    requestBody: {
      description: "Data to be passed for signup",
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              email: {
                type: "string",
                example: "umar@gmail.com",
              },
              password: {
                type: "string",
                example: "12345678",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Signin api accessed",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                id: {
                  type: "number",
                  description: "User ID",
                  example: 1,
                },
                name: {
                  type: "string",
                  description: "User name",
                  example: "John Doe",
                },
                mobile: {
                  type: "string",
                  description: "User mobile",
                  example: "03001234567",
                },
                accessToken: {
                  type: "string",
                  description: "JWT token to be return by hitting API's",
                  example: "eyJhbGciOiJIUzI1NiIsI",
                },
              },
            },
          },
        },
      },
    },
  },
};
