select * from books
where series ilike $1
order by year asc