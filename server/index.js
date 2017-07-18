const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var massive = require('massive');
var session = require('express-session');
var config = require('./config.js');

const app = module.exports = express();

app.use(bodyParser.json());
app.use(session({
  secret: config.secret,
    resave: true,
    saveUninitialized: false,
    cookie:{
      maxAge: (1000*60*60*24*14) //this is 14 days
    }
}))

massive(config.connection)
.then( db => {
  app.set('db', db);
})

app.use(express.static(__dirname + './../build'))

var userController = require("./userController.js");

////////// Endpoints for the front end //////////

// User Endpoints
app.get('/api/books/alph/:title', userController.getBookByTitleAlph);
app.get('/api/books/year/:title', userController.getBookByTitleYear);
app.get('/api/books/alph/:author', userController.getBookByAuthorAlph);
app.get('/api/books/year/:author', userController.getBookByAuthorYear);
app.get('/api/books/alph/:series', userController.getBookBySeriesAlph);
app.get('/api/books/year/:series', userController.getBookBySeriesYear);


// Admin Endpoints
app.get('/api/members/:id', adminController.viewMembersAccount);

app.post('/api/login', userController.login);
app.post('/api/books', userController.addBook);
app.post('/api/members', userController.addNewMember);

app.put('/api/members/:id', userController.updateMemberInfo);
app.put('/api/books/:id', userController.updateBookInfo);

app.delete('/api/books', userController.deleteBook);
app.delete('/api/members', userController.deleteMember);




app.listen(config.port, console.log("you are now connected on " + config.port));
