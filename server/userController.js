var app = require('./index.js');
var db = app.get('db');

module.exports = {
  
    login: function(req, res, next){
        let loginInfo = req.body;
        console.log(loginInfo)
        res.status(200).send(loginInfo)
    }
  
};
