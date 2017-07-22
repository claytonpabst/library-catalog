const app = require('./index.js');

module.exports = {

    getBookByTitle: function(req, res, next){
        const db = req.app.get('db');
        let title = req.params.title + '%';
        let response = {};
        
        db.getBookByTitle([title])
        .then( book => {
            response = book;
            for (var i in response){
                db.getNumCopies([response[i].title])
                .then( num => {
                    response[i].numCopies = num
                })
                .catch( err => res.status(500).json(err))
            }
            console.log(response)
            // return res.status(200).json(response)
        })
        .catch( err => res.status(500).json(err) )
    },

    getBooksByAuthorAlph: function(req, res, next){
        const db = req.app.get('db');
        let author = req.params.author;
        
        db.getBooksByAuthorAlph([author])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

    getBooksByAuthorYear: function(req, res, next){
        const db = req.app.get('db');
        let author = req.params.author;

        db.getBooksByAuthorYear([author])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

    getBooksBySeriesAlph: function(req, res, next){
        const db = req.app.get('db');
        let series = req.params.series;

        db.getBooksBySeriesAlph([series])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

    getBooksBySeriesYear: function(req, res, next){
        const db = req.app.get('db');
        let series = req.params.series;
        
        db.getBooksBySeriesYear([series])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

};


