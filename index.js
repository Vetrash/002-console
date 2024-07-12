#!/usr/bin/env node

import express from "express";
import booksRouter from "./src/routes/books.js";
import userRouter from "./src/routes/user.js";

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);
app.use("/api/books", booksRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`приложение запущено на http://localhost:${PORT}`);
});
