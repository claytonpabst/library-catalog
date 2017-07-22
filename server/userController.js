const app = require('./index.js');

module.exports = {

    searchBooksByTitle: function(req, res, next){
        const db = req.app.get('db');
        let title = req.params.title + '%';
        
        db.searchBooksByTitle([title])
        .then( books => {
            return res.status(200).json(books)
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

    getBookInfoByTitle: function(req, res, next){
        const db = req.app.get('db');
        let title = req.params.title;
        let response = {};
        
        db.getNumCopies([title])
        .then( (copies) => {
            response.numCopies = copies
            db.getNumAvailable([title])
            .then( available => {
                response.numAvailable = available;
                return res.status(200).json(response);
            })
        })
        .catch( err => res.status(500).json(err) )
    }

};


