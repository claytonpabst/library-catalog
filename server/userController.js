const app = require('./index.js');

module.exports = {
  
    login: function(req, res, next){
        const db = req.app.get('db');
        
        db.login([req.body.username, req.body.password])
        .then( response => {
            return res.status(200).json(response);
        })
        .catch( err => {
            res.status(500).send(err);
        })
    },

    addBook: function(req, res, next){
        const db = req.app.get('db');
        let book = req.body;

        if (!book.title || !book.author || !book.series ||!book.year){
            return res.status(200).send('must include all required info')
        }
        db.addBook([book.title, book.author, book.series, book.year])
        .then( response => {
            return res.status(200).json('Book was added to the database');
        })
        .catch( err => {
            res.status(500).send("Whoops! Looks like there was an error: ", err);
        })
    },

    addNewMember: function(req, res, next){
        const db = req.app.get('db');
        let member = req.body;

        // if (!book.title || !book.author || !book.series ||!book.year){
        //     return res.status(200).send('must include all required info')
        // }
        // db.addBook([book.title, book.author, book.series, book.year])
        // .then( response => {
        //     return res.status(200).json('Book was added to the database');
        // })
        // .catch( err => {
        //     res.status(500).send("Whoops! Looks like there was an error: ", err);
        // })
    }
  
};


//EXAMPLE FOR MASSIVE 3.0
    // vehicleByQuery: function(req, res, next){
    //     const db = req.app.get('db');
    //     let email = req.query.userEmail;
    //     let letter = req.query.userFirstStart;

    //     if(email){
    //         db.vehicle_by_email([email])
    //         .then(function(response){
    //             res.status(200).send(response);
    //         })
    //         .catch( (err) => res.status(500).send(err))
    //     } else if(letter){
    //         db.vehicle_by_letter([letter+'%'])
    //         .then(function(response){
    //             res.status(200).send(response);
    //         })
    //         .catch( (err) => res.status(500).send(err))
    //     }
    // }
