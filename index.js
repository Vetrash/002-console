#!/usr/bin/env node

import  express from 'express'
import { v4 as uuidv4 } from 'uuid';
import  fileMulter from './src/middleware/file.js';
import fs from "fs";
import  path from 'path';

class Book {
    constructor(title = "", description = "", id = uuid(), authors = "", favorite = '', fileCover = '', fileName = '', fileBook = '') {
        this.id= id,
        this. title = title,
        this.description = description,
        this.authors= authors,
        this.favorite= favorite,
        this.fileCover = fileCover,
        this.fileName = fileName
        this.fileBook = fileBook
    }
}

const stor = {
    books: [
    ],
};

const app = express()
app.use(express.json())


app.post('/api/user/login', (req, res) => {
  const body = { id: 1, mail: "test@mail.ru" }
  res.status(201)
  res.json(body)
})







app.get('/api/books', (req, res) => {
  const {id} = req.params
  console.log('id', id)
  
  const {books} = stor
  res.json(books)
})

app.post('/api/books', fileMulter.single('file'),(req, res) => {
    const {books} = stor
    const {title, description, authors, favorite, fileCover , fileName } = req.body
    const fileBook = req.file? req.file.path : ''
   
    const id = uuidv4()

    const newBook = new Book(title, description, id, authors, favorite, fileCover , fileName, fileBook )
    books.push(newBook)

    res.status(201)
    res.json(newBook)
})

app.put('/api/books/:id', (req, res) => {
    const {books} = stor
    const {title, description, authors, favorite, fileCover , fileName } = req.body
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

    if (idx !== -1){
        books[idx] = {
            ...books[idx],
            title, description, authors, favorite, fileCover , fileName 
        }

        res.json(books[idx])
    } else {
        res.status(404)
        res.json('404 | Такой книги нет')
    }
})

app.delete('/api/books/:id', (req, res) => {
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)
     
    if(idx !== -1){
        books.splice(idx, 1)
        res.json(true)
    } else {
        res.status(404)
        res.json('404 | Такой книги нет')
    }
})


app.get('/api/books/:id', (req, res) => {
  const {books} = stor
  const {id} = req.params
  const idx = books.findIndex(el => el.id === id)
  console.log(idx)

  if( idx !== -1) {
      res.json(books[idx])
  } else {
      res.status(404)
      res.json('404 | Такой книги нет')
  }

})

app.get('/api/books/:id/download', (req, res) => {
    const {books} = stor
    const {id} = req.params
    const idx = books.findIndex(el => el.id === id)

  
    if( idx !== -1) {
        const filePath = books[idx].fileBook;

        fs.access(filePath, fs.constants.R_OK, err => {
            if(err){
                response.statusCode = 404;
                response.end("Resourse not found!");
            }
            else{
                res.setHeader('Content-Type', 'text/plain');
                res.setHeader('Content-Disposition', 'attachment; filename="' + path.basename(filePath) + '"');

                fs.createReadStream(filePath).pipe(res);
            }
          });
    } else {
        res.status(404)
        res.json('404 | Такой книги нет')
    }
  
  })



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`приложение запущено на http://localhost:${PORT}` )
});
