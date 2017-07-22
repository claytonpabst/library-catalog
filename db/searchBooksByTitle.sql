select distinct title, author, year, series from books
where title ilike $1 and
available ilike 'yes'