const express = require("express");
const app = express();

//
const port = 3030;

//
const api_router = require("./api");

app.use("/api", api_router);

app.listen(port, () => {
  console.log(`express server running at http://127.0.0.1:${port}`, "\n");
});
