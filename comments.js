// Create we server

const express = require('express');
const bodyParser = require('body-parser');
const comments = require('./comments');
const app = express();
const port = 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Parse application/json
app.use(bodyParser.json());

app.get('/api/comments', (req, res) => {
    res.json(comments);
});

app.post('/api/comments', (req, res) => {
    const comment = {
        id: comments.length + 1,
        username: req.body.username,
        content: req.body.content
    };
    comments.push(comment);
    res.json(comment);
});

app.put('/api/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(comment => comment.id === +id);
    comment.username = req.body.username;
    comment.content = req.body.content;
    res.json(comment);
});

app.delete('/api/comments/:id', (req, res) => {
    const id = req.params.id;
    const index = comments.findIndex(comment => comment.id === +id);
    comments.splice(index, 1);
    res.json({});
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});