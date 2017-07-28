const app = require('./index.js');
const config = require('./config.js');

module.exports = {

    viewMembersAccount: function(req, res, next){
        const db = req.app.get('db');
        let id = req.params.id;

        if (!req.session.authorizedLogin){
            return res.status(200).send('Must be logged in to proceed');
        }

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
            if (response.length){
                req.session.authorizedLogin = true;
                return res.status(200).json(response);
            }else{
                return res.status(200).send('Invalid username or password')
            }
        })
        .catch( err => {
            res.status(500).send(err);
        })
    },

    logout: function(req, res, next){
        authorizedLogin = false;
        req.session.id = null;
    },

    addBook: function(req, res, next){
        const db = req.app.get('db');
        let book = req.body;

        if (!req.session.authorizedLogin){
            return res.status(200).send('Must be logged in to proceed');
        }

        if (!book.title || !book.author || !book.series ||!book.year ||!book.copies){
            return res.status(200).send('must include all required book info')
        }
        for (let i = 0; i < book.copies; i ++){
            db.addBook([book.title, book.author, book.series, book.year])
            .then( response => {
                if (i === book.copies - 1){
                    return res.status(200).json('Book(s) successfully added to the database');
                }
            })
            .catch( err => {
                res.status(500).send("Whoops! Looks like there was an error: ", err);
            })
        }
    },

    addNewMember: function(req, res, next){
        const db = req.app.get('db');
        let member = req.body;
        let phone = member.phone.split('');
        for (var i = phone.length; i >= 0; i--){
            if (phone[i] === '-'){
                phone.splice(i, 1)
            }
        }
        phone.shift();
        phone = phone.join('');

        if (!req.session.authorizedLogin){
            return res.status(200).send('Must be logged in to proceed');
        }

        if (!member.firstname || !member.lastname || !member.streetAddress 
            ||!member.city ||!member.state ||!member.zip ||!member.phone){
            return res.status(200).send('must include all required membership info')
        }

        db.addNewMember([member.firstname, member.lastname, member.streetAddress, member.city,
        member.state, member.zip, member.phone])
        .then( response => {
            response = response[0];
            return res.status(200).json(`${response.firstname} ${response.lastname} was added to the database with a new MemberID of ` + response.userid);
        })
        .catch( err => {
            res.status(500).send(err);
        })
    },

    updateMemberInfo(req, res, next){
        const db = req.app.get('db');
        let member = req.body;
        let id = req.params.id;

        if (!req.session.authorizedLogin){
            return res.status(200).send('Must be logged in to proceed');
        }

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
    },

    updateBookInfo: function(req, res, next){
        const db = req.app.get('db');
        let book = req.body;
        let id = req.params.id;

        if (!req.session.authorizedLogin){
            return res.status(200).send('Must be logged in to proceed');
        }

        db.findBookById([id])
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
                    db.updateBookWhoHasIt([book.whohasit, id])
                }
                if (book.duedate){
                    db.updateBookDueDate([book.duedate, id])
                }
                if (book.checkoutdate){
                    db.updateBookCheckoutDate([book.checkoutdate, id])
                }
                return res.status(200).send('Book info was updated successfully')
            }else{
                return res.status(200).send('No book was found by that ID')
            }
        })
        .catch( err => res.status(500).send(err) );  
    },

    checkoutBookToMember: function(req, res, next){
        const db = req.app.get('db');
        let bookid = req.params.bookid;
        let {memberid, lastname} = req.body;
        let today = new Date();
        let checkoutDate = today.toLocaleDateString()  ; 
        let dueDate = new Date(today.getFullYear(), today.getMonth()+1, today.getDate()).toLocaleDateString();

        if (!req.session.authorizedLogin){
            return res.status(200).send('Must be logged in to proceed');
        }

        if (!memberid || !lastname){
            return res.status(200).send('Must include member id and last name to check out a book')
        }

        db.findBookById([bookid])
        .then( result => {
            if (result.length){
                db.findMember([memberid, lastname])
                .then( member => {
                    if (member.length){
                        db.checkoutBook([checkoutDate, dueDate, memberid, bookid])
                        .then( update => {
                            return res.status(200).send('Book was successfully checked out')
                        })
                        .catch( updateErr => {
                            console.log(updateErr)
                            return res.status(500).send(updateErr)
                        })
                    }else{
                        return res.status(200).send('No member record found with that id and lastname')
                    }
                })
                .catch( memberErr => res.status(500).send(memberErr) )               
            }else{
                return res.status(200).send('No book was found by that ID')
            }
        })
        .catch( err => res.status(500).send(err) );  
    },

    checkBookBackIn: function(req, res, next){
        const db = req.app.get('db');
        let bookid = req.params.bookid;

        if (!req.session.authorizedLogin){
            return res.status(200).send('Must be logged in to proceed');
        }

        db.checkBookBackIn([bookid])
        .then( response => {
            return res.status(200).send('Book was returned successfully!')
        })
        .catch( err => res.status(500).send(err) )
    },

    deleteBook: function(req, res, next){
        const db = req.app.get('db');
        let id = req.params.id;

        if (!req.session.authorizedLogin){
            return res.status(200).send('Must be logged in to proceed');
        }
        
        db.findBookById([id])
        .then(result => {
            if (result.length){
                db.deleteBook([id])
                .then( response => {
                    return res.status(200).json( `Book ${id} was deleted successfully` );
                })
            }else{
                return res.status(200).send('No book found by that id')
            }
        })
        .catch( err => {
            res.status(500).send(err);
        })
    },

    deleteMember: function(req, res, next){
        console.log(req.query.lastname);
        const db = req.app.get('db');
        let id = req.params.id;
        let lastname = req.query.lastname;

        if (!req.session.authorizedLogin){
            return res.status(200).send('Must be logged in to proceed');
        }

        if (!id || !lastname){
            return res.status(200).send('must include id AND last name of member to delete membership record')
        }

        db.findMember([id, lastname])
        .then(result => {
            if (result.length){
                db.deleteMember([id])
                .then( response => {
                    return res.status(200).json( `Membership record for ${lastname} with id of ${id} was deleted` );
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