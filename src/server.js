require("dotenv").config();
const express = require("express");
const configViewEngine = require("./configs/viewEngine");
const webRoutes = require("./routes/web");
const app = express();
const port = process.env.POST;
const hostname = process.env.HOST_NAME;
const connection = require("./configs/database");

//config request body
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//config view engine
configViewEngine(app);
//khai bao cac routes
app.use("/", webRoutes);

//connect to database
(async () => {
  try {
    await connection();
    app.listen(port, hostname, () => {
      console.log(`Backend app listening on port http://${hostname}:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();
