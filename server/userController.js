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
                    .then()
                }
                if (member.lastname){
                    db.updateMemberLastname([member.lastname, id])
                    .then()
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

    deleteBook: function(req, res, next){
        const db = req.app.get('db');
        let book = req.body;

        if (!book.id || !book.title){
            return res.status(200).send('must include id AND title of book to delete')
        }
        
        db.findBookToDelete([book.id, book.title])
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
