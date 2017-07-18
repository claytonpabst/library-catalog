const app = require('./index.js');

module.exports = {

    viewMembersAccount: function(req, res, next){
        const db = req.app.get('db');
        let id = req.params.id;

        db.viewMembersAccount([id])
        .then( response => {
            if (response.length){
                return res.status(200).send(response);
            }else{
                return res.status(200).send('No membership record found with that id.')
            }
        })
    },

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
            return res.status(200).send('must include all required book info')
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

        if (!member.firstname || !member.lastname || !member.streetaddress 
            ||!member.city ||!member.state ||!member.zip ||!member.phone){
            return res.status(200).send('must include all required membership info')
        }

        db.addNewMember([member.firstname, member.lastname, member.streetaddress, member.city,
        member.state, member.zip, member.phone])
        .then( response => {
            return res.status(200).json('New member was added to the database');
        })
        .catch( err => {
            res.status(500).send(err);
        })
    },

    updateMemberInfo(req, res, next){
        const db = req.app.get('db');
        let member = req.body;
        let id = req.params.id;

        db.viewMembersAccount([id])
        .then( result => {
            if (result.length){
                if (member.firstname){
                    db.updateMemberFirstname([member.firstname, id])
                }
                if (member.lastname){
                    db.updateMemberLastname([member.lastname, id])
                }
                if (member.streetaddress){
                    db.updateMemberStreetaddress([member.streetaddress, id])
                }
                if (member.city){
                    db.updateMemberCity([member.city, id])
                }
                if (member.state){
                    db.updateMemberState([member.state, id])
                }
                if (member.zip){
                    db.updateMemberZip([member.zip, id])
                }
                if (member.phone){
                    db.updateMemberPhone([member.phone, id])
                }
                if (member.fees){
                    db.updateMemberFees([member.fees, id])
                }
                return res.status(200).send('Membership record was updated properly')
            }else{
                return res.status(200).send('No membership record found by that ID')
            }
        })
        .catch( err => res.status(500).send(err) );      
        // {
        //     "firstname": "test1",
        //     "lastname": "test1",
        //     "streetaddress": "test1",
        //     "city": "test1",
        //     "state": "test1",
        //     "zip": 11111,
        //     "phone": "test1",
        //     "fees": 2.20
        // }  
    },

    updateBookInfo: function(){
        const db = req.app.get('db');
        let book = req.body;
        let id = req.params.id;

        db.findBook([id, book.title])
        .then( result => {
            if (result.length){
                if (book.title){
                    db.updateBookTitle([book.title, id])
                }
                if (book.author){
                    db.updateBookAuthor([book.author, id])
                }
                if (book.series){
                    db.updateBookSeries([book.series, id])
                }
                if (book.year){
                    db.updateBookYear([book.year, id])
                }
                if (book.available){
                    db.updateBookAvailable([book.available, id])
                }
                if (book.whohasit){
                    db.updateWhoHasIt([book.whohasit, id])
                }
                if (book.duedate){
                    db.updateBookDueDate([book.duedate, id])
                }
                if (book.checkoutdate){
                    db.updateBookCheckoutDate([book.checkoutdate, id])
                }
                return res.status(200).send('Book info was updated properly')
            }else{
                return res.status(200).send('No book was found with that ID and title')
            }
        })
        .catch( err => res.status(500).send(err) );  
    },

    deleteBook: function(req, res, next){
        const db = req.app.get('db');
        let book = req.body;

        if (!book.id || !book.title){
            return res.status(200).send('must include id AND title of book to delete')
        }
        
        db.findBook([book.id, book.title])
        .then(result => {
            if (result.length){
                db.deleteBook([book.id])
                .then( response => {
                    return res.status(200).json( {status: 'Book was deleted'} );
                })
            }else{
                return res.status(200).send('No book found with that id and title')
            }
        })
        .catch( err => {
            res.status(500).send(err);
        })
    },

    deleteMember: function(req, res, next){
        const db = req.app.get('db');
        let member = req.body;

        if (!member.id || !member.lastname){
            return res.status(200).send('must include id AND last name of member to delete')
        }
        console.log(member)
        db.findMemberToDelete([member.id, member.lastname])
        .then(result => {
            if (result.length){
                db.deleteMember([member.id])
                .then( response => {
                    return res.status(200).json( {status: 'Membership record was deleted'} );
                })
            }else{
                return res.status(200).send('No membership record found with that id and last name')
            }
        })
        .catch( err => {
            res.status(500).send(err);
        })
    },

}