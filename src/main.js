const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = []

app.get("/books", (_req, res) => {
  res.json(books);
});
