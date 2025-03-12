const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = [{
  id: 1,
  title: "Omniscient Reader's Viewpoint",
  description: "Greatest novel book."
}];

app.get("/books", (_req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found." });
  res.json(book);
});