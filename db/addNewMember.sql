insert into users(firstname, lastname, streetaddress, city, state, zip, phone, fees)
values($1, $2, $3, $4, $5, $6, $7, 0)
returning *;

-- this worked in sql tabs:
-- insert into users(firstname, lastname, streetaddress, city, state, zip, phone, fees)
-- values('test', 'testlast', '1234 s 3l23 w', 'provo', 'utah', 84063, '435-562-1321', 0)