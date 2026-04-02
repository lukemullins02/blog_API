import "dotenv/config";
import cors from "cors";
const express = require("express");
const app = express();
import routes from "./routes/index.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/", routes.user);
app.use("/posts", routes.post);
app.use("/posts", routes.comment);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);
