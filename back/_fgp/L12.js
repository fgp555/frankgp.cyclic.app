const express = require("express");

const app = express();

app.use(express.json());

app.use((req, res) => {
  throw new Error("error demo");
});

app.get("/", (req, res) => {
  console.log("request");
  res.json({ message: "hello" });
});

app.listen(3000);
console.log("http://localhost:3000");
