/* ******************************************************************************************* */
DROP TABLE IF EXISTS ##sale_details;
DROP TABLE IF EXISTS ##sales;

DROP TABLE IF EXISTS ##user_privileges;
DROP TABLE IF EXISTS ##privileges;
DROP TABLE IF EXISTS ##users;
DROP TABLE IF EXISTS ##positions;
DROP TABLE IF EXISTS ##departments;

DROP TABLE IF EXISTS ##products;
DROP TABLE IF EXISTS ##taxes;
DROP TABLE IF EXISTS ##units;
DROP TABLE IF EXISTS ##suppliers;
DROP TABLE IF EXISTS ##warehouses;

/* ******************************************************************************************* */
CREATE TABLE ##units
(
    unit_id int unsigned primary key auto_increment,
    created datetime default null,

    is_visible tinyint not null default 1,
    is_active tinyint not null default 1,

	name varchar(128) default '',
	short varchar(128) default ''
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;


/* ******************************************************************************************* */
CREATE TABLE ##taxes
(
    tax_id int unsigned primary key auto_increment,
    created datetime default null,

    is_visible tinyint not null default 1,
    is_active tinyint not null default 1,

	name varchar(128) default '',
	value decimal(10,2) default 0
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;


/* ******************************************************************************************* */
CREATE TABLE ##departments
(
    department_id int unsigned primary key auto_increment,
    created datetime default null,

    is_visible tinyint not null default 1,
    is_active tinyint not null default 1,

	name varchar(128) default '',
	short varchar(128) default ''
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;


/* ******************************************************************************************* */
CREATE TABLE ##positions
(
    position_id int unsigned primary key auto_increment,
    created datetime default null,

    is_visible tinyint not null default 1,
    is_active tinyint not null default 1,

	name varchar(128),

    department_id int unsigned,
    constraint foreign key (department_id) references ##departments (department_id),	

    salary decimal(10,2),

    vacation_days int,
    vacation_leave int(1) default 0,
    cumulative_vacations int(1) default 0,

    sick_days int default 0,
    sick_leave int(1) default 0,

    maternity_days int default 0,
    maternity_leave int(1) default 0
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;


/* ******************************************************************************************* */
CREATE TABLE ##users
(
    user_id int unsigned primary key auto_increment,
    created datetime default null,

    is_authorized tinyint not null default 1,
    is_active tinyint not null default 1,

    username varchar(256) not null,
    password char(96) not null collate utf8mb4_bin,

	photo varchar(128) default null,

	name varchar(128) default '',
	email varchar(128) default '',

    position_id int unsigned,
    constraint foreign key (position_id) references ##positions (position_id)
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;

ALTER TABLE ##users ADD index n_username (username);
ALTER TABLE ##users ADD index n_is_active (is_active);


CREATE TABLE ##privileges
(
    privilege_id int unsigned primary key auto_increment,
    name varchar(128) not null unique key
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;


CREATE TABLE ##user_privileges
(
    user_id int unsigned not null,
    privilege_id int unsigned not null,
	tag tinyint default 0,

    primary key (user_id, privilege_id),

    constraint foreign key (user_id) references ##users (user_id) on delete cascade,
    constraint foreign key (privilege_id) references ##privileges (privilege_id) on delete cascade
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO ##privileges(name) VALUES
    ('Administrador'),
    ('Recursos Humanos'),
    ('Inventario'),
    ('Clientes'),
    ('Proveedores'),
    ('Compras'),
    ('Ventas'),
    ('Tickets'),
    ('Reportes')
;

/* ******************************************************************************************* */
CREATE TABLE ##warehouses
(
    warehouse_id int unsigned primary key auto_increment,
    created datetime default null,

    is_active tinyint not null default 1,

	name varchar(128),

    address1 varchar(100) default '',
    address2 varchar(100) default '',
    city varchar(100) default '',
    state varchar(100) default '',

    email varchar(100) default '',
    phone varchar(100) default '',

    data mediumblob default '{}'
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;


/* ******************************************************************************************* */
CREATE TABLE ##suppliers
(
    supplier_id int unsigned primary key auto_increment,
    created datetime default null,

    is_active tinyint not null default 1,
    is_visible tinyint not null default 1,

	name varchar(128),
    city varchar(100) default '',
    state varchar(100) default '',

    email varchar(100) default '',
    phone varchar(100) default '',

    data mediumblob default '{}'
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;


/* ******************************************************************************************* */
CREATE TABLE ##products
(
    product_id int unsigned primary key auto_increment,
    created datetime default null,

    is_visible tinyint not null default 1,
    is_active tinyint not null default 1,

	photo varchar(128) default null,

	name varchar(128),
	code varchar(128) default null,

    price decimal(10,2) default 0,
    cost decimal(10,2) default 0,

    unit_id int unsigned,
    constraint foreign key (unit_id) references ##units (unit_id),

    tax_id int unsigned,
    constraint foreign key (tax_id) references ##taxes (tax_id),

    warehouse_id int unsigned,
    constraint foreign key (warehouse_id) references ##warehouses (warehouse_id),

    quantity int unsigned default 0
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1;


/* ******************************************************************************************* */
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


/* ******************************************************************************************* */
CREATE TABLE ##sales
(
    sale_id int unsigned primary key auto_increment,
    is_active tinyint not null default 1,

    created datetime default null,
    created_by int unsigned,
    constraint foreign key (created_by) references ##users (user_id),

    cancelled datetime default null,
    cancelled_by int unsigned default null,
    constraint foreign key (cancelled_by) references ##users (user_id),

    subtotal decimal(10,2),
    taxes decimal(10,2),
    total decimal(10,2)
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci AUTO_INCREMENT=1001000;


CREATE TABLE ##sale_details
(
    product_id int unsigned,
    constraint foreign key (product_id) references ##products (product_id),
    sale_id int unsigned,
    constraint foreign key (sale_id) references ##sales (sale_id),

    primary key (product_id, sale_id),

    price decimal(10,2),
    quantity int unsigned,

    subtotal decimal(10,2),
    taxes decimal(10,2)
)
ENGINE=InnoDB CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
