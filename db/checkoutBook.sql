update books
set available = 'no',
checkoutdate = $1,
duedate = $2,
memberid_whohasit = $3
where bookid = $4