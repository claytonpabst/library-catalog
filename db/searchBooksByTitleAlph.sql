select title, author, year, series, available from books
where title ilike $1
order by title asc