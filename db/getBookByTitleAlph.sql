select * from books
where title ilike $1
order by title asc