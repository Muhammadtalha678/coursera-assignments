const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [{ name: 'Talha', email: 'talha@test.com', password: '12345' } ];

const isValid = (username)=>{ //returns boolean
//write code to check is the username is valid
}

const authenticatedUser = (username,password)=>{ //returns boolean
//write code to check if username and password match the one we have in records.
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ message: "User not found. Please register first." });
  }

  if (user.password !== password) {
    return res.status(400).json({ message: "Invalid credentials" });
  }

  // --- CRITICAL: Save authorization into session so cookies work ---
  req.session.authorization = {
    username: user.name, // or user.email
    accessToken: "sample_token"
  };

  return res.status(200).json({ message: "Customer successfully logged in" });
});

// Add a book review
// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const review = req.query.review; // Review passed as query parameter
  
  // Retrieve username from the session authorization object set during login
  const username = req.session.authorization ? req.session.authorization.username : null;

  if (!username) {
    return res.status(403).json({ message: "Unauthorized: Please login first" });
  }

  if (!review) {
    return res.status(400).json({ message: "Review text is required" });
  }

  // Check if the book exists in our database
  if (books[isbn]) {
    let bookReviews = books[isbn].reviews;
    
    // Add or modify the review for the logged-in user
    bookReviews[username] = review;

    return res.status(200).json({
      message: "The review was successfully added/updated.",
      reviews: bookReviews
    });
  } else {
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
  }
});

// Delete a book review
regd_users.delete("/auth/review/:isbn", (req, res) => {
  const isbn = req.params.isbn;
  const username = req.session.authorization ? req.session.authorization.username : null;

  if (!username) {
    return res.status(403).json({ message: "Unauthorized: Please login first" });
  }

  if (books[isbn]) {
    let bookReviews = books[isbn].reviews;
    
    // Check if the user has a review for this book
    if (bookReviews[username]) {
      delete bookReviews[username];
      return res.status(200).json({
        message: "Review successfully deleted.",
        reviews: bookReviews
      });
    } else {
      return res.status(404).json({ message: "Review by this user not found for this book" });
    }
  } else {
    return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
  }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
