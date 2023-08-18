const app = require("./server");
const proxy = require("express-http-proxy");
require("dotenv").config();

require("./microservices/auth/routes")(app);

app.listen(8000, () => {
  console.log(`Gateway is listening to 8000`);
});

module.exports = app;
