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
var adminController = require("./adminController.js");


// Front End User Endpoints
app.get('/api/books/title/:title', userController.getBookByTitle);
app.get('/api/books/author/alph/:author', userController.getBookByAuthorAlph);
app.get('/api/books/author/year/:author', userController.getBookByAuthorYear);
app.get('/api/books/series/alph/:series', userController.getBookBySeriesAlph);
app.get('/api/books/series/year/:series', userController.getBookBySeriesYear);


// Front End Admin Endpoints
app.get('/api/members/:id', adminController.viewMembersAccount);

app.post('/api/login', adminController.login);
app.post('/api/books', adminController.addBook);
app.post('/api/members', adminController.addNewMember);

app.put('/api/members/:id', adminController.updateMemberInfo);
app.put('/api/books/:id', adminController.updateBookInfo);
app.put('/api/books/checkout/:bookid', adminController.checkoutBookToMember);
app.put('/api/books/checkin/:bookid', adminController.checkBookBackIn);

app.delete('/api/books/:id', adminController.deleteBook);
app.delete('/api/members', adminController.deleteMember);




app.listen(config.port, console.log("you are now connected on " + config.port));
