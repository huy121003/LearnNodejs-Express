require("dotenv").config();
const express = require("express");
const configViewEngine = require("./configs/viewEngine");
const webRoutes = require("./routes/web");

const app = express();
const port = process.env.POST;
const hostname = process.env.HOST_NAME;
//config view engine
configViewEngine(app);
//khai bao cac routes
app.use("/", webRoutes);

app.listen(port, hostname, () => {
  console.log(`Example app listening on port http://${hostname}:${port}`);
});
