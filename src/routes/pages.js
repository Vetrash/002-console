import { Router } from "express";
import { stor } from "./books.js";
import fetch from 'node-fetch'; 

const router = Router();
export default router;

router.get("/", (req, res) => {
  const { books } = stor;

  res.render("books/index", {
    title: "books",
    books: books,
  });
});

router.get("/create", (req, res) => {
  res.render("books/create", {
    title: "books | create",
    books: {},
  });
});

router.get("/:id", async (req, res) => {
  const { books } = stor;
  const { id } = req.params;

  await fetch(`http://localhost:3001/api/counter/${id}/incr`,{ method: 'POST' });
  const response = await fetch(`http://localhost:3001/api/counter/${id}`);
  const counter = await response.json();

  const book = findBooks(id, books, res);
  if (!book) return;

  res.render("books/view", {
    title: "books | view",
    books: {...book, counter},
  });
});

router.get("/books/update/:id", (req, res) => {
  const { books } = stor;
  const { id } = req.params;


  const book = findBooks(id, books, res);
  if (!book) return;

  res.render("books/update", {
    title: "books | update",
    books: book,
  });
});

const findBooks = (id, books, res) =>{

    const idx = books.findIndex((el) => el.id === id);

    if (idx === -1) {
      res.redirect("/404");
      return null;
    }
    return books[idx]
}