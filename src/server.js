require("dotenv").config();
const express = require("express");
const configViewEngine = require("./configs/viewEngine");
const webRoutes = require("./routes/web");
const mysql = require("mysql2");
const app = express();
const port = process.env.POST;
const hostname = process.env.HOST_NAME;
//config view engine
configViewEngine(app);
//khai bao cac routes
app.use("/", webRoutes);
//test connection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});
connection.query("SELECT * FROM Users", function (err, rows, fields) {
  if (err) {
    console.error("Database query error:", err); // Hiển thị lỗi
    return;
  }
  console.log("The solution is: ", rows); // Hiển thị dữ liệu
  console.log("The fields are: ", fields);// Hiển thị thông tin field
});

app.listen(port, hostname, () => {
  console.log(`Example app listening on port http://${hostname}:${port}`);
});
