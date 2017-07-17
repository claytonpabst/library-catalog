update books
set available = 'no',
memberid_whohasit = $1
where bookid = $2