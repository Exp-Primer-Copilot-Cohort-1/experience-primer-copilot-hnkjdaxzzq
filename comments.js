// Create web server with express
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const uuid = require('uuid/v4');
const { randomBytes } = require('crypto');

// Create web server
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Get all comments for a post
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create a comment for a post
app.post('/posts/:id/comments', (req, res) => {
  // Create a random id for the comment
  const commentId = uuid();
  // Get the comment from the request body
  const { content } = req.body;
  // Get the comments for the post
  const comments = commentsByPostId[req.params.id] || [];
  // Add the new comment to the comments
  comments.push({ id: commentId, content });
  // Update the comments for the post
  commentsByPostId[req.params.id] = comments;
  // Send the comment and status
  res.status(201).send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});