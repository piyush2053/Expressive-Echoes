const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(bodyParser.json());


const uri = 'mongodb+srv://kickstartcodes:7v34nVtmqTagptRp@bloggerwebsite.5mywgns.mongodb.net/?retryWrites=true&w=majority&appName=BloggerWebsite';
mongoose.connect(uri)
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const blogSchema = new mongoose.Schema({
    title: String,
    thumbnail: String,
    content: String,
    author: String,
    date: Date,
    email: String,
    userImage: String,
});

const Blog = mongoose.model('Blog', blogSchema);

app.listen(3001, () => {
    console.log('Server running');
});

app.post('/publish', async (req, res) => {
    try {
        const blogData = new Blog({
            title: req.body.title,
            thumbnail: req.body.thumbnail,
            content: req.body.content,
            author: req.body.author,
            date: new Date(),
            email: req.body.email,
            userImage: req.body.userImage,
        });
        const savedBlog = await blogData.save();
        res.status(201).send({
            id: savedBlog._id
        });
    } catch (error) {
        console.error('Error adding document: ', error);
        res.status(500).send('Error adding document');
    }
});

// Get all blogs
app.get('/getBlogs', async (req, res) => {
    try {
        const blogs = await Blog.find({});
        res.send(blogs);
    } catch (error) {
        console.error('Error getting documents: ', error);
        res.status(500).send('Error getting documents');
    }
});