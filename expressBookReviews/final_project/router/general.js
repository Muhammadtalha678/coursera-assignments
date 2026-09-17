const express = require('express');
const axios = require('axios');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

const register_user = []
public_users.post("/register", (req,res) => {
  const {name, email, password, confirm_password} = req.body;
  
  if (!name || !email || !password || !confirm_password) {
    return res.status(400).json({message: "All fields are required"});
  }
  if (password !== confirm_password) {
    return res.status(400).json({message: "Passwords not match"});
  }
  const alreadyExists = register_user.some((user) => user.email === email);
  if (alreadyExists) {
    return res.status(400).json({message: "User already exists with that email"});
  }
  register_user.push({ name, email, password });
  
  return res.status(200).json({ user: email, message: "Register Successfully" });
});

// Get the book list available in the shop
public_users.get('/', function (req, res) {
  return res.status(200).json({ books, message: "Successfully Fetched All Books" });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
  const { isbn } = req.params;
  const isbN = Number(isbn);
  const book = books[isbN];
  if (!book) return res.status(404).json({ message: `Book not found of isbn: ${isbN}` });
  return res.status(200).json({ book, message: "Book Fetched Successfully" });
});

// Get book details based on author (Fixed status code to 200)
public_users.get('/author/:author', function (req, res) {
  const { author } = req.params;
  let author_of_book = [];
  
  for (const bookIsbn in books) {
    if (books[bookIsbn].author.toLowerCase() === author.toLowerCase()) {
      author_of_book.push(books[bookIsbn]);
    }
  }
  
  if (author_of_book.length === 0) {
    return res.status(404).json({ message: `Book not found of author: ${author}` });
  }
  
  return res.status(200).json({ author_of_book, message: "Book Fetched Successfully" });
});

// Get all books based on title (Fixed status code to 200)
public_users.get('/title/:title', function (req, res) {
  const { title } = req.params;
  let title_of_book = [];
  
  for (const bookIsbn in books) {
    if (books[bookIsbn].title.toLowerCase() === title.toLowerCase()) {
      title_of_book.push(books[bookIsbn]);
    }
  }
  
  if (title_of_book.length === 0) {
    return res.status(404).json({ message: `Book not found of title: ${title}` });
  }
  return res.status(200).json({ title_of_book, message: "Book Fetched Successfully" });
});

// Get book review
public_users.get('/review/:isbn', function (req, res) {
  const { isbn } = req.params;
  const isbN = Number(isbn);
  const book = books[isbN] ? books[isbN].reviews : null;
  
  if (!book) return res.status(404).json({ message: `Book not found of isbn: ${isbN}` });
  
  return res.status(200).json({ book_review: book, message: "Book Fetched Successfully" });
});


// ==========================================
// TASK 11: Axios / Async-Await implementations
// ==========================================

const BASE_URL = "http://localhost:5000";

// 1. Get all books using async/await with Axios
const getAllBooksAsync = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 2. Get book details by ISBN using Promises with Axios
const getBookByISBN = (isbn) => {
  return new Promise((resolve, reject) => {
    axios.get(`${BASE_URL}/isbn/${isbn}`)
      .then(response => resolve(response.data))
      .catch(error => reject(error));
  });
};

// 3. Get book details by Author using async/await with Axios
const getBooksByAuthor = async (author) => {
  try {
    const response = await axios.get(`${BASE_URL}/author/${author}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// 4. Get book details by Title using async/await with Axios
const getBooksByTitle = async (title) => {
  try {
    const response = await axios.get(`${BASE_URL}/title/${title}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

module.exports.general = public_users;