import express from "express";

const app = express();

app.listen(3000, () => {
  console.log("App is listening");
});

app.get("/", (req, res) => {
  res.send("<h1>Hello</h1>");
});
