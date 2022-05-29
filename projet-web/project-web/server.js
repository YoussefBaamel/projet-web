// use mysql database
const mysql = require('mysql');

// create connection for mysql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'blog'
});

// connecting with mysql
connection.connect();

// require express server for running app
const express = require('express');

// save express method function in app
const app = express();

// path for joining other directories folder files
const path = require('path');

// analyzing the body values
const parser = require('body-parser');
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());

// initialize an ejs variable
const ejs = 'ejs';

// url localhost:3000
const port = 3000;

// setting template engine as ejs
app.set('view engine', ejs);

// use path for joining other directories folder files
app.use(express.static(path.join(__dirname, 'public')));

// get for home page
app.get('/', (req, res) => {
    // call query
    connection.query('SELECT * FROM `article`;', (err, result) => {
        if(err) {
            throw err;
        } else {
            connection.query('SELECT * FROM `category`;', (err2, result2) => {
                res.render('index', {
                    title: 'Home ',
                    heading: 'Blog website',
                    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
                    alt: 'Blog',
                    data: result,
                    data2: result2
                });
            });
        }
    });
});

// get for article page
app.get('/article/:id', (req, res) => {
    const id = req.params.id;
    connection.query("SELECT * FROM `article` WHERE `id`='" + id + "'", (err, result) => {
        if(err) {
            throw err;
        } else {
            connection.query("SELECT * FROM `comment` WHERE `articleid`='" + id + "'", (err2, result2) => {
                res.render('article', {
                    title: 'Article ',
                    data: result,
                    data2: result2
                });
            });
        }
    });
});

// post for article
app.post('/postArticle', (req, res) => {
    if (req.method == 'POST') {
        const title = req.body.title;
        const content = req.body.content;
        const image = req.body.image;
        const createdAt = req.body.createdAt;
        const updatedAt = req.body.updatedAt;
        const published = req.body.published;
        const userid = req.body.userid;
        const categoryid = req.body.categoryid;
        // check if any input is empty
        if (
            (title.length <= 0) ||
            (content.length <= 0) ||
            (image.length <= 0) ||
            (createdAt.length <= 0) ||
            (updatedAt.length <= 0) ||
            (published.length <= 0) ||
            (userid.length <= 0) ||
            (categoryid.length <= 0)
        ) {
            res.redirect('/');
        } else {
            connection.query("INSERT INTO `article`(`title`, `content`, `image`, `createdAt`, `updatedAt`, `published`, `userid`, `categoryid`) VALUES ('" + title + "', '" + content + "', '" + image + "', '" + createdAt + "', '" + updatedAt + "', '" + published + "', '" + userid + "', '" + categoryid + "');", (err, result) => {
                if(err) {
                    throw err;
                } else {
                    res.redirect('/');
                }
            });
        }
    }
});

// put for article
app.post('/putArticle', (req, res) => {
    if (req.method == 'POST') {
        const title = req.body.title;
        const content = req.body.content;
        const image = req.body.image;
        const createdAt = req.body.createdAt;
        const updatedAt = req.body.updatedAt;
        const published = req.body.published;
        const articleid = req.body.articleid;
        const categoryid = req.body.categoryid;
        // check if any input is empty
        if (
            (title.length <= 0) ||
            (content.length <= 0) ||
            (image.length <= 0) ||
            (createdAt.length <= 0) ||
            (updatedAt.length <= 0) ||
            (published.length <= 0) ||
            (articleid.length <= 0) ||
            (categoryid.length <= 0)
        ) {
            res.redirect('/');
        } else {
            connection.query("UPDATE `article` SET `title`='"+title+"', `content`='"+content+"', `image`='"+image+"', `createdAt`='"+createdAt+"', `updatedAt`='"+updatedAt+"', `published`='"+published+"', `categoryid`='"+categoryid+"' WHERE `id`='"+articleid+"';", (err, result) => {
                if(err) {
                    throw err;
                } else {
                    res.redirect('/');
                }
            });
        }
    }
});

// delete for article
app.post('/deleteArticle/:id', (req, res) => {
    const id = req.params.id;
    connection.query("DELETE FROM `article` WHERE `id`='" + id + "'", (err, result) => {
        if(err) {
            throw err;
        } else {
            res.redirect('/');
        }
    });
});

app.post('/addComment', (req, res) => {
    const email = req.body.email;
    const relationship = req.body.relationship;
    const articleid = req.body.articleid;
    if((email.length <= 0) || (relationship.length <= 0)) {
        res.redirect('/');
    } else {
        connection.query("INSERT INTO `comment`(`email`, `relationship`, `articleid`) VALUES ('" + email + "', '" + relationship + "', '" + articleid + "');", (err, result) => {
            if(err) {
                throw err;
            } else {
                res.redirect('/');
            }
        });
    }
});

    // runs after compilation
app.listen(port, () => {
    console.log(`Blog App listening on port ${port}`);
});
