select count(*) from books
where title ilike $1
and available ilike 'yes'