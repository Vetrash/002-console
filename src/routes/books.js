import  { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import fileMulter from "../middleware/file.js";
import fs from "fs";
import path from "path";

class Book {
  constructor(
    title = "",
    description = "",
    id = uuid(),
    authors = "",
    favorite = "",
    fileCover = "",
    fileName = "",
    fileBook = ""
  ) {
    (this.id = id),
      (this.title = title),
      (this.description = description),
      (this.authors = authors),
      (this.favorite = favorite),
      (this.fileCover = fileCover),
      (this.fileName = fileName);
    this.fileBook = fileBook;
  }
}

export const stor = {
  books: [],
};


const router = Router();
export default router;



router.get("/", (req, res) => {
  const { books } = stor;
  res.json(books);
});


const upload = fileMulter.fields([
  { name: 'fileBook', maxCount: 1 },
  { name: 'fileCover', maxCount: 1 }
]);


router.post("/create", upload, (req, res) => {
  const { books } = stor;
  const { title, description, authors, favorite, fileName } =
    req.body;

 


    if (!req.files.fileBook || !req.files.fileCover) {
     // return res.status(400).json({ message: "Не удалось загрузить файлы" });
    }
  
    // Получаем пути к загруженным файлам
    const fileBook = req.files.fileBook ? req.files.fileBook[0].path : "" ; // Путь к файлу книги
    const fileCover = req.files.fileCover ? req.files.fileCover[0].path : ''; // Путь к файлу обложки


    console.log(req.files.fileBook)


  //const fileBook = req.file ? req.file.path : "";

  const id = uuidv4();

  const newBook = new Book(
    title,
    description,
    id,
    authors,
    favorite,
    fileCover,
    fileName,
    fileBook
  );
  books.push(newBook);

  res.status(201);
  res.json(newBook);
});

router.put("/:id",fileMulter.single("fileBook"), (req, res) => {
  const { books } = stor;
  const { title, description, authors, favorite, fileCover, fileName } =
    req.body;
  const { id } = req.params;
  const fileBook = req.file ? req.file.path : "";
  const idx = books.findIndex((el) => el.id === id);



  
  if (idx !== -1) {
    books[idx] = {
      ...books[idx],
      title,
      description,
      authors,
      favorite,
      fileCover,
      fileName,
      fileBook
    };

    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("404 | Такой книги нет");
  }
});

router.delete("/:id", (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    books.splice(idx, 1);
    res.json(true);
  } else {
    res.status(404);
    res.json("404 | Такой книги нет");
  }
});

router.get("/:id", (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    res.json(books[idx]);
  } else {
    res.status(404);
    res.json("404 | Такой книги нет");
  }
});

router.get("/:id/download", (req, res) => {
  const { books } = stor;
  const { id } = req.params;
  const idx = books.findIndex((el) => el.id === id);

  if (idx !== -1) {
    const filePath = books[idx].fileBook;

    fs.access(filePath, fs.constants.R_OK, (err) => {
      if (err) {
        response.statusCode = 404;
        response.end("Resourse not found!");
      } else {
        res.setHeader("Content-Type", "text/plain");
        res.setHeader(
          "Content-Disposition",
          'attachment; filename="' + path.basename(filePath) + '"'
        );

        fs.createReadStream(filePath).pipe(res);
      }
    });
  } else {
    res.status(404);
    res.json("404 | Такой книги нет");
  }
});
