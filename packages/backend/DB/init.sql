insert into "user"
    (email, password)
values ('test@email.ua', 'U2FsdGVkX1/TUQS8bSmjXBcRo8nPET7Av5/2M8P1v5g='),
       ('test2@email.ua', 'U2FsdGVkX19o+vXDpzjMA/cd/KqtHmGb7zqnw9/H8DA=');

insert into "todo"
    (name, details, "userId")
values ('name1', 'detail1', 1),
       ('name2', 'detail2', 1),
       ('name3', 'detail3', 1);

insert into "todo"
    (name, details, "userId", private)
values ('name1', 'detail1', 1, false),
       ('name2', 'detail2', 1, false),
       ('name3', 'detail3', 2, false);

insert into "todo"
    (name, "userId")
values ('name1', 2),
       ('name2', 2),
       ('name3', 2);