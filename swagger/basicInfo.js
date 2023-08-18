module.exports = {
  openapi: "3.0.3",
  info: {
    title: "Panell API",
    description: "Panell API",
    version: "1.0.0",
  },
  components: {
    securitySchemes: {
      JWT: {
        type: "apiKey",
        name: "x-access-token",
        in: "header",
      },
    },
  },
};
