create table customers(customer_id BIGINT not null primary key, full_name varchar(100) not null, email varchar(100) not null, phone_number varchar(15) not null, address varchar(255) not null, create_at timestamp CURRENT_TIMESTAMP, updated_at timestamp CURRENT_TIMESTAMP, foreign key (customer_id) references customers(customer_id), foreign key (account_id) references customers(customer_id));


