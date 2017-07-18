const app = require('./index.js');

module.exports = {

    getBookByTitle: function(req, res, next){
        const db = req.app.get('db');
        let title = req.params.title;
        
        db.getBookByTitle([title])
        .then( response => {
            return res.status(200).json(response);
        })
        .catch( err => res.status(500).json(err) )
    },

    getBooksByAuthorAlph: function(req, res, next){
        const db = req.app.get('db');
        let author = req.params.author;
        console.log(author)
        db.getBookByAuthorAlph([author])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

    getBooksByAuthorYear: function(req, res, next){
        const db = req.app.get('db');
        let author = req.params.author;
        db.getBookByAuthorYear([author])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

    getBooksBySeriesAlph: function(req, res, next){
        const db = req.app.get('db');
        let series = req.params.series;
        db.getBookBySeriesAlph([series])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

    getBooksBySeriesYear: function(req, res, next){
        const db = req.app.get('db');
        let series = req.params.series;
        db.getBookBySeriesYear([series])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

};


