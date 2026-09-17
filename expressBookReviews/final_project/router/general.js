const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


const register_user = []
public_users.post("/register", (req,res) => {
  const {name,email,password,confirm_password} = req.body
  // console.log(req.body);
  
  if (!name || !email || !password || !confirm_password) {
    return res.status(400).json({message:"All fields are required"})
  }
  if (password !== confirm_password) {
    return res.status(400).json({message:"Passwords not match"})
    
  }
  const alreadyExists = register_user.some((user) => user.email === email)
  //Write your code here
  if (alreadyExists) {
    
    return res.status(400).json({message:"User already exists with that email"})
  }
  register_user.push({
    name,email,password
  })
  console.log(register_user);
  
  return res.status(200).json({user:email,message: "Register Successfully"});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  // console.log(books);
    
  return res.status(200).json({books,message: "Sucessfully Fetched All Books"});
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  //Write your code here
  const {isbn} = req.params
  const isbN = Number(isbn)
  const book = books[isbN]
  // console.log(book);
  if (!book) return res.status(404).json({message: `Book not found of isbn: ${isbN}`})
    return res.status(200).json({book,message: "Book Fetched Successfully"});
});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  
  const {author} = req.params
  let author_of_book
  for (const bookIsbn in books) {
    // console.log(books[bookIsbn].author.toLowerCase());

    if (books[bookIsbn].author.toLowerCase() === author.toLowerCase()) {
      author_of_book = books[bookIsbn]
    }
    
    
  }
  if (!author_of_book) {
     return res.status(404).json({message: `Book not found of author: ${author}`})
  }
  
  return res.status(300).json({author_of_book,message: "Book Fetched Successfully"});
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  const {title} = req.params
  let title_of_book
  for (const bookIsbn in books) {
    // console.log(books[bookIsbn].author.toLowerCase());

    if (books[bookIsbn].title.toLowerCase() === title.toLowerCase()) {
      title_of_book = books[bookIsbn]
    }
    
    
  }
  if (!title_of_book) {
     return res.status(404).json({message: `Book not found of title: ${title}`})
  }
  return res.status(300).json({title_of_book,message: "Book Fetched Successfully"});
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  const {isbn} = req.params
  const isbN = Number(isbn)
  const book = books[isbN].reviews
  // console.log(book);
  if (!book) return res.status(404).json({message: `Book not found of isbn: ${isbN}`})
  
  return res.status(200).json({book_review:book,message: "Book Fetched Successfully"});
  
  });

module.exports.general = public_users;
