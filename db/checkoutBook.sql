update books
set available = 'no',
checkoutdate = new Date();
duedate = new Date();
memberid_whohasit = $1
where bookid = $2