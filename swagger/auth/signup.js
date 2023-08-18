module.exports = {
  post: {
    tags: ["Auth"],
    description: "Singup API",
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
              name: {
                type: "string",
                example: "Umar",
              },
              password: {
                type: "string",
                example: "03001234567",
              },
              username: {
                type: "string",
                example: "03001234567",
              },
              mobile: {
                type: "string",
                example: "03001234567",
              },
              email: {
                type: "string",
                example: "umar@gmail.com",
              },
              referralCode: {
                type: "string",
                example: "Kch b",
              },
            },
          },
        },
      },
    },
    responses: {
      200: {
        description: "Signup api accessed",
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
