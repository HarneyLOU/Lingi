
 alter table categories drop foreign key category_fk;
 alter table languages drop foreign key language_fk;
 drop table test;
 drop table categories;
  drop table languages;
 
 create table test(
 id int primary key auto_increment,
 language_id numeric(9),
 category_id numeric(9),
 level_id numeric(3),
 last_modified_date datetime,
 created_date datetime,
 desciption varchar(200) default 'empty');
alter table test add index cat_id(category_id);
alter table test add index lan_id(language_id);


create table categories(
category_id numeric(9) primary key not null,
category_name varchar(30)
);

create table languages(
language_id numeric(9) primary key not null,
language_name varchar(30)
);

alter table categories add
constraint category_fk foreign key (category_id) 
references test(category_id);

alter table languages add
constraint language_fk foreign key (language_id) 
references test(language_id);


insert into test(language_id,category_id,level_id,last_modified_date,created_date)
 values(1,1,1,'2019-10-15 12:00:14','2019-10-14 15:32:22');
insert into test(language_id,category_id,level_id,last_modified_date,created_date)
 values(2,2,1,'2019-10-15 12:00:14','2019-10-14 15:32:22');
 
 
insert into categories values(1,'Cat1');
insert into categories values(2,'Cat2');
insert into languages values(1,'Polish');
insert into languages values(2,'English');





