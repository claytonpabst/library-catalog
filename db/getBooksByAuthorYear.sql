select * from books
where author ilike $1
order by year asc