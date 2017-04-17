create schema bamazon;
use bamazon;
/* TABLES
CREATE TABLE users(
   id INTEGER(11) AUTO_INCREMENT NOT NULL,
   firstname VARCHAR(30),
   lastname VARCHAR(30),
   age INTEGER(10),
   item_id INTEGER(10),
   primary key(id),
   FOREIGN KEY(item_id) references items(id)
);*/
use bamazon;
CREATE TABLE products(
   item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
   productname VARCHAR(50) NOT NULL,
   departmentName VARCHAR(50),
   price INTEGER(10),
   stock_quantity INTEGER (10),
   primary key(item_id)
 );

insert into products values(NULL,"Screw Driver","Tools",50,501);
insert into products values(NULL,"Screw","Tools",50,501);
insert into products values(NULL,"Hammer","Tools",50,501);
insert into products values(NULL,"Screw Driver","Tools",50,501);
insert into products values(NULL,"yoga pants","Casual",50,501);
insert into products values(NULL,"Mabelline Eyeliner","Makeup",50,501);
insert into products values(NULL,"Samsung TV","Electronics",50,501);
insert into products values(NULL,"Dongal Adapter","Electronicd",50,501);
insert into products values(NULL,"lawn movers","Tools",50,501);
insert into products values(NULL,"yoga pants","",50,501);

select * from products;