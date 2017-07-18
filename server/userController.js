const app = require('./index.js');

module.exports = {

    getBookByTitleAlph: function(req, res, next){
        const db = req.app.get('db');
        let title = req.params.title;
        
        db.getBookByTitleAlph([title])
        .then( response => {
            return res.status(200).json(response);
        })
        .catch( err => res.status(500).json(err) )
    },

    getBookByTitleYear: function(req, res, next){
        const db = req.app.get('db');
        let title = req.params.title;
        db.getBookByTitleYear([title])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

    getBookByAuthorAlph: function(req, res, next){
        const db = req.app.get('db');
        let author = req.params.author;
        db.getBookByAuthorAlph([author])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

    getBookByAuthorYear: function(req, res, next){
        const db = req.app.get('db');
        let author = req.params.author;
        db.getBookByAuthorYear([author])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

    getBookBySeriesAlph: function(req, res, next){
        const db = req.app.get('db');
        let series = req.params.series;
        db.getBookBySeriesAlph([series])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

    getBookBySeriesYear: function(req, res, next){
        const db = req.app.get('db');
        let series = req.params.series;
        db.getBookBySeriesYear([series])
        .then( response => {
            return res.status(200).json(response);

        })
        .catch( err => res.status(500).json(err) )
    },

};
