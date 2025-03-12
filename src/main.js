const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let books = [{
  id: 1,
  title: "Omniscient Reader's Viewpoint",
  author: "sing N song",
  genre: "action",
  borrowed: false
}];

// Get all the books
app.get("/books", (_req, res) => {
  res.json(books);
});

// Get specific book by its id; return error status if the books is not found
app.get("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found." });
  res.json(book);
});

// Post a new book; checks that the request fulfills the requirements
app.post("/books", (req, res) => {
  const {title, author, genre} = req.body;
  if (!title) return res.status(400).json({ error: "Title is required." });
  if (!author) return res.status(400).json({ error: "Author is required." });
  if (!genre) return res.status(400).json({ error: "Genre is required." });

  const newBook = {
    id: books.length + 1,
    title,
    author,
    genre,
    borrowed: false
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

// Update a book's information; if any field is not given, the old value is kept
app.put("/books/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found." });

  const {title, author, genre} = req.body;

  book.title = title || book.title;
  book.author = author || book.author;
  book.genre = genre || book.genre;
  res.status(200).json(newBook);
});

// Set the book as borrowed or returned
app.patch("/books/:id/borrow", (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((b) => b.id === id);
  if (!book) return res.status(404).json({ error: "Book not found." });

  book.borrowed = !book.borrowed;
  res.status(200).json({ message: (book.borrowed) ? "Book borrowed." : "Book returned", book});
});
