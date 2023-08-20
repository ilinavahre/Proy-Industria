DROP TABLE ##purchase_orders;
CREATE TABLE ##purchases
(
    purchase_id int unsigned primary key auto_increment,
    created datetime default null,
    is_active tinyint not null default 1,

    supplier_id int unsigned,
    constraint foreign key (supplier_id) references ##suppliers (supplier_id),

    status int default 0, /* 0=Pending, 1=Processed, 2=Cancelled, 3=Received, 4=Completed */
    data mediumblob default '{}'
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;
