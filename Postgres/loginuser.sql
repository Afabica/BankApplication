create database bankapp;

create table loginuser(id serial primary key, username varchar(20) not null, password varchar(20) not null);

insert into table loginuser(username, password) values ('navin', 'n@123'), ('marvin', 'm@123');




