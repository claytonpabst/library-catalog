update books
set available = 'yes',
memberid_whohasit = null,
checkoutdate = null,
duedate = null
where bookid = $1