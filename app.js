import "dotenv/config";
import cors from "cors";
const express = require("express");
const app = express();
import routes from "./routes";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/users", routes.user);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
