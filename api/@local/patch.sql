alter table ##purchases add instance_id int unsigned;
alter table ##purchases add constraint foreign key (instance_id) references ##instances (instance_id) on delete cascade;

alter table ##contacts add instance_id int unsigned;
alter table ##contacts add constraint foreign key (instance_id) references ##instances (instance_id) on delete cascade;

alter table ##sales add instance_id int unsigned;
alter table ##sales add constraint foreign key (instance_id) references ##instances (instance_id) on delete cascade;

alter table ##suppliers add instance_id int unsigned;
alter table ##suppliers add constraint foreign key (instance_id) references ##instances (instance_id) on delete cascade;

alter table ##products add instance_id int unsigned;
alter table ##products add constraint foreign key (instance_id) references ##instances (instance_id) on delete cascade;

alter table ##warehouses add instance_id int unsigned;
alter table ##warehouses add constraint foreign key (instance_id) references ##instances (instance_id) on delete cascade;

alter table ##units add instance_id int unsigned;
alter table ##units add constraint foreign key (instance_id) references ##instances (instance_id) on delete cascade;

alter table ##taxes add instance_id int unsigned;
alter table ##taxes add constraint foreign key (instance_id) references ##instances (instance_id) on delete cascade;

alter table ##departments add instance_id int unsigned;
alter table ##departments add constraint foreign key (instance_id) references ##instances (instance_id) on delete cascade;

alter table ##positions add instance_id int unsigned;
alter table ##positions add constraint foreign key (instance_id) references ##instances (instance_id) on delete cascade;


INSERT INTO ##privileges(name) VALUES ('Super');

alter table ##users add instance_id int unsigned;
alter table ##users add constraint foreign key (instance_id) references ##instances (instance_id) on delete cascade;
